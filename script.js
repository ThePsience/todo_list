let todoArray = [];
const text = document.getElementById('text');
const addTaskButton = document.getElementById('add-task-btn');
const saveTaskButton = document.getElementById('save-todo-btn');
const listBox = document.getElementById('listBox');
const saveInd = document.getElementById('saveIndex');

// Function to display todos
function displayTodo() {
  let todo = localStorage.getItem('todo');
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = '';
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center white-background'>
          <p class='w-full text-white font-bold'>${list}</p>
          <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 rounded text-white text-grey bg-green-600'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
       </div>`;
  });
  listBox.innerHTML = htmlCode;
}

// Load todos on page load
window.onload = displayTodo;

// Add task on button click
addTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  let todo = localStorage.getItem('todo');
  todoArray = todo ? JSON.parse(todo) : [];

  if (text.value.trim() === '') {
    alert('Input cannot be empty!');
    return;
  }

  todoArray.push(text.value);
  text.value = '';
  localStorage.setItem('todo', JSON.stringify(todoArray));
  displayTodo();
});

// Use Enter key to add task
text.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
});

// Delete todo
function deleteTodo(ind) {
  let todo = localStorage.getItem('todo');
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem('todo', JSON.stringify(todoArray));
  displayTodo();
}

// Edit todo
function edit(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem('todo');
  todoArray = JSON.parse(todo);
  text.value = todoArray[ind];
  addTaskButton.style.display = 'none';
  saveTaskButton.style.display = 'block';
}

// Save edited todo
saveTaskButton.addEventListener('click', () => {
  let todo = localStorage.getItem('todo');
  todoArray = JSON.parse(todo);
  let id = saveInd.value;

  todoArray[id] = text.value;
  addTaskButton.style.display = 'block';
  saveTaskButton.style.display = 'none';
  text.value = '';
  localStorage.setItem('todo', JSON.stringify(todoArray));
  displayTodo();
});
