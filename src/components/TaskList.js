import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";

const TaskList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    setEditingTask(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h2>Welcome, {username} 👋</h2>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>+ Add Task</button>
      )}

      {showForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdate : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          initialData={editingTask}
        />
      )}

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
      />

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No matching tasks.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(task.id)}
              onToggleComplete={() => toggleComplete(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
