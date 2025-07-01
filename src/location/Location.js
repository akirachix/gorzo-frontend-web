

import React from 'react';
import './Location.css';


function LocationPrompt() {

  return (
    <div className="location-container">
      <div className="location-popup">
        <div className="location-icon">📍</div>

        <h2>Allow “Haba” to access your location?</h2>
        <p>Sharing your location allows Haba to provide nearby vendors.</p>

        <button>when using the app</button>
        <button>Only this time</button>
        <button>Don’t allow</button>
      </div>
    </div>
  );
}

export default LocationPrompt;
