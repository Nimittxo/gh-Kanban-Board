// src/KanbanBoard.jsx

import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import Column from './Column';

// This is now a "presentational" component. It just receives props and renders.
function KanbanBoard({ columns, onDragEnd, addCard, deleteCard, editCard }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div className="kanban-board" {...provided.droppableProps} ref={provided.innerRef}>
            {columns.map((column, index) => (
              <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Column
                      id={column.id}
                      title={column.title}
                      cards={column.cards}
                      color={column.color}
                      addCard={addCard}
                      deleteCard={deleteCard}
                      editCard={editCard}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default KanbanBoard;