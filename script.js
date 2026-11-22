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
// PROFESSIONAL STUDYFLOW POMODORO TIMER (COUNT-UP)
// =====================================================

const timerDisplay = document.getElementById("timerDisplay");
const timerStatus = document.getElementById("timerStatus");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const studyModeBtn = document.getElementById("studyModeBtn");
const breakModeBtn = document.getElementById("breakModeBtn");
const sessionCount = document.getElementById("sessionCount");

const studyHoursInput = document.getElementById("studyHoursInput");
const studyMinutesInput = document.getElementById("studyMinutesInput");
const breakDurationInput = document.getElementById("breakDurationInput");
const saveTimerSettingsBtn = document.getElementById("saveTimerSettingsBtn");
const resetDefaultSettingsBtn = document.getElementById("resetDefaultSettingsBtn");

const studyPresetBtns = document.querySelectorAll("#studyPresets button");
const breakPresetBtns = document.querySelectorAll("#breakPresets button");

const studyTaskInput = document.getElementById("studyTaskInput");
const todayStudyTime = document.getElementById("todayStudyTime");
const totalStudyTime = document.getElementById("totalStudyTime");
const timerRing = document.getElementById("timerRing");
const timerModeLabel = document.getElementById("timerModeLabel");
const timerCaption = document.getElementById("timerCaption");
const pomodoroTaskStatus = document.getElementById("pomodoroTaskStatus");
const pomodoroBadge = document.getElementById("pomodoroBadge");

// TIMER VARIABLES
let timerInterval = null;
let isRunning = false;
let currentMode = "study";

// Default: 25 mins study, 5 mins break
let studyDuration = Number(localStorage.getItem("studyflowStudyDuration")) || 25;
let breakDuration = Number(localStorage.getItem("studyflowBreakDuration")) || 5;

// Count-up: starts from 0 seconds
let elapsedSeconds = 0;

let completedSessions = Number(localStorage.getItem("studyflowPomodoroSessions")) || 0;

const todayKey = new Date().toLocaleDateString("en-CA");
let todaySeconds = Number(localStorage.getItem("studyflowTodaySeconds")) || 0;
let allTimeSeconds = Number(localStorage.getItem("studyflowAllTimeSeconds")) || 0;
let savedDate = localStorage.getItem("studyflowStudyDate") || todayKey;

if (savedDate !== todayKey) {
    todaySeconds = 0;
    localStorage.setItem("studyflowTodaySeconds", "0");
    localStorage.setItem("studyflowStudyDate", todayKey);
}

// Sync Inputs & Presets with current durations
function syncSettingsUI() {
    const hrs = Math.floor(studyDuration / 60);
    const mins = studyDuration % 60;

    studyHoursInput.value = hrs;
    studyMinutesInput.value = mins;
    breakDurationInput.value = breakDuration;

    studyPresetBtns.forEach(btn => {
        btn.classList.toggle("active-pill", Number(btn.dataset.mins) === studyDuration);
    });

    breakPresetBtns.forEach(btn => {
        btn.classList.toggle("active-pill", Number(btn.dataset.mins) === breakDuration);
    });
}

// Format 00:00 or 00:00:00
function formatClock(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return (
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(remainingSeconds).padStart(2, "0")
        );
    }

    return (
        String(minutes).padStart(2, "0") + ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}

// Format Target Label (e.g., 1h 30m or 25m)
function formatTargetLabel(totalMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    if (h > 0 && m > 0) return `Target: ${h}h ${m}m`;
    if (h > 0) return `Target: ${h}h`;
    return `Target: ${m}m`;
}

// Format Total Study Hours
function formatStudyTotal(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours + "h " + String(minutes).padStart(2, "0") + "m";
}

function saveStudyData() {
    localStorage.setItem("studyflowPomodoroSessions", completedSessions);
    localStorage.setItem("studyflowTodaySeconds", todaySeconds);
    localStorage.setItem("studyflowAllTimeSeconds", allTimeSeconds);
    localStorage.setItem("studyflowStudyDate", todayKey);
}

function updateStudyStats() {
    todayStudyTime.textContent = formatStudyTotal(todaySeconds);
    totalStudyTime.textContent = formatStudyTotal(allTimeSeconds);
    sessionCount.textContent = completedSessions;
}

// UPDATE DISPLAY & PROGRESS RING (0% -> 100%)
function updateTimerDisplay() {
    timerDisplay.textContent = formatClock(elapsedSeconds);

    const targetMins = currentMode === "study" ? studyDuration : breakDuration;
    const totalTargetSeconds = targetMins * 60;

    const progress = totalTargetSeconds > 0
        ? Math.min((elapsedSeconds / totalTargetSeconds) * 100, 100)
        : 0;

    timerRing.style.setProperty("--timer-progress", progress + "%");
    timerRing.classList.toggle("break-ring", currentMode === "break");

    timerModeLabel.textContent = currentMode === "study" ? "FOCUS SESSION" : "BREAK TIME";
    timerCaption.textContent = formatTargetLabel(targetMins);
}

function updateModeButtons() {
    studyModeBtn.classList.toggle("active", currentMode === "study");
    breakModeBtn.classList.toggle("active", currentMode === "break");
}

function countStudyTime() {
    todaySeconds++;
    allTimeSeconds++;
    saveStudyData();
    updateStudyStats();
}

// START TIMER (COUNTS UP FROM 0)
function startTimer() {
    if (isRunning) return;

    const targetMins = currentMode === "study" ? studyDuration : breakDuration;
    const totalTargetSeconds = targetMins * 60;

    if (elapsedSeconds >= totalTargetSeconds) {
        elapsedSeconds = 0;
    }

    isRunning = true;
    startTimerBtn.disabled = true;

    if (pomodoroBadge) {
        pomodoroBadge.innerHTML = currentMode === "study"
            ? "<span></span> Focusing..."
            : "<span></span> On Break...";
    }

    if (currentMode === "study") {
        const task = studyTaskInput.value.trim();
        pomodoroTaskStatus.textContent = task
            ? "Working on: " + task
            : "Study session in progress!";
        timerStatus.textContent = "Focus on your study session.";
    } else {
        timerStatus.textContent = "Take a short break and relax.";
    }

    timerInterval = setInterval(function () {
        if (currentMode === "study") {
            countStudyTime();
        }

        elapsedSeconds++;
        updateTimerDisplay();

        if (elapsedSeconds >= totalTargetSeconds) {
            completeSession();
        }
    }, 1000);
}

// PAUSE TIMER
function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    startTimerBtn.disabled = false;

    if (pomodoroBadge) {
        pomodoroBadge.innerHTML = "<span></span> Paused";
    }
    timerStatus.textContent = "Timer paused.";
}

// RESET TIMER TO 00:00
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    startTimerBtn.disabled = false;

    elapsedSeconds = 0;

    if (pomodoroBadge) {
        pomodoroBadge.innerHTML = "<span></span> Ready to focus";
    }
    timerStatus.textContent = "Timer reset to 00:00. Ready to start?";
    updateTimerDisplay();
}

// SWITCH STUDY / BREAK MODE
function setTimerMode(mode) {
    if (isRunning) {
        const confirmSwitch = confirm("Current timer will stop. Do you want to continue?");
        if (!confirmSwitch) return;
    }

    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    startTimerBtn.disabled = false;

    currentMode = mode;
    elapsedSeconds = 0;

    if (currentMode === "study") {
        timerStatus.textContent = "Ready for your study session?";
    } else {
        timerStatus.textContent = "Enjoy your break!";
    }

    updateModeButtons();
    updateTimerDisplay();
}

// COMPLETE SESSION
function completeSession() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    startTimerBtn.disabled = false;

    if (currentMode === "study") {
        completedSessions++;
        saveStudyData();
        updateStudyStats();

        timerStatus.textContent = "🎉 Study session completed!";
        pomodoroTaskStatus.textContent = "Completed: " + (studyTaskInput.value.trim() || "Study session");

        alert("🎉 Great work! Your study target is completed. Time for a break.");
        setTimerMode("break");
    } else {
        timerStatus.textContent = "☕ Break completed!";
        alert("Break finished! Time to get back to studying.");
        setTimerMode("study");
    }
}

// APPLY CUSTOM SETTINGS (HOURS + MINUTES & BREAK)
function applyTimerSettings() {
    if (isRunning) {
        alert("Please pause the timer before changing settings.");
        return;
    }

    const hrs = Number(studyHoursInput.value) || 0;
    const mins = Number(studyMinutesInput.value) || 0;
    const totalStudyMins = (hrs * 60) + mins;
    const breakValue = Number(breakDurationInput.value);

    if (hrs < 0 || hrs > 10 || mins < 0 || mins > 59 || totalStudyMins < 1) {
        alert("Please enter a valid study duration (minimum 1 minute, max 10 hours).");
        return;
    }

    if (!Number.isInteger(breakValue) || breakValue < 1 || breakValue > 180) {
        alert("Break duration must be between 1 and 180 minutes.");
        return;
    }

    studyDuration = totalStudyMins;
    breakDuration = breakValue;

    localStorage.setItem("studyflowStudyDuration", studyDuration);
    localStorage.setItem("studyflowBreakDuration", breakDuration);

    elapsedSeconds = 0;
    syncSettingsUI();
    updateTimerDisplay();

    timerStatus.textContent = "Settings applied! Timer ready at 00:00.";
}

// RESET TO DEFAULT (25m Study / 5m Break)
function resetToDefaultSettings() {
    if (isRunning) {
        alert("Please pause the timer before resetting to default.");
        return;
    }

    studyDuration = 25;
    breakDuration = 5;

    localStorage.setItem("studyflowStudyDuration", studyDuration);
    localStorage.setItem("studyflowBreakDuration", breakDuration);

    elapsedSeconds = 0;
    syncSettingsUI();
    updateTimerDisplay();

    timerStatus.textContent = "Default settings restored (25m Study / 5m Break).";
}

// PRESET BUTTON CLICKS
studyPresetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const totalMins = Number(btn.dataset.mins);
        studyHoursInput.value = Math.floor(totalMins / 60);
        studyMinutesInput.value = totalMins % 60;
        studyPresetBtns.forEach(b => b.classList.remove("active-pill"));
        btn.classList.add("active-pill");
    });
});

breakPresetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        breakDurationInput.value = Number(btn.dataset.mins);
        breakPresetBtns.forEach(b => b.classList.remove("active-pill"));
        btn.classList.add("active-pill");
    });
});

// BUTTON EVENTS
startTimerBtn.addEventListener("click", startTimer);
pauseTimerBtn.addEventListener("click", pauseTimer);
resetTimerBtn.addEventListener("click", resetTimer);
studyModeBtn.addEventListener("click", () => setTimerMode("study"));
breakModeBtn.addEventListener("click", () => setTimerMode("break"));
saveTimerSettingsBtn.addEventListener("click", applyTimerSettings);
resetDefaultSettingsBtn.addEventListener("click", resetToDefaultSettings);

// INITIAL LOAD
syncSettingsUI();
updateModeButtons();
updateTimerDisplay();
updateStudyStats();
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
    const savedName = localStorage.getItem("studyflowStudentName");
    if (savedName && studentNameInput) {
        studentNameInput.value = savedName;
    }
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

const studentGreeting =
    document.getElementById("studentGreeting");


function loadStudentGreeting() {

    const savedName =
        localStorage.getItem("studyflowStudentName");


    if (savedName) {

        studentGreeting.textContent =
            savedName;

    } else {

        studentGreeting.textContent =
            "Student";

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
        if (data.subjects) localStorage.setItem("studyflowSubjects", JSON.stringify(data.subjects));
        if (data.tasks) localStorage.setItem("studyflowTasks", JSON.stringify(data.tasks));
        if (data.schedules) localStorage.setItem("studyflowSchedules", JSON.stringify(data.schedules));
        if (data.notes) localStorage.setItem("studyflowNotes", JSON.stringify(data.notes));
        if (data.pomodoro) {
            localStorage.setItem("studyflowPomodoroStats", JSON.stringify(data.pomodoro));
        }

        // UI refresh functions agar defined hain toh call karein
        if (typeof renderSubjects === "function") renderSubjects();
        if (typeof renderTasks === "function") renderTasks();
        if (typeof renderSchedules === "function") renderSchedules();
        if (typeof renderNotes === "function") renderNotes();
        if (typeof updateDashboardStats === "function") updateDashboardStats();
    } catch (err) {
        console.warn("Offline mode: using local cache", err);
    }
}

// Local data ko MongoDB Cloud par sync karna
async function syncStudyDataToCloud() {
    const token = getAuthToken();
    if (!token) return;

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
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async function () {
        await syncStudyDataToCloud();
        localStorage.removeItem("studyflowLoggedIn");
        localStorage.removeItem("studyflowToken");
        showLoginPage();
        showAuthMessage("loginMessage", "Logged out safely. All data synced!", "success");
    });
}