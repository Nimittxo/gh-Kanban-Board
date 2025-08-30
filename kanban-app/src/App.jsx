// src/App.jsx

import React, { useState } from 'react';
import './App.css';
import Header from './header';
import KanbanBoard from './kanbanBoard';
import SettingsDrawer from './SettingsDrawer';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const [columns, setColumns] = useState([
    { id: 1, title: 'Not Started', color: '#7ED321', cards: [{ id: 'card-1', text: 'Analyze requirements' }] },
    { id: 2, title: 'In-Progress', color: '#4A90E2', cards: [{ id: 'card-3', text: 'Develop login page' }] },
    { id: 3, title: 'Stuck', color: '#F5A623', cards: [{ id: 'card-5', text: 'Fix API bug' }] },
    { id: 4, title: 'Done', color: '#BD10E0', cards: [{ id: 'card-4', text: 'Set up repository' }] },
  ]);

  const addCard = (columnId, cardText) => {
    const newCard = { id: `card-${new Date().getTime()}`, text: cardText };
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, cards: [...column.cards, newCard] };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const deleteCard = (columnId, cardId) => {
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, cards: column.cards.filter(card => card.id !== cardId) };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const editCard = (columnId, cardId, newText) => {
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, cards: column.cards.map(card => card.id === cardId ? { ...card, text: newText } : card) };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columns);
      const [reorderedColumn] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, reorderedColumn);
      setColumns(newColumnOrder);
      return;
    }

    const sourceCol = columns.find(col => col.id.toString() === source.droppableId);
    const destCol = columns.find(col => col.id.toString() === destination.droppableId);

    if (sourceCol === destCol) {
      const newCards = Array.from(sourceCol.cards);
      const [reorderedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedCard);
      const newColumns = columns.map(col => col.id === sourceCol.id ? { ...col, cards: newCards } : col);
      setColumns(newColumns);
    } else {
      const sourceCards = Array.from(sourceCol.cards);
      const [movedCard] = sourceCards.splice(source.index, 1);
      const destCards = Array.from(destCol.cards);
      destCards.splice(destination.index, 0, movedCard);
      const newColumns = columns.map(col => {
        if (col.id === sourceCol.id) return { ...col, cards: sourceCards };
        if (col.id === destCol.id) return { ...col, cards: destCards };
        return col;
      });
      setColumns(newColumns);
    }
  };
  
  const addNewColumn = (columnName) => {
    const newColumn = {
      id: new Date().getTime(),
      title: columnName,
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      cards: [],
    };
    setColumns([...columns, newColumn]);
  };

  return (
    <div className={`app-container ${theme}`}>
      <Header />
      <div className='sub-header'>
        <h2>Kanban</h2>
        <div className='board-controls'>
          <button onClick={() => setIsDrawerOpen(true)}>Settings</button>
        </div>
      </div>

      <main className='main-content'>
        <KanbanBoard
          columns={columns}
          onDragEnd={onDragEnd}
          addCard={addCard}
          deleteCard={deleteCard}
          editCard={editCard}
        />
      </main>
      
      <SettingsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        columns={columns}
        addNewColumn={addNewColumn}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}

export default App;