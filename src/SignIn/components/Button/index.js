import React from 'react';
import './index.css';
export const Button = ({ text, onClick, variant }) => {
  return (
    <button
      
      onClick={onClick}
      className={`shared-button ${variant}`}
    >
      {text}
    </button>
  );
};

