class ToDoClass {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("TASKS"));
    if (!this.tasks) {
      this.tasks = [
        { task: "GO TO Dentist", isComplete: true },
        { task: "learn web dev", isComplete: false },
        { task: "learn JAVA ", isComplete: false }
      ];
    }
  }
  loadTasks() {
    let tasksHtml;
    tasksHtml = this.tasks.reduce(
      (html, task, index) => (html += this.generateTaskHtml(task, index)),
      ""
    );
    document.getElementById("taskList").innerHTML = tasksHtml;

    localStorage.setItem("TASKS", JSON.stringify(this.tasks));
  }
  generateTaskHtml(task, index) {
    return `
      <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input
                id="checkbox-${index}"
                type="checkbox"
                aria-label="Checkbox for following text input"
                ${task.isComplete ? "checked" : ""}
                onchange="toDo.toggleTaskStatus(${index})"
              />
            </div>
          </div>
          <label for="checkbox-${index}" class="form-control">${
      task.task
    }</label>
           <div class="input-group-prepend">
              <button style="margin-left: -2px" class="btn btn-outline-danger" type="button" id="button-addon1" onclick="toDo.deleteTasks(event,${index})">Remove</button>
            </div>
        </div>
    `;
  }
  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this.loadTasks();
  }
  deleteTasks(event, taskIndex) {
    event.preventDefault();
    this.tasks.splice(taskIndex, 1);
    this.loadTasks();
  }
  addTaskClick(event) {
    event.preventDefault();
    let target = document.getElementById("addTask");
    this.addTask(target.value);
    target.value = "";
  }
  addTask(task) {
    let newTask = {
      task: task,
      isComplete: false
    };
    if (!!task) {
      this.tasks.push(newTask);
      this.loadTasks();
    } else {
      alert("type something in the input");
    }
  }
  addEventListener() {
    document.getElementById("addTask").addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        this.addTask(event.target.value);
        event.target.value = "";
      }
    });
  }
}

let toDo;
window.addEventListener("load", () => {
  toDo = new ToDoClass();
  toDo.loadTasks();
  toDo.addEventListener();
});
