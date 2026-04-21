import { useState } from "react";

function ToDo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTask] = useState([]);

  function handleAddTask() {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, done: false }]);
    setTask(""); // ✅ fixed
  }

  function handleDelete(indexToDelete) {
    const taskToMove = tasks[indexToDelete];

    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);

    setTasks(updatedTasks);
    setDeletedTask([...deletedTasks, taskToMove]);
  }

  function handleEdit(index) {
    const newTask = prompt("Edit your Task:");

    if (!newTask || newTask.trim() === "") return;

    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, text: newTask } : t // ✅ fixed
    );

    setTasks(updatedTasks);
  }

  function clearTask() {
    setTasks([]);        // ✅ fixed
    setDeletedTask([]);  // ✅ fixed
  }

  function handleToggle(index) {
    const updatedTask = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t // ✅ fixed
    );

    setTasks(updatedTask);
  }

  return (
    <div className="container">
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleAddTask}>Add Task</button>

      <div>
        <h2>Available Task</h2>

        {tasks.length > 0 ? (
          <ul>
            {tasks.map((t, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => handleToggle(index)}
                />

                <span
                  style={{
                    textDecoration: t.done ? "line-through" : "none",
                  }}
                >
                  {t.text}
                </span>

                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks Available</p>
        )}
      </div>

      <div>
        <h2>Deleted Tasks</h2>

        {deletedTasks.length > 0 ? (
          <ul>
            {deletedTasks.map((t, index) => (
              <li key={index}>{t.text}</li> // ✅ fixed
            ))}
          </ul>
        ) : (
          <p>No deleted tasks</p>
        )}
      </div>

      <button onClick={clearTask}>Clear All</button>
    </div>
  );
}

export default ToDo;