import React, { useState } from 'react';
import './DisplayOptions.css'; // Ensure you have a CSS file for styling

const DisplayOptions = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <div className="display-options">
      <button className="display-button" onClick={toggleVisibility}>
        Display ▼
      </button>

      {isVisible && (
        <div className="options-container">
          <div className="option-group">
            <label htmlFor="groupBy">Grouping:</label>
            <select
              id="groupBy"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="option-group">
            <label htmlFor="sortBy">Sorting:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
