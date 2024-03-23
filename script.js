document.getElementById('add-todo-btn').addEventListener('click', function() {
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();
    if (taskText !== "") {
        createTaskBubble(taskText);
        input.value = ''; // Clear the input after adding
    }
});

function createTaskBubble(text) {
    const taskBubble = document.createElement('div');
    taskBubble.className = 'task-bubble';
    taskBubble.textContent = text;
    taskBubble.draggable = true;
    taskBubble.id = 'task-' + Date.now(); // Unique ID for the task

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕'; // You can use an icon or emoji here
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskBubble.remove();
    };
    taskBubble.appendChild(deleteBtn);

    document.body.appendChild(taskBubble);

    // Place the task at a random position on the screen
    positionTaskBubbleRandomly(taskBubble);

    // Event listeners for dragging (desktop only)
    taskBubble.addEventListener('dragstart', dragStart);
    taskBubble.addEventListener('dragend', dragEnd);
}

function positionTaskBubbleRandomly(bubble) {
    // Get the dimensions of the header to offset the random position
    const headerOffset = document.querySelector('.app').getBoundingClientRect().bottom;
    const maxX = window.innerWidth - bubble.offsetWidth;
    const maxY = window.innerHeight - bubble.offsetHeight - headerOffset;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) + headerOffset;

    bubble.style.left = `${randomX}px`;
    bubble.style.top = `${randomY}px`;
}

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    if (draggable) {
        const offsetX = e.clientX - draggable.offsetWidth / 2;
        const offsetY = e.clientY - draggable.offsetHeight / 2;
        draggable.style.left = `${offsetX}px`;
        draggable.style.top = `${offsetY}px`;
        draggable.classList.remove('dragging');
    }
});
