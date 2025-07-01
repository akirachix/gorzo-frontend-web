import React from 'react';
import './button.css';
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

