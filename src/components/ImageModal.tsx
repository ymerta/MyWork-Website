// src/components/ImageModal.tsx

import React from 'react';
import '../styles/ImageModal.css';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content">
        <img src={imageUrl} alt="Profile" />
      </div>
    </div>
  );
};

export default ImageModal;
