let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');

function addTask(){
    if(inputBox.value == ''){
        alert('Please Enter the Text');
    } else {
        const task = document.createElement('li');
        task.textContent = inputBox.value;
        task.draggable = true; // Enable dragging for tasks
        task.setAttribute('contenteditable', 'true'); // Allow task editing
        listContainer.appendChild(task);
        let span = document.createElement('span');
        span.textContent = "\u00d7";
        task.appendChild(span);
        span.style.right = '0px';
    }
    inputBox.value = '';
    saveData();
}

function clearAllTasks() {
    listContainer.innerHTML = ''; // Remove all tasks from the list
    saveData(); // Save the updated list (empty) to local storage
}

listContainer.addEventListener('click', (e)=>{
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// Drag and Drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    saveData(); // Save the updated order to local storage
}
