
import React from 'react';
import './ProductDisplay.css';

function ProductDisplay({ image, name, price,stock }) {
  return (
    <div className="product-display">
      <div>
           <h2>{name}</h2>
           <img></img>
      </div>
            <img src={image} alt={name} className="product-image" />
            <div className="productStats">
                <span className="product-price">${price}</span>
                 <p>{stock}</p>

            </div>
     
     
    </div>
  );
}

export default ProductDisplay;