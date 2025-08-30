// src/SettingsDrawer.jsx

import React, { useState } from 'react';

function SettingsDrawer({ isOpen, onClose, columns, addNewColumn, theme, setTheme }) {
  const [newColumnName, setNewColumnName] = useState('');

  const handleAddColumn = (e) => {
    e.preventDefault();
    if (newColumnName.trim()) {
      addNewColumn(newColumnName);
      setNewColumnName('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Overlay to close the drawer when clicked
    <div className="drawer-overlay" onClick={onClose}>
      <div className="settings-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="close-drawer-btn" onClick={onClose}>→</button>
        <h2>Settings</h2>

        <div className="drawer-section">
          <h3>Kanban Columns</h3>
          <ul className="column-list">
            {columns.map(col => <li key={col.id}>{col.title}</li>)}
          </ul>
          <form onSubmit={handleAddColumn} className="add-column-form">
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="+ Create New Column"
            />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="drawer-section">
          <h3>Display Settings</h3>
          <div className="theme-options">
            <button
              className={theme === 'light' ? 'active' : ''}
              onClick={() => setTheme('light')}
            >
              Light Theme
            </button>
            <button
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => setTheme('dark')}
            >
              Dark Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsDrawer;