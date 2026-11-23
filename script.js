// =====================================================
// STUDYFLOW - STUDENT STUDY MANAGER
// COMPLETE SCRIPT.JS
// =====================================================


// ===============================
// GET HTML ELEMENTS
// ===============================

const themeBtn = document.getElementById("themeBtn");

const totalSubjects = document.getElementById("totalSubjects");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const studyProgress = document.getElementById("studyProgress");


// ===============================
// SUBJECT ELEMENTS
// ===============================

const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectForm = document.getElementById("subjectForm");
const subjectInput = document.getElementById("subjectInput");
const saveSubjectBtn = document.getElementById("saveSubjectBtn");
const subjectList = document.getElementById("subjectList");


// ===============================
// TASK ELEMENTS
// ===============================

const addTaskBtn = document.getElementById("addTaskBtn");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("taskList");


// ===============================
// QUICK ACTIONS
// ===============================

const quickAddSubject = document.getElementById("quickAddSubject");
const quickAddTask = document.getElementById("quickAddTask");
const quickTimetable = document.getElementById("quickTimetable");
const quickNotes = document.getElementById("quickNotes");


// ===============================
// TIMETABLE ELEMENTS
// ===============================

const addScheduleBtn = document.getElementById("addScheduleBtn");
const scheduleForm = document.getElementById("scheduleForm");
const scheduleTime = document.getElementById("scheduleTime");
const scheduleSubject = document.getElementById("scheduleSubject");
const scheduleType = document.getElementById("scheduleType");
const saveScheduleBtn = document.getElementById("saveScheduleBtn");
const scheduleList = document.getElementById("scheduleList");


// ===============================
// NOTES ELEMENTS
// ===============================

const addNoteBtn = document.getElementById("addNoteBtn");
const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const notesList = document.getElementById("notesList");


// ===============================
// DATA
// ===============================

let subjects =
    JSON.parse(localStorage.getItem("studyflowSubjects")) || [];

let tasks =
    JSON.parse(localStorage.getItem("studyflowTasks")) || [];

let schedules =
    JSON.parse(localStorage.getItem("studyflowSchedules")) || [];

let notes =
    JSON.parse(localStorage.getItem("studyflowNotes")) || [];


// Note edit mode
let editingNoteId = null;


// ===============================
// SAVE ALL DATA
// ===============================

function saveAllData() {

    localStorage.setItem(
        "studyflowSubjects",
        JSON.stringify(subjects)
    );

    localStorage.setItem(
        "studyflowTasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "studyflowSchedules",
        JSON.stringify(schedules)
    );

    localStorage.setItem(
        "studyflowNotes",
        JSON.stringify(notes)
    );
}


// ===============================
// UPDATE DASHBOARD STATS
// ===============================

function updateStats() {

    totalSubjects.textContent = subjects.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending =
        tasks.filter(task => !task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

    let progress = 0;

    if (tasks.length > 0) {

        progress = Math.round(
            (completed / tasks.length) * 100
        );

    }

    studyProgress.textContent = progress + "%";
}


// =====================================================
// SUBJECT SECTION
// =====================================================


// Show subject form

function showSubjectForm() {

    subjectForm.style.display = "flex";

    subjectInput.focus();
}


// Add subject

function addSubject() {

    const name = subjectInput.value.trim();

    if (!name) {

        alert("Please enter subject name.");

        subjectInput.focus();

        return;
    }

    subjects.push({

        id: Date.now(),

        name: name

    });

    saveAllData();

    renderSubjects();

    updateStats();

    subjectInput.value = "";

    subjectForm.style.display = "none";
}


// Render subjects

function renderSubjects() {

    subjectList.innerHTML = "";

    if (subjects.length === 0) {

        const message = document.createElement("p");

        message.textContent =
            "No subjects added yet.";

        message.className =
            "empty-message";

        subjectList.appendChild(message);

        return;
    }


    subjects.forEach(subject => {

        const item =
            document.createElement("div");

        item.className =
            "subject-item";


        const name =
            document.createElement("span");

        name.textContent =
            "📚 " + subject.name;


        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "✕";

        deleteBtn.className =
            "delete-btn";


        deleteBtn.addEventListener(
            "click",
            () => {

                subjects =
                    subjects.filter(
                        item =>
                            item.id !== subject.id
                    );

                saveAllData();

                renderSubjects();

                updateStats();

            }
        );


        item.appendChild(name);

        item.appendChild(deleteBtn);

        subjectList.appendChild(item);

    });
}


// =====================================================
// TASK SECTION
// =====================================================


// Show task form

function showTaskForm() {

    taskForm.style.display = "flex";

    taskInput.focus();
}


// Add task

function addTask() {

    const name =
        taskInput.value.trim();


    if (!name) {

        alert("Please enter a task.");

        taskInput.focus();

        return;
    }


    tasks.push({

        id: Date.now(),

        name: name,

        completed: false

    });


    saveAllData();

    renderTasks();

    updateStats();


    taskInput.value = "";

    taskForm.style.display = "none";
}


// Render tasks

function renderTasks() {

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        const message =
            document.createElement("p");

        message.textContent =
            "No tasks added yet.";

        message.className =
            "empty-message";

        taskList.appendChild(message);

        return;
    }


    tasks.forEach(task => {

        const item =
            document.createElement("div");

        item.className =
            "task-item";


        if (task.completed) {

            item.classList.add("completed");

        }


        // Checkbox

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            task.completed;


        checkbox.addEventListener(
            "change",
            () => {

                task.completed =
                    checkbox.checked;

                saveAllData();

                renderTasks();

                updateStats();

            }
        );


        // Task name

        const name =
            document.createElement("span");

        name.textContent =
            task.name;


        // Delete button

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "✕";

        deleteBtn.className =
            "delete-btn";


        deleteBtn.addEventListener(
            "click",
            () => {

                tasks =
                    tasks.filter(
                        item =>
                            item.id !== task.id
                    );

                saveAllData();

                renderTasks();

                updateStats();

            }
        );


        item.appendChild(checkbox);

        item.appendChild(name);

        item.appendChild(deleteBtn);

        taskList.appendChild(item);

    });
}


// =====================================================
// DARK MODE
// =====================================================


function toggleTheme() {

    document.body.classList.toggle("dark");


    const dark =
        document.body.classList.contains("dark");


    themeBtn.textContent =
        dark ? "☀️" : "🌙";


    localStorage.setItem(
        "studyflowTheme",
        dark ? "dark" : "light"
    );
}


function loadTheme() {

    const theme =
        localStorage.getItem(
            "studyflowTheme"
        );


    if (theme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }
}


// =====================================================
// TIMETABLE SECTION
// =====================================================


// Show timetable form

function showScheduleForm() {

    scheduleForm.style.display =
        "grid";

    scheduleTime.focus();
}


// Add timetable item

function addSchedule() {

    const time =
        scheduleTime.value;

    const subject =
        scheduleSubject.value.trim();

    const type =
        scheduleType.value;


    if (!time || !subject) {

        alert(
            "Please enter time and subject."
        );

        return;
    }


    schedules.push({

        id: Date.now(),

        time: time,

        subject: subject,

        type: type

    });


    saveAllData();

    renderSchedules();


    scheduleTime.value = "";

    scheduleSubject.value = "";

    scheduleType.value = "Class";

    scheduleForm.style.display =
        "none";
}


// Render timetable

function renderSchedules() {

    scheduleList.innerHTML = "";


    if (schedules.length === 0) {

        const row =
            document.createElement("tr");

        const cell =
            document.createElement("td");


        cell.colSpan = 4;

        cell.textContent =
            "No timetable added yet.";


        row.appendChild(cell);

        scheduleList.appendChild(row);

        return;
    }


    // Sort by time

    schedules.sort(
        (a, b) =>
            a.time.localeCompare(b.time)
    );


    schedules.forEach(schedule => {

        const row =
            document.createElement("tr");


        // Time

        const timeCell =
            document.createElement("td");

        timeCell.textContent =
            formatTime(schedule.time);


        // Subject

        const subjectCell =
            document.createElement("td");

        subjectCell.textContent =
            schedule.subject;


        // Type

        const typeCell =
            document.createElement("td");


        const badge =
            document.createElement("span");

        badge.textContent =
            schedule.type;

        badge.className =
            schedule.type === "Study"
                ? "badge study"
                : "badge";


        typeCell.appendChild(badge);


        // Delete

        const deleteCell =
            document.createElement("td");


        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "✕";

        deleteBtn.className =
            "delete-btn";


        deleteBtn.addEventListener(
            "click",
            () => {

                schedules =
                    schedules.filter(
                        item =>
                            item.id !== schedule.id
                    );

                saveAllData();

                renderSchedules();

            }
        );


        deleteCell.appendChild(
            deleteBtn
        );


        row.appendChild(timeCell);

        row.appendChild(subjectCell);

        row.appendChild(typeCell);

        row.appendChild(deleteCell);


        scheduleList.appendChild(row);

    });
}


// Convert 24-hour time to 12-hour

function formatTime(time) {

    const [hours, minutes] =
        time.split(":");


    let hour =
        parseInt(hours, 10);


    const ampm =
        hour >= 12 ? "PM" : "AM";


    hour =
        hour % 12 || 12;


    return `${hour}:${minutes} ${ampm}`;
}


// =====================================================
// NOTES SECTION
// =====================================================


// Show note form

function showNoteForm() {

    noteForm.style.display =
        "flex";

    noteTitle.focus();
}


// Reset note form

function resetNoteForm() {

    editingNoteId = null;

    noteTitle.value = "";

    noteContent.value = "";

    saveNoteBtn.textContent =
        "Save Note";

    noteForm.style.display =
        "none";
}


// Add or update note

function addOrUpdateNote() {

    const title =
        noteTitle.value.trim();

    const content =
        noteContent.value.trim();


    if (!title || !content) {

        alert(
            "Please enter title and note."
        );

        return;
    }


    // New note

    if (editingNoteId === null) {

        notes.push({

            id: Date.now(),

            title: title,

            content: content

        });

    }


    // Update note

    else {

        notes =
            notes.map(note => {

                if (
                    note.id ===
                    editingNoteId
                ) {

                    return {

                        ...note,

                        title: title,

                        content: content

                    };

                }

                return note;

            });

    }


    saveAllData();

    renderNotes();

    resetNoteForm();
}


// Edit note

function startEditNote(note) {

    editingNoteId =
        note.id;


    noteTitle.value =
        note.title;


    noteContent.value =
        note.content;


    saveNoteBtn.textContent =
        "Update Note";


    noteForm.style.display =
        "flex";


    noteTitle.focus();
}


// Render notes

function renderNotes() {

    notesList.innerHTML = "";


    if (notes.length === 0) {

        const message =
            document.createElement("p");

        message.textContent =
            "No notes added yet.";

        message.className =
            "empty-message";

        notesList.appendChild(message);

        return;
    }


    notes.forEach(note => {

        const card =
            document.createElement("div");

        card.className =
            "note-card";


        // Title

        const title =
            document.createElement("h3");

        title.textContent =
            note.title;


        // Content

        const content =
            document.createElement("p");

        content.textContent =
            note.content;


        // Edit button

        const editBtn =
            document.createElement("button");

        editBtn.textContent =
            "✏️";

        editBtn.className =
            "delete-btn";

        editBtn.title =
            "Edit note";


        editBtn.addEventListener(
            "click",
            () => {

                startEditNote(note);

            }
        );


        // Delete button

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "🗑️";

        deleteBtn.className =
            "delete-btn";

        deleteBtn.title =
            "Delete note";


        deleteBtn.addEventListener(
            "click",
            () => {

                notes =
                    notes.filter(
                        item =>
                            item.id !== note.id
                    );


                if (
                    editingNoteId ===
                    note.id
                ) {

                    resetNoteForm();

                }


                saveAllData();

                renderNotes();

            }
        );


        card.appendChild(title);

        card.appendChild(content);

        card.appendChild(editBtn);

        card.appendChild(deleteBtn);


        notesList.appendChild(card);

    });
}


// =====================================================
// QUICK ACTIONS
// =====================================================


// =====================================================
// QUICK ACTIONS
// =====================================================

quickAddSubject.addEventListener("click", () => {

    document.getElementById("subjects").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    showSubjectForm();

});


quickAddTask.addEventListener("click", () => {

    document.getElementById("tasks").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    showTaskForm();

});


quickTimetable.addEventListener("click", () => {

    document.getElementById("timetable").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    showScheduleForm();

});


quickNotes.addEventListener("click", () => {

    document.getElementById("notes").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    showNoteForm();

});

// =====================================================
// BUTTON EVENTS
// =====================================================


// Subject

addSubjectBtn.addEventListener(
    "click",
    showSubjectForm
);


saveSubjectBtn.addEventListener(
    "click",
    addSubject
);


// Task

addTaskBtn.addEventListener(
    "click",
    showTaskForm
);


saveTaskBtn.addEventListener(
    "click",
    addTask
);


// Theme

themeBtn.addEventListener(
    "click",
    toggleTheme
);


// Timetable

addScheduleBtn.addEventListener(
    "click",
    showScheduleForm
);


saveScheduleBtn.addEventListener(
    "click",
    addSchedule
);


// Notes

addNoteBtn.addEventListener(
    "click",
    () => {

        if (editingNoteId !== null) {

            resetNoteForm();

        }

        showNoteForm();

    }
);


saveNoteBtn.addEventListener(
    "click",
    addOrUpdateNote
);


// =====================================================
// ENTER KEY SUPPORT
// =====================================================


subjectInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addSubject();

        }

    }
);


taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// =====================================================
// INITIALIZE APPLICATION
// =====================================================


loadTheme();

renderSubjects();

renderTasks();

renderSchedules();

renderNotes();

updateStats();
// =====================================================
// POMODORO TIMER
// =====================================================

// =====================================================
// PRO STUDY HOURS TRACKER (DAILY / MONTHLY / YEARLY + GOAL)
// =====================================================
function formatDurationHM(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    return `${hrs}h ${String(mins).padStart(2, "0")}m`;
}

function getStudyLogs() {
    try {
        return JSON.parse(localStorage.getItem("studyflowStudyLogs") || "[]");
    } catch {
        return [];
    }
}

function saveStudyLogs(logs) {
    localStorage.setItem("studyflowStudyLogs", JSON.stringify(logs));
    const stats = JSON.parse(localStorage.getItem("studyflowPomodoroStats") || "{}");
    stats.logs = logs;
    stats.todaySeconds = Number(localStorage.getItem("studyflowTodaySeconds") || 0);
    stats.allTimeSeconds = Number(localStorage.getItem("studyflowAllTimeSeconds") || 0);
    stats.dailyGoalHours = Number(localStorage.getItem("studyflowDailyGoalHours") || 4);
    localStorage.setItem("studyflowPomodoroStats", JSON.stringify(stats));

    if (typeof syncStudyDataToCloud === "function") {
        syncStudyDataToCloud();
    }
}

function updateDailyGoalUI(dailySecs) {
    const goalSelect = document.getElementById("dailyStudyGoalSelect");
    const savedGoal = Number(localStorage.getItem("studyflowDailyGoalHours") || 4);
    if (goalSelect) goalSelect.value = String(savedGoal);

    const completedHrs = dailySecs / 3600;
    const pct = Math.min(100, Math.round((completedHrs / savedGoal) * 100));
    const remainingHrs = Math.max(0, savedGoal - completedHrs);

    const barEl = document.getElementById("dailyGoalProgressBar");
    const pillEl = document.getElementById("goalStatusPill");
    const progTextEl = document.getElementById("dailyGoalProgressText");
    const remTextEl = document.getElementById("dailyGoalRemainingText");

    if (barEl) barEl.style.width = `${pct}%`;
    if (progTextEl) progTextEl.textContent = `${completedHrs.toFixed(1)} hrs completed today`;

    if (pillEl) {
        if (pct >= 100) {
            pillEl.textContent = "🎉 Goal Achieved!";
            pillEl.style.background = "rgba(16, 185, 129, 0.2)";
            pillEl.style.color = "#34d399";
        } else {
            pillEl.textContent = `${pct}% Completed`;
            pillEl.style.background = "rgba(56, 189, 248, 0.15)";
            pillEl.style.color = "#38bdf8";
        }
    }

    if (remTextEl) {
        remTextEl.textContent = pct >= 100
            ? "Target reached! Keep going 🚀"
            : `${remainingHrs.toFixed(1)} hrs remaining`;
    }
}

function renderStudyAnalyticsAndLogs() {
    const logs = getStudyLogs();
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const currentMonthStr = todayStr.slice(0, 7);
    const currentYearStr = todayStr.slice(0, 4);

    let dailySecs = 0;
    let monthlySecs = 0;
    let yearlySecs = 0;
    let allTimeSecs = 0;

    logs.forEach(item => {
        const secs = Math.round((Number(item.hours) || 0) * 3600);
        allTimeSecs += secs;
        if (item.date === todayStr) dailySecs += secs;
        if (item.date && item.date.startsWith(currentMonthStr)) monthlySecs += secs;
        if (item.date && item.date.startsWith(currentYearStr)) yearlySecs += secs;
    });

    localStorage.setItem("studyflowTodaySeconds", dailySecs);
    localStorage.setItem("studyflowAllTimeSeconds", allTimeSecs);

    const todayEl = document.getElementById("todayStudyTime");
    const monthEl = document.getElementById("monthlyStudyTime");
    const yearEl = document.getElementById("yearlyStudyTime");
    const totalEl = document.getElementById("totalStudyTime");

    if (todayEl) todayEl.textContent = formatDurationHM(dailySecs);
    if (monthEl) monthEl.textContent = formatDurationHM(monthlySecs);
    if (yearEl) yearEl.textContent = formatDurationHM(yearlySecs);
    if (totalEl) totalEl.textContent = formatDurationHM(allTimeSecs);

    updateDailyGoalUI(dailySecs);

    const listEl = document.getElementById("studyLogHistoryList");
    const badgeEl = document.getElementById("studyLogCountBadge");
    if (badgeEl) badgeEl.textContent = `${logs.length} ${logs.length === 1 ? "entry" : "entries"}`;

    if (listEl) {
        if (logs.length === 0) {
            listEl.innerHTML = `<p style="margin: 0; font-size: 0.85rem; color: #64748b; text-align: center; padding: 16px;">No study sessions logged yet. Add your first session above!</p>`;
            return;
        }

        listEl.innerHTML = logs.slice().reverse().map((log, revIdx) => {
            const actualIndex = logs.length - 1 - revIdx;
            const displayDate = new Date(log.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
            const sourceTag = log.source || "📘 Self Study";
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding: 12px 15px; border-radius: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.07);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="width: 26px; height: 26px; border-radius: 50%; background: rgba(16, 185, 129, 0.16); color: #34d399; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.82rem;">✓</span>
                        <div>
                            <div style="font-size: 0.94rem; font-weight: 600; color: #f1f5f9;">${log.topic}</div>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 3px; font-size: 0.76rem; color: #94a3b8;">
                                <span>${displayDate}</span>
                                <span>•</span>
                                <span style="padding: 1px 8px; border-radius: 6px; background: rgba(56, 189, 248, 0.12); color: #7dd3fc;">${sourceTag}</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="padding: 5px 12px; border-radius: 8px; background: rgba(99, 102, 241, 0.18); color: #a5b4fc; font-weight: 700; font-size: 0.84rem;">
                            +${log.hours} hr${log.hours > 1 ? "s" : ""}
                        </span>
                        <button type="button" onclick="deleteStudyLogEntry(${actualIndex})" title="Delete entry"
                            style="border: none; background: rgba(239, 68, 68, 0.14); color: #f87171; border-radius: 8px; padding: 5px 9px; cursor: pointer; font-size: 0.8rem;">
                            ✕
                        </button>
                    </div>
                </div>
            `;
        }).join("");
    }
}

function addManualStudyEntry() {
    const topicInput = document.getElementById("studyLogTopicInput");
    const sourceSelect = document.getElementById("studyLogSourceSelect");
    const hoursInput = document.getElementById("studyLogHoursInput");

    const hrs = parseFloat(hoursInput?.value);
    if (!hrs || hrs <= 0 || hrs > 16) {
        alert("Please enter valid study hours (0.25 to 16).");
        return;
    }

    const topic = (topicInput?.value.trim()) || "Focused Study Session";
    const source = sourceSelect?.value || "📘 Self Study";
    const todayStr = new Date().toISOString().split("T")[0];

    const logs = getStudyLogs();
    logs.push({
        id: Date.now(),
        topic: topic,
        source: source,
        hours: hrs,
        date: todayStr
    });

    saveStudyLogs(logs);
    renderStudyAnalyticsAndLogs();

    if (topicInput) topicInput.value = "";
    if (hoursInput) hoursInput.value = "";
    document.querySelectorAll(".quick-hour-chip").forEach(c => {
        c.style.background = "rgba(99,102,241,0.12)";
        c.style.color = "#a5b4fc";
    });
}

window.deleteStudyLogEntry = function (index) {
    const logs = getStudyLogs();
    logs.splice(index, 1);
    saveStudyLogs(logs);
    renderStudyAnalyticsAndLogs();
};

// Quick Select Chips + Active Visual Feedback
document.querySelectorAll(".quick-hour-chip").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".quick-hour-chip").forEach(c => {
            c.style.background = "rgba(99,102,241,0.12)";
            c.style.color = "#a5b4fc";
        });
        btn.style.background = "#6366f1";
        btn.style.color = "#ffffff";

        const hoursInput = document.getElementById("studyLogHoursInput");
        if (hoursInput) {
            hoursInput.value = btn.dataset.hrs;
            hoursInput.focus();
        }
    });
});

// Daily Goal Dropdown Change
const dailyGoalSelect = document.getElementById("dailyStudyGoalSelect");
if (dailyGoalSelect) {
    dailyGoalSelect.addEventListener("change", () => {
        localStorage.setItem("studyflowDailyGoalHours", dailyGoalSelect.value);
        renderStudyAnalyticsAndLogs();
        saveStudyLogs(getStudyLogs());
    });
}

// Mark & Save Button + Enter Key Support
const markStudyLogBtn = document.getElementById("markStudyLogBtn");
if (markStudyLogBtn) {
    markStudyLogBtn.addEventListener("click", addManualStudyEntry);
}

["studyLogTopicInput", "studyLogHoursInput"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                addManualStudyEntry();
            }
        });
    }
});

// INITIAL LOAD
renderStudyAnalyticsAndLogs();

// =====================================================
// SETTINGS
// =====================================================
// SETTINGS
// =====================================================

// =====================================================
// SETTINGS
// =====================================================

const studentNameInput = document.getElementById("studentNameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const settingsThemeCheckbox = document.getElementById("settingsThemeCheckbox");
const settingsThemeBtn = document.getElementById("settingsThemeBtn");
const clearDataBtn = document.getElementById("clearDataBtn");
const resetAppBtn = document.getElementById("resetAppBtn");


// =====================================================
// LOAD STUDENT NAME
// =====================================================

function loadStudentName() {
    const userObj = JSON.parse(localStorage.getItem("studyflowUser") || "{}");
    const savedName = localStorage.getItem("studyflowStudentName") || userObj.name || "";

    if (studentNameInput) {
        studentNameInput.value = savedName;
    }

    const emailInput = document.getElementById("studentEmailInput");
    if (emailInput) {
        emailInput.value = userObj.email || "Not available";
    }

    const genderInput = document.getElementById("studentGenderInput");
    if (genderInput) {
        const savedGender = localStorage.getItem("studyflowStudentGender") || userObj.gender || "";
        const formattedGender = savedGender
            ? savedGender.charAt(0).toUpperCase() + savedGender.slice(1).toLowerCase()
            : "";
        genderInput.value = formattedGender;
    }
}

const saveGenderBtn = document.getElementById("saveGenderBtn");
if (saveGenderBtn) {
    saveGenderBtn.addEventListener("click", () => {
        const genderInput = document.getElementById("studentGenderInput");
        if (!genderInput) return;
        const selectedGender = genderInput.value;
        localStorage.setItem("studyflowStudentGender", selectedGender);

        const userObj = JSON.parse(localStorage.getItem("studyflowUser") || "{}");
        userObj.gender = selectedGender;
        localStorage.setItem("studyflowUser", JSON.stringify(userObj));

        alert("✅ Gender updated successfully!");
    });
}


// =====================================================
// SAVE STUDENT NAME
// =====================================================

function saveStudentName() {
    const name = studentNameInput.value.trim();

    if (!name) {
        alert("Please enter your name.");
        studentNameInput.focus();
        return;
    }

    localStorage.setItem("studyflowStudentName", name);

    loadProfile();
    loadStudentGreeting();

    alert("Name saved successfully! ✅");
}


// =====================================================
// SETTINGS DARK MODE
// =====================================================

function syncSettingsTheme() {
    const isDark = document.body.classList.contains("dark");
    if (settingsThemeCheckbox) {
        settingsThemeCheckbox.checked = isDark;
    }
}

function toggleSettingsTheme() {
    toggleTheme();
    syncSettingsTheme();
}


// =====================================================
// CLEAR ALL DATA
// =====================================================

function clearAllData() {
    const confirmClear = confirm(
        "Are you sure you want to delete subjects, tasks, notes and timetable?"
    );

    if (!confirmClear) {
        return;
    }

    subjects = [];
    tasks = [];
    schedules = [];
    notes = [];

    saveAllData();

    renderSubjects();
    renderTasks();
    renderSchedules();
    renderNotes();
    updateStats();

    alert("All study data has been cleared. 🗑️");
}


// =====================================================
// RESET COMPLETE APPLICATION
// =====================================================

function resetApplication() {
    const confirmReset = confirm(
        "This will reset StudyFlow completely. Continue?"
    );

    if (!confirmReset) {
        return;
    }

    localStorage.clear();
    location.reload();
}


// =====================================================
// SETTINGS EVENTS
// =====================================================

if (saveNameBtn) {
    saveNameBtn.addEventListener("click", saveStudentName);
}

if (settingsThemeCheckbox) {
    settingsThemeCheckbox.addEventListener("change", toggleSettingsTheme);
}

if (settingsThemeBtn) {
    settingsThemeBtn.addEventListener("click", toggleSettingsTheme);
}

if (clearDataBtn) {
    clearDataBtn.addEventListener("click", clearAllData);
}

if (resetAppBtn) {
    resetAppBtn.addEventListener("click", resetApplication);
}


// =====================================================
// LOAD SETTINGS
// =====================================================

loadStudentName();
syncSettingsTheme();


loadStudentName();
// =====================================================
// SIDEBAR NAVIGATION
// =====================================================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});
// =====================================================
// STUDENT NAME ON DASHBOARD
// =====================================================

const studentGreeting = document.getElementById("studentGreeting");

function loadStudentGreeting() {
    const savedName = localStorage.getItem("studyflowStudentName") || "Student";
    if (!studentGreeting) return;

    const hour = new Date().getHours();
    let greetingText = "Good Morning";

    if (hour >= 5 && hour < 12) {
        greetingText = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greetingText = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        greetingText = "Good Evening";
    } else {
        greetingText = "Good Night";
    }

    const heading = studentGreeting.parentElement;
    if (heading) {
        heading.innerHTML = `${greetingText}, <span id="studentGreeting">${savedName}</span> 👋`;
    } else {
        studentGreeting.textContent = savedName;
    }
}


loadStudentGreeting();
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("mobile-open");
});

// Sidebar ke bahar click karne par close
document.addEventListener("click", (e) => {
    if (
        sidebar.classList.contains("mobile-open") &&
        !sidebar.contains(e.target) &&
        e.target !== menuBtn
    ) {
        sidebar.classList.remove("mobile-open");
    }
});

// Navigation par click karne ke baad sidebar close
const mobileNavLinks = document.querySelectorAll(".sidebar .nav-link");

mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
        sidebar.classList.remove("mobile-open");
    });
});
// PROFILE
const profileName = document.getElementById("profileName");
const profileAvatar = document.getElementById("profileAvatar");

function loadProfile() {

    const savedName = localStorage.getItem("studyflowStudentName");

    if (savedName) {

        profileName.textContent = savedName;
        profileAvatar.textContent = savedName.charAt(0).toUpperCase();

    } else {

        profileName.textContent = "Student";
        profileAvatar.textContent = "S";

    }
}

loadProfile();


// PROFILE -> SETTINGS

// =====================================================
// COURSE / BRANCH SAVE & LOAD
// =====================================================

const studentCourseInput = document.getElementById("studentCourseInput");
const saveCourseBtn = document.getElementById("saveCourseBtn");
const profileCourseText = document.querySelector(".profile-info span");

function loadStudentCourse() {
    const savedCourse = localStorage.getItem("studyflowStudentCourse") || "B.Tech CSE IoT";
    if (profileCourseText) {
        profileCourseText.textContent = savedCourse;
    }
    if (studentCourseInput) {
        studentCourseInput.value = savedCourse;
    }
}

if (saveCourseBtn) {
    saveCourseBtn.addEventListener("click", function () {
        const course = studentCourseInput.value.trim();
        if (!course) {
            alert("Please enter your course or branch.");
            studentCourseInput.focus();
            return;
        }
        localStorage.setItem("studyflowStudentCourse", course);
        loadStudentCourse();
        alert("Course updated successfully! ✅");
    });
}

loadStudentCourse();


// =====================================================
// SETTINGS PAGE OPEN & CLOSE (CLEAN TOGGLE)
// =====================================================

const profileCard = document.querySelector(".profile-card");
const editProfileBtn = document.getElementById("editProfileBtn");
const sidebarSettingsBtn = document.getElementById("sidebarSettingsBtn");
const backToHomeBtn = document.getElementById("backToHomeBtn");

function openSettingsPage() {
    const main = document.querySelector(".main");
    const settingsSection = document.getElementById("settings");
    if (!main || !settingsSection) return;

    Array.from(main.children).forEach(function (child) {
        if (child !== settingsSection) {
            child.style.display = "none";
        }
    });

    settingsSection.style.display = "block";

    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    if (sidebarSettingsBtn) {
        sidebarSettingsBtn.classList.add("active");
    }

    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        sidebar.classList.remove("mobile-open");
    }

    window.scrollTo(0, 0);
}

function closeSettingsPage() {
    const main = document.querySelector(".main");
    const settingsSection = document.getElementById("settings");
    if (!main || !settingsSection) return;

    Array.from(main.children).forEach(function (child) {
        if (child !== settingsSection) {
            child.style.removeProperty("display");
        }
    });

    settingsSection.style.display = "none";

    if (sidebarSettingsBtn) {
        sidebarSettingsBtn.classList.remove("active");
    }

    window.scrollTo(0, 0);
}

if (sidebarSettingsBtn) {
    sidebarSettingsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openSettingsPage();
    });
}

if (profileCard) {
    profileCard.addEventListener("click", openSettingsPage);
}

if (editProfileBtn) {
    editProfileBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        openSettingsPage();
    });
}

if (backToHomeBtn) {
    backToHomeBtn.addEventListener("click", closeSettingsPage);
}

document.querySelectorAll(".sidebar .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        const settingsSection = document.getElementById("settings");
        if (settingsSection && settingsSection.style.display === "block") {
            closeSettingsPage();
        }
    });
});




// =====================================================
// BACKEND API CONFIG & CLOUD SYNC HELPER
// =====================================================
const API_BASE_URL = "https://unitrack-r412.onrender.com/api";
let isCloudDataLoaded = false;

function getAuthToken() {
    return localStorage.getItem("studyflowToken");
}

// Cloud se user ka saara study data load karna
async function loadStudyDataFromCloud() {
    const token = getAuthToken();
    if (!token) return;

    try {
        const res = await fetch(`${API_BASE_URL}/study-data`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return;

        const data = await res.json();

        // 1. LocalStorage me save karein
        if (data.subjects) localStorage.setItem("studyflowSubjects", JSON.stringify(data.subjects));
        if (data.tasks) localStorage.setItem("studyflowTasks", JSON.stringify(data.tasks));
        if (data.schedules) localStorage.setItem("studyflowSchedules", JSON.stringify(data.schedules));
        if (data.notes) localStorage.setItem("studyflowNotes", JSON.stringify(data.notes));
        if (data.pomodoro) localStorage.setItem("studyflowPomodoroStats", JSON.stringify(data.pomodoro));

        // 2. Global JS variables ko bhi update karein (agar defined hain)
        try { if (typeof subjects !== "undefined" && data.subjects) subjects = data.subjects; } catch (e) {}
        try { if (typeof tasks !== "undefined" && data.tasks) tasks = data.tasks; } catch (e) {}
        try { if (typeof schedules !== "undefined" && data.schedules) schedules = data.schedules; } catch (e) {}
        try { if (typeof notes !== "undefined" && data.notes) notes = data.notes; } catch (e) {}
        try {
            if (typeof pomodoroStats !== "undefined" && data.pomodoro) {
                pomodoroStats = { ...pomodoroStats, ...data.pomodoro };
            }
        } catch (e) {}

        isCloudDataLoaded = true;

        // 3. UI refresh functions call karein
        if (typeof renderSubjects === "function") renderSubjects();
        if (typeof renderTasks === "function") renderTasks();
        if (typeof renderSchedules === "function") renderSchedules();
        if (typeof renderNotes === "function") renderNotes();
        if (typeof updateDashboardStats === "function") updateDashboardStats();
        if (typeof updatePomodoroUI === "function") updatePomodoroUI();
    } catch (err) {
        console.warn("Offline mode: using local cache", err);
    }
}

// Local data ko MongoDB Cloud par sync karna
async function syncStudyDataToCloud() {
    const token = getAuthToken();
    // Jab tak cloud se data load na ho jaye, khali data sync mat karein
    if (!token || !isCloudDataLoaded) return;

    try {
        const payload = {
            subjects: JSON.parse(localStorage.getItem("studyflowSubjects") || "[]"),
            tasks: JSON.parse(localStorage.getItem("studyflowTasks") || "[]"),
            schedules: JSON.parse(localStorage.getItem("studyflowSchedules") || "[]"),
            notes: JSON.parse(localStorage.getItem("studyflowNotes") || "[]"),
            pomodoro: JSON.parse(localStorage.getItem("studyflowPomodoroStats") || "{}")
        };

        await fetch(`${API_BASE_URL}/study-data`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        console.warn("Cloud sync skipped:", err);
    }
}

// Har 15 second me background auto-sync
setInterval(syncStudyDataToCloud, 15000);

// =====================================================
// LOGIN / REGISTER SYSTEM (CONNECTED TO MONGODB BACKEND)
// =====================================================

const registerPage = document.getElementById("registerPage");
const loginPage = document.getElementById("loginPage");
const showLoginBtn = document.getElementById("showLoginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const rememberMeCheckbox = document.getElementById("rememberMeCheckbox");

function showAuthMessage(elementId, text, type) {
    const box = document.getElementById(elementId);
    if (!box) return;
    box.style.display = "flex";
    box.className = "auth-message " + type;
    box.textContent = (type === "error" ? "⚠️ " : "✅ ") + text;
}

function clearAuthMessages() {
    ["registerMessage", "loginMessage"].forEach(id => {
        const box = document.getElementById(id);
        if (box) {
            box.style.display = "none";
            box.textContent = "";
        }
    });
}

// Eye Button Toggle
document.querySelectorAll(".toggle-eye-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const targetInput = document.getElementById(this.dataset.target);
        if (!targetInput) return;

        if (targetInput.type === "password") {
            targetInput.type = "text";
            this.textContent = "🙈";
            this.setAttribute("aria-label", "Hide password");
        } else {
            targetInput.type = "password";
            this.textContent = "👁️";
            this.setAttribute("aria-label", "Show password");
        }
    });
});

function showRegisterPage() {
    clearAuthMessages();
    document.body.classList.add("auth-mode");
    if (registerPage) registerPage.style.display = "flex";
    if (loginPage) loginPage.style.display = "none";
}

function showLoginPage() {
    clearAuthMessages();
    document.body.classList.add("auth-mode");
    if (registerPage) registerPage.style.display = "none";
    if (loginPage) loginPage.style.display = "flex";

    const rememberedEmail = localStorage.getItem("studyflowRememberedEmail");
    const loginEmail = document.getElementById("loginEmail");
    if (rememberedEmail && loginEmail && !loginEmail.value) {
        loginEmail.value = rememberedEmail;
    }
}

function showDashboard() {
    if (registerPage) registerPage.style.display = "none";
    if (loginPage) loginPage.style.display = "none";
    document.body.classList.remove("auth-mode");

    const main = document.querySelector(".main");
    const sidebar = document.querySelector(".sidebar");
    if (main) main.style.display = "";
    if (sidebar) sidebar.style.display = "";
}

if (showLoginBtn) showLoginBtn.addEventListener("click", showLoginPage);
if (showRegisterBtn) showRegisterBtn.addEventListener("click", showRegisterPage);

// REGISTER SUBMIT -> MONGODB API
if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearAuthMessages();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const gender = document.getElementById("registerGender").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 6) {
            showAuthMessage("registerMessage", "Password must be at least 6 characters long.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showAuthMessage("registerMessage", "Passwords do not match. Please check again.", "error");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, gender, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showAuthMessage("registerMessage", data.message || "Registration failed.", "error");
                return;
            }

            localStorage.setItem("studyflowRememberedEmail", email);
            registerForm.reset();
            showLoginPage();

            const loginEmail = document.getElementById("loginEmail");
            if (loginEmail) loginEmail.value = email;

            showAuthMessage("loginMessage", "Account created in MongoDB! Please sign in.", "success");
        } catch (error) {
            showAuthMessage("registerMessage", "Cannot connect to server. Make sure backend is running.", "error");
        }
    });
}

// LOGIN SUBMIT -> MONGODB API
if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearAuthMessages();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showAuthMessage("loginMessage", data.message || "Login failed.", "error");
                const passInput = document.getElementById("loginPassword");
                if (passInput) {
                    passInput.value = "";
                    passInput.focus();
                }
                return;
            }

            // Save JWT Token & User Profile
            localStorage.setItem("studyflowToken", data.token);
            localStorage.setItem("studyflowLoggedIn", "true");
            localStorage.setItem("studyflowUser", JSON.stringify(data.user));
            localStorage.setItem("studyflowToken", data.token);
localStorage.setItem("studyflowLoggedIn", "true");
localStorage.setItem("studyflowUser", JSON.stringify(data.user));
localStorage.setItem("studyflowStudentName", data.user.name);

if (data.user.course) {
    localStorage.setItem("studyflowStudentCourse", data.user.course);
} else {
    localStorage.removeItem("studyflowStudentCourse");
}

if (rememberMeCheckbox && rememberMeCheckbox.checked) {
    localStorage.setItem("studyflowRememberedEmail", email);
} else {
    localStorage.removeItem("studyflowRememberedEmail");
}

if (typeof loadProfile === "function") loadProfile();
if (typeof loadStudentName === "function") loadStudentName();
if (typeof loadStudentCourse === "function") loadStudentCourse();
if (typeof loadStudentGreeting === "function") loadStudentGreeting();
            localStorage.setItem("studyflowStudentName", data.user.name);
            if (data.user.course) localStorage.setItem("studyflowCourse", data.user.course);

            if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                localStorage.setItem("studyflowRememberedEmail", email);
            } else {
                localStorage.removeItem("studyflowRememberedEmail");
            }

            if (typeof loadProfile === "function") loadProfile();
            if (typeof loadStudentGreeting === "function") loadStudentGreeting();

            await loadStudyDataFromCloud();
            showDashboard();
            loginForm.reset();
        } catch (error) {
            showAuthMessage("loginMessage", "Cannot connect to server. Make sure backend is running.", "error");
        }
    });
}

// FORGOT PASSWORD -> MONGODB API
if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener("click", async function () {
        const enteredEmail = prompt("Enter your registered email address to reset password:");
        if (!enteredEmail) return;

        const newPassword = prompt("Enter your new password (minimum 6 characters):");
        if (!newPassword || newPassword.length < 6) {
            showAuthMessage("loginMessage", "Password reset cancelled. Must be at least 6 characters.", "error");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: enteredEmail.trim(), newPassword })
            });

            const data = await response.json();
            if (!response.ok) {
                showAuthMessage("loginMessage", data.message || "Password reset failed.", "error");
                return;
            }

            showAuthMessage("loginMessage", "Password updated in database! You can now log in.", "success");
        } catch (error) {
            showAuthMessage("loginMessage", "Server error while resetting password.", "error");
        }
    });
}

// CHECK LOGIN ON PAGE LOAD
if (localStorage.getItem("studyflowLoggedIn") === "true" && getAuthToken()) {
    showDashboard();
    loadStudyDataFromCloud();
} else {
    showLoginPage();
}

// LOGOUT
// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async function () {
        await syncStudyDataToCloud();
        isCloudDataLoaded = false;
        localStorage.removeItem("studyflowLoggedIn");
        localStorage.removeItem("studyflowToken");
        localStorage.removeItem("studyflowUser");
        localStorage.removeItem("studyflowStudentName");
        localStorage.removeItem("studyflowStudentCourse");
        localStorage.removeItem("studyflowStudentGender");
        localStorage.removeItem("studyflowSubjects");
        localStorage.removeItem("studyflowTasks");
        localStorage.removeItem("studyflowSchedules");
        localStorage.removeItem("studyflowNotes");
        localStorage.removeItem("studyflowPomodoroStats");
        showLoginPage();
        showAuthMessage("loginMessage", "Logged out safely. All data synced!", "success");
    });
}


// Ai wala part


// =====================================================
// REAL GOOGLE GEMINI AI QUIZ GENERATOR (TEXT + PDF + IMAGE VISION)
// =====================================================
let currentGeneratedQuiz = [];
let uploadedImageBase64 = null;
let uploadedImageMime = null;

// Save & Load Gemini API Key from localStorage
const geminiApiKeyInput = document.getElementById("geminiApiKeyInput");
const saveGeminiKeyBtn = document.getElementById("saveGeminiKeyBtn");
const geminiKeyStatus = document.getElementById("geminiKeyStatus");

function updateGeminiKeyUI() {
    const savedKey = localStorage.getItem("studyflowGeminiApiKey") || "";
    if (geminiApiKeyInput && savedKey) geminiApiKeyInput.value = savedKey;
    if (geminiKeyStatus) {
        if (savedKey) {
            geminiKeyStatus.textContent = "✅ Real AI Connected";
            geminiKeyStatus.style.color = "#10b981";
        } else {
            geminiKeyStatus.textContent = "⚠️ Paste key for Real AI";
            geminiKeyStatus.style.color = "#f59e0b";
        }
    }
}

if (saveGeminiKeyBtn) {
    saveGeminiKeyBtn.addEventListener("click", () => {
        const key = geminiApiKeyInput?.value.trim() || "";
        if (!key) {
            alert("Please paste your Google Gemini API key first!");
            return;
        }
        localStorage.setItem("studyflowGeminiApiKey", key);
        updateGeminiKeyUI();
        alert("✅ Gemini AI API Key saved securely in your browser!");
    });
}
updateGeminiKeyUI();

function showExtractStatus(msg, isError = false) {
    const statusEl = document.getElementById("quizExtractStatus");
    if (!statusEl) return;
    statusEl.style.display = "block";
    statusEl.textContent = msg;
    statusEl.style.background = isError ? "rgba(239, 68, 68, 0.14)" : "rgba(56, 189, 248, 0.12)";
    statusEl.style.borderColor = isError ? "rgba(239, 68, 68, 0.35)" : "rgba(56, 189, 248, 0.3)";
    statusEl.style.color = isError ? "#fca5a5" : "#7dd3fc";
}

// 1. PDF & TXT Upload Handler
const quizPdfUpload = document.getElementById("quizPdfUpload");
if (quizPdfUpload) {
    quizPdfUpload.addEventListener("change", async function (e) {
        const file = e.target.files[0];
        if (!file) return;
        uploadedImageBase64 = null;

        const topicInput = document.getElementById("quizTopicTitleInput");
        if (topicInput && !topicInput.value.trim()) {
            topicInput.value = file.name.replace(/\.[^/.]+$/, "");
        }

        if (file.type === "text/plain") {
            const text = await file.text();
            document.getElementById("quizNotesTextarea").value = text;
            showExtractStatus(`✅ Loaded "${file.name}" successfully!`);
            return;
        }

        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
            try {
                showExtractStatus(`⏳ Reading PDF "${file.name}"...`);
                const arrayBuffer = await file.arrayBuffer();
                if (window.pdfjsLib) {
                    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                    let fullText = "";
                    const maxPages = Math.min(pdf.numPages, 15);
                    for (let i = 1; i <= maxPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        fullText += content.items.map(item => item.str).join(" ") + "\n\n";
                    }
                    document.getElementById("quizNotesTextarea").value = fullText.trim();
                    showExtractStatus(`✅ Extracted text from ${maxPages} page(s) of "${file.name}"!`);
                }
            } catch (err) {
                showExtractStatus("❌ Could not read PDF. Try pasting text or uploading an image.", true);
            }
        }
    });
}

// 2. Image Upload Handler (Sends Image Directly to Gemini Vision AI!)
const quizImageUpload = document.getElementById("quizImageUpload");
if (quizImageUpload) {
    quizImageUpload.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const topicInput = document.getElementById("quizTopicTitleInput");
        if (topicInput && !topicInput.value.trim()) {
            topicInput.value = file.name.replace(/\.[^/.]+$/, "");
        }

        const reader = new FileReader();
        reader.onload = function () {
            const dataUrl = reader.result;
            uploadedImageBase64 = dataUrl.split(",")[1];
            uploadedImageMime = file.type || "image/jpeg";
            document.getElementById("quizNotesTextarea").value = `[Image Attached: ${file.name}] — Gemini Vision AI will read this image directly to generate accurate MCQs!`;
            showExtractStatus(`📸 Image "${file.name}" ready for Gemini Vision AI! Click "Generate MCQ Test".`);
        };
        reader.readAsDataURL(file);
    });
}

// 3. Demo Sample Button (Aptitude Example)
const loadSampleNotesBtn = document.getElementById("loadSampleNotesBtn");
if (loadSampleNotesBtn) {
    loadSampleNotesBtn.addEventListener("click", () => {
        uploadedImageBase64 = null;
        document.getElementById("quizTopicTitleInput").value = "Quantitative Aptitude - Percentage & Profit/Loss";
        document.getElementById("quizNotesTextarea").value =
            "Generate Quantitative Aptitude practice questions covering Percentages, Profit and Loss, Ratio and Proportion, and Time & Work with numerical problem-solving options and step-by-step shortcut explanations.";
        showExtractStatus("✨ Aptitude prompt loaded! Click 'Generate MCQ Test' to get real AI questions.");
    });
}

// 4. CALL REAL GOOGLE GEMINI API FOR MCQs (WITH AUTO-FALLBACK & RETRY)
async function fetchRealGeminiMCQs(notesText, count, difficulty, topic) {
    const apiKey = localStorage.getItem("studyflowGeminiApiKey") || "";
    if (!apiKey) {
        throw new Error("API_KEY_MISSING");
    }

    const promptText = `You are an expert professor and exam setter like ChatGPT/Gemini.
Create ${count} high-quality, authentic, exam-level Multiple Choice Questions (MCQs) at "${difficulty}" difficulty based strictly on the provided study notes, topic, or attached image.
Topic hint: ${topic || "General Study Topic"}
Notes / Instructions: ${notesText}

Rules:
1. Every question must be directly relevant to the exact subject/topic provided (e.g., if Aptitude, give real numerical/logical aptitude problems; if Coding/Science/History, give real conceptual questions on that exact topic).
2. Provide exactly 4 clear, distinct options per question.
3. Include a crisp, helpful explanation for the correct answer.
4. Return ONLY valid JSON (no markdown, no backticks) in this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Exact matching text of the correct option",
    "explanation": "Step-by-step explanation of why this answer is correct"
  }
]`;

    const parts = [{ text: promptText }];
    if (uploadedImageBase64) {
        parts.push({
            inline_data: {
                mime_type: uploadedImageMime,
                data: uploadedImageBase64
            }
        });
    }

    // Auto-fallback list: if one model has high demand, automatically try the next
    
// Active Gemini 3.8 models + Smart Auto-Retry for High Demand (503) spikes
    const attempts = [
        { model: "gemini-3.8-flash", delayMs: 0 },
        { model: "gemini-3.8-flash", delayMs: 2000 },
        { model: "gemini-3.8-flash-lite", delayMs: 1000 },
        { model: "gemini-3.8-flash", delayMs: 3000 }
    ];
    let lastError = "AI server busy, please try again.";

    for (const attempt of attempts) {
        if (attempt.delayMs > 0) {
            await new Promise(resolve => setTimeout(resolve, attempt.delayMs));
        }
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${attempt.model}:generateContent?key=${encodeURIComponent(apiKey)}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts }],
                        generationConfig: {
                            temperature: 0.4,
                            responseMimeType: "application/json"
                        }
                    })
                }
            );

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                lastError = errData?.error?.message || `API Error (${response.status})`;
                continue; // Retry automatically on high demand
            }

            const data = await response.json();
            const rawReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
            const cleanedJson = rawReply.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(cleanedJson);

            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch (err) {
            lastError = err.message;
        }
    }

    throw new Error(lastError);
// 5. Generate Quiz Button Click
const generateAiQuizBtn = document.getElementById("generateAiQuizBtn");
if (generateAiQuizBtn) {
    generateAiQuizBtn.addEventListener("click", async () => {
        const text = document.getElementById("quizNotesTextarea")?.value.trim() || "";
        const topic = document.getElementById("quizTopicTitleInput")?.value.trim() || "";

        if (!text && !topic && !uploadedImageBase64) {
            alert("Please upload a PDF/Image, paste notes, or enter a Topic Title (e.g., Aptitude) first!");
            return;
        }

        const count = Number(document.getElementById("quizQuestionCount")?.value || 5);
        const difficulty = document.getElementById("quizDifficultySelect")?.value || "Medium";

        const originalBtnText = generateAiQuizBtn.innerHTML;
        generateAiQuizBtn.disabled = true;
        generateAiQuizBtn.innerHTML = "⏳ Gemini AI Generating...";

        try {
            const questions = await fetchRealGeminiMCQs(text, count, difficulty, topic);
            currentGeneratedQuiz = questions;

            document.getElementById("activeQuizHeaderTitle").textContent = `📝 ${topic || "AI Smart Mock Test"}`;
            document.getElementById("activeQuizMeta").textContent = `${questions.length} Questions • ${difficulty} Difficulty • Powered by Gemini AI`;

            const container = document.getElementById("quizQuestionsContainer");
            container.innerHTML = questions.map((q, qIdx) => `
                <div style="padding: 18px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.09);">
                    <div style="font-weight: 600; color: #f8fafc; margin-bottom: 12px; font-size: 0.96rem; line-height: 1.5;">
                        <span style="color: #818cf8; margin-right: 6px;">Q${qIdx + 1}.</span> ${q.question}
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;">
                        ${q.options.map((opt, oIdx) => `
                            <label style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255,255,255,0.08); cursor: pointer; color: #e2e8f0; font-size: 0.88rem;">
                                <input type="radio" name="quiz_q_${qIdx}" value="${String(opt).replace(/"/g, "&quot;")}" style="accent-color: #6366f1;">
                                <span><strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}</span>
                            </label>
                        `).join("")}
                    </div>
                </div>
            `).join("");

            document.getElementById("quizSetupBox").style.display = "none";
            document.getElementById("quizResultArea").style.display = "none";
            document.getElementById("quizTestArea").style.display = "flex";
        } catch (err) {
            if (err.message === "API_KEY_MISSING") {
                alert("🔑 Please paste your free Google Gemini API Key in the top box and click 'Save Key' first! (Get it free at aistudio.google.com)");
            } else {
                alert("❌ AI Generation Error: " + err.message);
            }
        } finally {
            generateAiQuizBtn.disabled = false;
            generateAiQuizBtn.innerHTML = originalBtnText;
        }
    });
}

// 6. Submit Quiz & Calculate Score
const submitAiQuizBtn = document.getElementById("submitAiQuizBtn");
if (submitAiQuizBtn) {
    submitAiQuizBtn.addEventListener("click", () => {
        if (currentGeneratedQuiz.length === 0) return;

        let score = 0;
        const reviewHtml = currentGeneratedQuiz.map((q, qIdx) => {
            const selectedInput = document.querySelector(`input[name="quiz_q_${qIdx}"]:checked`);
            const userAns = selectedInput ? selectedInput.value : "Not Answered";
            const isCorrect = userAns.trim().toLowerCase() === String(q.answer).trim().toLowerCase();
            if (isCorrect) score++;

            return `
                <div style="padding: 15px 18px; border-radius: 12px; background: ${isCorrect ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)"}; border: 1px solid ${isCorrect ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"};">
                    <div style="font-weight: 600; color: #f8fafc; font-size: 0.94rem; margin-bottom: 6px;">
                        ${isCorrect ? "✅" : "❌"} Q${qIdx + 1}. ${q.question}
                    </div>
                    <div style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 4px;">
                        Your Answer: <strong style="color: ${isCorrect ? "#34d399" : "#f87171"};">${userAns}</strong>
                        ${!isCorrect ? ` | Correct Answer: <strong style="color: #34d399;">${q.answer}</strong>` : ""}
                    </div>
                    <div style="font-size: 0.82rem; color: #94a3b8;">💡 ${q.explanation}</div>
                </div>
            `;
        }).join("");

        const total = currentGeneratedQuiz.length;
        const accuracy = Math.round((score / total) * 100);
        const topic = document.getElementById("quizTopicTitleInput")?.value.trim() || "AI Mock Test";

        document.getElementById("quizFinalScoreDisplay").textContent = `${score} / ${total}`;
        document.getElementById("quizAccuracyBadge").textContent = `Accuracy: ${accuracy}%`;
        document.getElementById("quizReviewContainer").innerHTML = reviewHtml;

        const history = JSON.parse(localStorage.getItem("studyflowQuizHistory") || "[]");
        history.push({
            topic: topic,
            score: score,
            total: total,
            accuracy: accuracy,
            date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
        });
        localStorage.setItem("studyflowQuizHistory", JSON.stringify(history));
        renderPastQuizScores();

        document.getElementById("quizTestArea").style.display = "none";
        document.getElementById("quizResultArea").style.display = "flex";
    });
}

function renderPastQuizScores() {
    const history = JSON.parse(localStorage.getItem("studyflowQuizHistory") || "[]");
    const listEl = document.getElementById("pastQuizHistoryList");
    const badgeEl = document.getElementById("pastQuizCountBadge");
    if (badgeEl) badgeEl.textContent = `${history.length} ${history.length === 1 ? "test" : "tests"}`;
    if (!listEl) return;

    if (history.length === 0) {
        listEl.innerHTML = `<p style="margin: 0; font-size: 0.84rem; color: #64748b; text-align: center; padding: 10px;">No mock tests taken yet. Generate your first quiz above!</p>`;
        return;
    }

    listEl.innerHTML = history.slice().reverse().map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-radius: 10px; background: rgba(15, 23, 42, 0.55); border: 1px solid rgba(255,255,255,0.06);">
            <div>
                <div style="font-weight: 600; color: #f1f5f9; font-size: 0.9rem;">📝 ${item.topic}</div>
                <div style="font-size: 0.75rem; color: #94a3b8;">${item.date}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="padding: 4px 10px; border-radius: 8px; background: rgba(16, 185, 129, 0.15); color: #34d399; font-weight: 700; font-size: 0.82rem;">
                    ${item.score}/${item.total} (${item.accuracy}%)
                </span>
            </div>
        </div>
    `).join("");
}

const cancelQuizBtn = document.getElementById("cancelQuizBtn");
if (cancelQuizBtn) {
    cancelQuizBtn.addEventListener("click", () => {
        document.getElementById("quizTestArea").style.display = "none";
        document.getElementById("quizSetupBox").style.display = "flex";
    });
}

const retakeNewQuizBtn = document.getElementById("retakeNewQuizBtn");
if (retakeNewQuizBtn) {
    retakeNewQuizBtn.addEventListener("click", () => {
        document.getElementById("quizResultArea").style.display = "none";
        document.getElementById("quizSetupBox").style.display = "flex";
    });
}

document.querySelectorAll('a[href="#aiQuiz"]').forEach(link => {
    link.addEventListener("click", () => {
        const quizSec = document.getElementById("aiQuiz");
        if (quizSec) quizSec.style.display = "block";
    });
});

renderPastQuizScores();