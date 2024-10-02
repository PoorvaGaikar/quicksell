import React, { useState } from 'react';

const Header = ({ onGroupChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <h1>Kanban Board</h1>
      <div className="display-dropdown">
        <button onClick={() => setIsOpen(!isOpen)}>Display ▼</button>
        {isOpen && (
          <div className="dropdown-content">
            <div>
              <label>Grouping</label>
              <select onChange={(e) => onGroupChange(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div>
              <label>Ordering</label>
              <select onChange={(e) => onSortChange(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;