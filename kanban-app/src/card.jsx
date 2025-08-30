// src/Card.jsx

import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';

function Card({ card, index, columnId, deleteCard, editCard }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(card.text);

  const handleEdit = () => {
    if (editedText.trim()) {
      editCard(columnId, card.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDragging ? 'is-dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <div className="edit-card-form">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={handleEdit} // Save when user clicks away
                autoFocus
              />
            </div>
          ) : (
            <div className="card-content">
              <span>{card.text}</span>
              <div className="card-icons">
                <span onClick={() => setIsEditing(true)} className="icon">✏️</span>
                <span onClick={() => deleteCard(columnId, card.id)} className="icon">🗑️</span>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Card;