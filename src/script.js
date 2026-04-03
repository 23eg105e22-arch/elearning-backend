/* eslint-disable no-unused-vars */
const API = "https://elearning-backend-app.onrender.com";

// STUDENT
function addStudent() {
    fetch(`${API}/students`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Student Added");
        loadStudents();
    });
}

function loadStudents() {
    fetch(`${API}/students`)
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("studentList");
        if(list){
            list.innerHTML = "";
            data.forEach(s => {
                list.innerHTML += `<li>${s.name} (${s.email})</li>`;
            });
        }
    });
}

// COURSE
function addCourse() {
    fetch(`${API}/courses`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: document.getElementById("title").value,
            description: document.getElementById("desc").value
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Course Added");
        loadCourses();
    });
}

function loadCourses() {
    fetch(`${API}/courses`)
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("courseList");
        if(list){
            list.innerHTML = "";
            data.forEach(c => {
                list.innerHTML += `<li>${c.title}</li>`;
            });
        }
    });
}

// ENROLL
function enroll() {
    const sId = document.getElementById("studentId").value;
    const cId = document.getElementById("courseId").value;

    fetch(`${API}/enroll?studentId=${sId}&courseId=${cId}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(() => alert("Enrollment Successful"));
}

// AUTO LOAD
window.onload = () => {
    loadStudents();
    loadCourses();
};