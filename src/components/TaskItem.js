import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const { title, description, completed, createdAt } = task;

  return (
    <div className={`task-item ${completed ? "completed" : ""}`}>
      <h4>{title}</h4>
      <p>{description}</p>
      <small>Created: {new Date(createdAt).toLocaleString()}</small>
      <br />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggleComplete}
        />
        {completed ? " Mark as Pending" : " Mark as Completed"}
      </label>
      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="logout-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
