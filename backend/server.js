require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, StudyData } = require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err.message));

// Auth Middleware (Token verify karne ke liye)
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. Please login first." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired session. Please login again." });
    }
}

// ==========================================
// 1. TEST ROUTE
// ==========================================
app.get("/", (req, res) => {
    res.json({ status: "StudyFlow Backend API is running 🚀" });
});

// ==========================================
// 2. REGISTER ROUTE
// ==========================================
app.post("/api/auth/register", async (req, res) => {
    try {
        const { name, email, gender, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            gender,
            password: hashedPassword
        });

        // Naye user ke liye empty study workspace banayein
        await StudyData.create({ userId: newUser._id });

        res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server error during registration." });
    }
});

// ==========================================
// 3. LOGIN ROUTE
// ==========================================
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "Email address not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password!" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                course: user.course
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error during login." });
    }
});

// ==========================================
// 4. FORGOT / RESET PASSWORD ROUTE
// ==========================================
app.post("/api/auth/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters." });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email." });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error resetting password." });
    }
});

// ==========================================
// 5. UPDATE PROFILE (NAME & COURSE)
// ==========================================
app.put("/api/user/profile", verifyToken, async (req, res) => {
    try {
        const { name, course } = req.body;
        const updates = {};
        if (name) updates.name = name;
        if (course) updates.course = course;

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $set: updates },
            { new: true }
        ).select("-password");

        res.json({ message: "Profile updated!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile." });
    }
});

// ==========================================
// 6. GET ALL STUDY DATA (ON DASHBOARD LOAD)
// ==========================================
app.get("/api/study-data", verifyToken, async (req, res) => {
    try {
        let data = await StudyData.findOne({ userId: req.userId });
        if (!data) {
            data = await StudyData.create({ userId: req.userId });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching study data." });
    }
});

// ==========================================
// 7. SAVE / SYNC STUDY DATA
// ==========================================
app.put("/api/study-data", verifyToken, async (req, res) => {
    try {
        const { subjects, tasks, schedules, notes, pomodoro } = req.body;

        const updatedData = await StudyData.findOneAndUpdate(
            { userId: req.userId },
            {
                $set: {
                    ...(subjects !== undefined && { subjects }),
                    ...(tasks !== undefined && { tasks }),
                    ...(schedules !== undefined && { schedules }),
                    ...(notes !== undefined && { notes }),
                    ...(pomodoro !== undefined && { pomodoro })
                }
            },
            { new: true, upsert: true }
        );

        res.json({ message: "Data synced to cloud!", data: updatedData });
    } catch (err) {
        res.status(500).json({ message: "Error saving study data." });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});