import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ToDo() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    return saved || [];
  });
  const [deletedTasks, setDeletedTask] = useState(() => {
    const deleted = JSON.parse(localStorage.getItem("deletedTasks"));
    return deleted || [];
  });

  function handleAddTask() {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }, [deletedTasks]);

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
      i === index ? { ...t, text: newTask } : t
    );

    setTasks(updatedTasks);
  }

  function clearTask() {
    setTasks([]);
    setDeletedTask([]);
  }

  function handleToggle(index) {
    const updatedTask = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );

    setTasks(updatedTask);
  }

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        {theme == "light"?"Swith to Dark":"swith to light"}
      </button>
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
              <li key={index}>{t.text}</li>
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