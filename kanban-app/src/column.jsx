// src/Column.jsx

import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Card from './card';

// Receive the new functions as props
function Column({ id, title, cards, color, addCard, deleteCard, editCard }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardText, setNewCardText] = useState('');

  const handleAddCard = () => {
    if (newCardText.trim()) {
      addCard(id, newCardText); // Call parent function
      setNewCardText('');
      setIsAddingCard(false);
    }
  };

  return (
    <div className='column'>
      <div className='column-header' style={{ borderTop: `5px solid ${color}` }}>
        <h3>{title} <span className='card-count'>{cards.length}</span></h3>
      </div>
      
      <Droppable droppableId={id.toString()} type="card">
        {(provided, snapshot) => (
          <div
            className={`cards-container ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
            ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                columnId={id}           // Pass down columnId
                deleteCard={deleteCard} // Pass down deleteCard
                editCard={editCard}     // Pass down editCard
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAddingCard ? (
        <div className="add-card-form">
          <textarea
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            placeholder="Enter a title for this card..."
            autoFocus
          />
          <div className="add-card-controls">
            <button className="save-card-btn" onClick={handleAddCard}>Add card</button>
            <button className="close-add-card-btn" onClick={() => setIsAddingCard(false)}>✕</button>
          </div>
        </div>
      ) : (
        <button className='add-card-btn' onClick={() => setIsAddingCard(true)}>+ Add a card</button>
      )}
    </div>
  );
}

export default Column;