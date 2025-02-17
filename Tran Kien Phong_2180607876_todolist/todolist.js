const inputTask = document.querySelector("#inputtask");
const form = document.querySelector(".form");
const addButton = document.querySelector("#addbutton");
const toDoList = document.querySelector(".todolist");
const clear = document.querySelector(".clear");
const datePicker = document.querySelector("#start");
const timePicker = document.querySelector("#appt");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputTask.value == "") {
    alert("please add Some Text");
  } else {
    const newTask = createNewItem(inputTask.value);
    const date = createNewItem(datePicker.value);
    const time = createNewItem(timePicker.value);
    toDoList.appendChild(newTask,date,time);
    inputTask.value = "";
    inputTask.focus();
    clear.classList.remove("d-none");
  }

  clear.addEventListener("click", function () {
    toDoList.innerHTML = "";
  });
});

function createNewItem() {
  const task = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  span.textContent = `${inputTask.value} ${datePicker.value} ${timePicker.value}`;
  delBtn.textContent = "Delete";
  editBtn.textContent = "Edit";
  task.appendChild(span);
  task.appendChild(delBtn);
  task.appendChild(editBtn);

  delBtn.addEventListener("click", function () {
    task.parentNode.removeChild(task);
  });
  editBtn.addEventListener("click", function () {
    span.contentEditable = true;
    span.focus();
  });

  return task;
}
