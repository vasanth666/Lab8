import React, { useState } from 'react';
import './App.css';

const ToDoApp = () => {
  const [vasitems, vassetItems] = useState([]);
  const [vasinputValue, vassetInputValue] = useState('');
  const [vaseditingItem, vassetEditingItem] = useState({});

  const handleAddItem = () => {
    if (vasinputValue.trim() === '') return;

    const newItem = {
      id: Date.now(),
      description: vasinputValue,
    };
    
    vassetItems([...vasitems, newItem]);
    vassetInputValue('');
  };

  const handleDeleteItem = (itemId) => {
    vassetItems(vasitems.filter(item => item.id !== itemId));
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = vasitems.find(item => item.id === itemId);
    vassetEditingItem(itemToEdit);
  };

  const handleSaveItem = () => {
    vassetItems(vasitems.map(item => 
      item.id === vaseditingItem.id ? { ...item, description: vaseditingItem.description } : item
    ));
    vassetEditingItem({});
  };

  return (
    <div className="ToDoApp">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          value={vasinputValue}
          onChange={(e) => vassetInputValue(e.target.value)}
          placeholder="Enter a new task"
        />
        <button className="add-button" onClick={handleAddItem}>Add Task</button>
      </div>
      <ul>
        {vasitems.map(item => (
          <li key={item.id}>
            {vaseditingItem.id === item.id ? (
              <div>
                <input
                  type="text"
                  value={vaseditingItem.description}
                  onChange={(e) => vassetEditingItem({ ...vaseditingItem, description: e.target.value })}
                />
                <button className="save-button" onClick={handleSaveItem}>Save</button>
              </div>
            ) : (
              <div>
                {item.description}
                <button className="edit-button" onClick={() => handleEditItem(item.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;