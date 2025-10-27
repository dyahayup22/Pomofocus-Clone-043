import React, { useState, useEffect } from "react";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false);

  // simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // tambah task
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setShowInput(false);
  };

  // toggle centang
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // hapus task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="tasklist-container">
      {/* Header */}
      <div className="tasklist-header">
        <h3>Tasks</h3>
        <button className="tasklist-menu">⋮</button>
      </div>

      {/* === List Task tampil di atas tombol Add === */}
      <ul className="tasklist-items">
        {tasks.map((task) => (
          <li key={task.id} className="tasklist-item">
            <label className="tasklist-label">
              <input
                type="checkbox"
                className="tasklist-checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span
                className={
                  task.completed
                    ? "tasklist-title tasklist-done"
                    : "tasklist-title"
                }
              >
                {task.title}
              </span>
            </label>
            <div className="tasklist-right">
              <span className="tasklist-progress">0 / 1</span>
              <button className="tasklist-menu">⋮</button>
              <button
                className="tasklist-delete"
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* === Form Input Add Task di bawah === */}
      <div className="tasklist-add-wrapper">
        {showInput ? (
          <div className="tasklist-input-box">
            <input
              type="text"
              value={newTask}
              placeholder="What are you working on?"
              onChange={(e) => setNewTask(e.target.value)}
              className="tasklist-input"
            />

            <div className="tasklist-bottom">
              <div className="tasklist-actions">
                <button
                  className="tasklist-cancel"
                  onClick={() => setShowInput(false)}
                >
                  Cancel
                </button>
                <button className="tasklist-save" onClick={addTask}>
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="tasklist-add-btn"
            onClick={() => setShowInput(true)}
          >
            + Add Task
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskList;
