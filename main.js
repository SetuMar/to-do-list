// get base task node
const taskNode = document.getElementsByClassName("task")[0]

// clone for reuse
let baseTask = taskNode.cloneNode(true)

const newTaskInput = document.getElementById("new-task-input")
const addTaskButton = document.getElementById("add-task-button")

const tasksDiv = document.getElementById("tasks")

// list of tasks to do
// saved in local storage as "tasks"
let tasks = []

baseTask.querySelector('.finish-task').onclick = removeTask

// remove so it's not visisble on the webpage
taskNode.remove()

// previous id
let previousId = "task-0"

tasks = JSON.parse(localStorage.getItem("tasks"))

function generateTasksList() { 
    let allTasks = [...document.getElementById("tasks").children]
    
    let previousId = "task-0"

    tasks = []

    allTasks.forEach(div => {
        tasks.push(div.querySelector('.task-text').value)
        div.id = previousId
        previousId = previousId.split("-")[0] + "-" + (parseInt(previousId.split("-")[1]) + 1)
    });
}

function addTask(text) {
    // get text of task to add and set it to the proper text
    baseTask.querySelector('.task-text').value = text
    tasksDiv.appendChild(baseTask)

    // id of previous element
    baseTask.id = previousId
    baseTask.querySelector('.finish-task').onclick = removeTask
    
    // increment id
    previousId = previousId.split("-")[0] + "-" + (parseInt(previousId.split("-")[1]) + 1)
    
    // have to re-clone it each time
        // cloned element is already part of DOM, so you can't re-add it
    baseTask = baseTask.cloneNode(true)
}

window.addEventListener('beforeunload', () => {
    generateTasksList()
    
    localStorage.setItem("tasks", JSON.stringify(tasks))
})

tasks.forEach(t => {
    addTask(t)
});

// function which removes task
function removeTask() {
    // the exact value of the id is not important, so long as it targets the correct element
    const taskToRemove = document.getElementById(this.parentElement.id)
    
    tasks.shift(taskToRemove.querySelector(".task-text").value)
    taskToRemove.remove()
}

// when button is clicked
addTaskButton.onclick = () => {
    // check if the task is not an empty string
    if (newTaskInput.value.length > 0) {
        addTask(newTaskInput.value)
        newTaskInput.value = ""
    }
}