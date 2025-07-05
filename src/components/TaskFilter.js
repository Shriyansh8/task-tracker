import React from "react";

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="filter-tabs">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={currentFilter === f ? "active" : ""}
        >
          {f} ({taskCounts[f.toLowerCase()] || 0})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
