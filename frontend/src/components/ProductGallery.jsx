import React, { useState } from 'react';
import './ProductGallery.css';

export default function ProductGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images.length) return <div className="gallery-placeholder">No Image</div>;

  return (
    <div className="product-gallery">
      <div className="main-image-container">
        <img src={activeImage} alt="Product Main" className="main-image" />
      </div>
      <div className="thumbnail-list">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`thumbnail-item ${activeImage === img ? 'active' : ''}`}
            onClick={() => setActiveImage(img)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
