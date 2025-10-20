const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add a new task
function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // × symbol for delete
    li.appendChild(span);

    saveData(); // Save after adding
  }
  inputBox.value = "";
}

// Handle click events (check or delete)
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

// Save tasks to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load saved tasks
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

// Show tasks on page load
showTask();
