// Modal.js
import React, { useEffect } from 'react';
import './App.css';

const Modal = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    display: isOpen ? 'block' : 'none',
  };

  useEffect(() => {
    const body = document.body;
    
    if (isOpen) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }

    return () => {
      body.classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
