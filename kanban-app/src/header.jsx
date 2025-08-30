// src/Header.jsx

import React, { useState } from 'react';

function Header() {
  // State for the project title and description
  const [title, setTitle] = useState("Ellie's Interiors");
  const [description, setDescription] = useState("Ellie's Interiors - Interior Decorating Business");

  // State to track if the title or description is being edited
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  
  // State for the 'favorite' star
  const [isFavorited, setIsFavorited] = useState(false);

  // --- Event Handlers ---

  // When the user clicks on the title h1, enable editing mode
  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };
  
  // When the user types in the title input box
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // When the user clicks away from the title input box, disable editing mode
  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };
  
  // Handlers for the description (same logic as title)
  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDescriptionBlur = () => {
    setIsEditingDescription(false);
  };

  // Toggles the favorite state when the star is clicked
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };


  return (
    <div className='header'>
      <div className='project-info'>
        <div className='title-container'>
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus // Automatically focus the input when it appears
              className="title-input"
            />
          ) : (
            <h1 onClick={handleTitleClick}>{title}</h1>
          )}
          
          <span onClick={toggleFavorite} className='favorite-star'>
            {isFavorited ? '★' : '☆'}
          </span>
        </div>
        
        <div className='description-container'>
          {isEditingDescription ? (
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              autoFocus
              className="description-input"
            />
          ) : (
            <h5 onClick={handleDescriptionClick}>{description}</h5>
          )}
        </div>
      </div>

      <div className='user-info'>
        <div className='presence-indicators'>
          <span>👥 5 / </span>
          <span>👁️ 2</span>
        </div>
        <img 
          src="https://i.pravatar.cc/40" // A placeholder image service
          alt="User Avatar" 
          className='user-avatar'
        />
      </div>
    </div>
  );
}

export default Header;