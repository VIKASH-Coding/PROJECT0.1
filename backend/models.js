const mongoose = require("mongoose");

// 1. User Account Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    gender: { type: String, default: "Other" },
    course: { type: String, default: "B.Tech CSE IoT" },
    password: { type: String, required: true }
}, { timestamps: true });

// 2. Study Data Schema (Har user ka apna data)
const studyDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    subjects: { type: Array, default: [] },
    tasks: { type: Array, default: [] },
    schedules: { type: Array, default: [] },
    notes: { type: Array, default: [] },
    pomodoro: {
        sessions: { type: Number, default: 0 },
        todaySeconds: { type: Number, default: 0 },
        allTimeSeconds: { type: Number, default: 0 },
        studyDuration: { type: Number, default: 25 },
        breakDuration: { type: Number, default: 5 }
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const StudyData = mongoose.model("StudyData", studyDataSchema);

module.exports = { User, StudyData };