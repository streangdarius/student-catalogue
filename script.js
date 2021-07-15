// Declaring all variables inside tha algorithm

const students = [];
let globalID = 1;
let globalGradeID = 1;
let editID = -1;
let selectedGradeID = -1;
let selectedStudentID = -1;
let nameInput = document.getElementById("nameInput");
let gradeInput = document.getElementById("gradeInput");
let addStudentButton = document.getElementById("addStudent");
let addGradesButton = document.getElementById("addGrade");
let tableBody = document.getElementById("tableBody");
let secondTableBody = document.getElementById("secondTableBody");
let ascendingAssort = document.getElementById("ascendingAssort");
let descendingAssort = document.getElementById("descendingAssort");
let ascendingGradeAssort = document.getElementById("ascendingGradeAssort");
let descendingGradeAssort = document.getElementById("descendingGradeAssort");
let activeIDOfStudent = -1;
let deletedIDOfStudent = -1;
/////////////////////////////////////////////////////////////////////// TODO

ascendingAssort.addEventListener("click", function (event) {
  students.sort(comparison);
  resetTable();
  renderTable();
  console.log("Clicked to assort");
});

descendingAssort.addEventListener("click", function (event) {
  students.sort(comparison);
  students.reverse();
  resetTable();
  renderTable();
  console.log("Clicked to assort");
});

function comparison(studentA, studentB) {
  if (studentA.name < studentB.name) {
    return -1;
  } else if (studentA.name > studentB.name) {
    return 1;
  } else {
    return 0;
  }
}

addStudentButton.addEventListener("click", function (event) {
  addStudent();
  console.log("Clicked on button");
});

nameInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addStudent();
    console.log("Pressed Enter key");
  }
});

function addStudent() {
  let newInputName = nameInput.value;
  if (newInputName === "") {
    return alert("Input value is empty. Please type a name.");
  }
  let newStudent = {
    id: globalID++,
    name: newInputName,
    average: 0,
    grades: [],
  };
  students.push(newStudent);
  selectedStudentID = -1;
  resetForm();
  resetTable();
  renderTable();
}

function resetForm() {
  nameInput.value = "";
  nameInput.focus();
}

function renderTable() {
  for (let i = 0; i < students.length; i++) {
    renderStudentRow(students[i]);
  }
}

function resetTable() {
  tableBody.innerHTML = "";
}

function renderStudentRow(student) {
  let studentRow = document.createElement("tr");
  let nameCell = document.createElement("td");
  let gradeCell = document.createElement("td");
  let gradeOptionsCell = document.createElement("td");
  let deleteCell = document.createElement("td");
  nameCell.innerText = student.name;
  gradeCell.innerText = gradeAverage(student.grades);
  let gradeOptionsButton = document.createElement("button");
  gradeOptionsButton.innerText = "View Students Grades";
  gradeOptionsButton.classList.add("modifyButton");
  gradeOptionsButton.addEventListener("click", function (event) {
    selectedStudentID = student.id;
    let gradesWrapper = document.getElementById("gradesWrapper");
    gradesWrapper.classList.remove("student-details-hidden");
    gradesWrapper.classList.add("student-details-show");
    let selectedStudent = document.getElementById("selectedStudent");
    // selectedStudent.classList.add("selected-student");
    selectedStudent.innerHTML = `Selected student: ${student.name}`;
    resetGradeTable();
    renderGradeTable(student.grades);
  });
  gradeOptionsCell.appendChild(gradeOptionsButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", function (event) {
    for (let i = 0; i < students.length; i++) {
      if (student.id === students[i].id) {
        students.splice(i, 1);
      }
    }
    if (selectedStudentID === student.id) {
      let gradesWrapper = document.getElementById("gradesWrapper");
      gradesWrapper.classList.remove("student-details-show");
      gradesWrapper.classList.add("student-details-hidden");
    }
    resetTable();
    renderTable();
  });

  deleteCell.appendChild(deleteButton);
  studentRow.appendChild(nameCell);
  studentRow.appendChild(gradeCell);
  studentRow.appendChild(gradeOptionsCell);
  studentRow.appendChild(deleteCell);
  tableBody.appendChild(studentRow);
}

function gradeAverage(grades) {
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    sum += grades[i];
  }
  const response = Math.round((sum / grades.length) * 100) / 100;
  return isNaN(response) ? "-" : response;
}

function resetGradeTable() {
  secondTableBody.innerHTML = "";
}

function renderGradeTable(grades) {
  for (let i = 0; i < grades.length; i++) {
    renderStudentGrade(grades[i]);
  }
}

function renderStudentGrade(grade) {
  let gradeRow = document.createElement("tr");
  let gradeCell = document.createElement("td");
  let deleteGradeCell = document.createElement("td");
  let deleteGradeButton = document.createElement("button");
  gradeCell.innerText = grade;
  deleteGradeButton.innerText = "Delete";
  deleteGradeButton.classList.add("deleteButton");
  deleteGradeButton.addEventListener("click", function (event) {
    let found = false;
    for (let i = 0; i < students.length && !found; i++) {
      if (selectedStudentID === students[i].id) {
        for (let j = 0; j < students[i].grades.length && !found; j++) {
          if (grade === students[i].grades[j]) {
            found = true;
            students[i].grades.splice(j, 1);
            resetGradeTable();
            renderGradeTable(students[i].grades);
            resetTable();
            renderTable();
          }
        }
      }
    }
  });
  deleteGradeCell.appendChild(deleteGradeButton);
  gradeRow.appendChild(gradeCell);
  gradeRow.appendChild(deleteGradeCell);
  //////////
  secondTableBody.appendChild(gradeRow);
}

ascendingGradeAssort.addEventListener("click", function (event) {
  for (let i = 0; i < students.length; i++) {
    if (selectedStudentID === students[i].id) {
      students[i].grades.sort();
      resetGradeTable();
      renderGradeTable(students[i].grades);
      console.log("Clicked to assort");
    }
  }
});

descendingGradeAssort.addEventListener("click", function (event) {
  for (let i = 0; i < students.length; i++) {
    if (selectedStudentID === students[i].id) {
      students[i].grades.sort();
      students[i].grades.reverse();
      resetGradeTable();
      renderGradeTable(students[i].grades);
      console.log("Clicked to assort");
    }
  }
});

addGradesButton.addEventListener("click", function (event) {
  addGrade();
  console.log("Clicked on button");
});

addGradesButton.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addGrade();
    console.log("Pressed Enter key");
  }
});

function addGrade() {
  let gradeInputValue = parseInt(gradeInput.value);
  if (gradeInputValue > 10 || gradeInputValue < 1) {
    return alert("Grade must be between 1 and 10.");
  }

  for (let i = 0; i < students.length; i++) {
    if (selectedStudentID === students[i].id) {
      students[i].grades.push(gradeInputValue);
      resetGradeTable();
      renderGradeTable(students[i].grades);
      resetTable();
      renderTable();
      gradeInput.value = "";
    }
  }
}

hideGrades.addEventListener("click", function (event) {
  selectedStudentID = -1;
  let gradesWrapper = document.getElementById("gradesWrapper");
  gradesWrapper.classList.add("student-details-hidden");
  gradesWrapper.classList.remove("student-details-show");
});
