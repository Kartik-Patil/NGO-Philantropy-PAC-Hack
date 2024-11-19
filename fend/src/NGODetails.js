// NGODetails.js

import React from 'react';
import './NGODetails.css';

const NGODetails = ({ ngo, onClose }) => {
  if (!ngo) {
    return null;
  }

  return (
    <div className="ngo-details-overlay">
      <div className="ngo-details-content">
        <h2>{ngo.name}</h2>
        <p>{ngo.description}</p>
        {/* Add more details about the NGO */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NGODetails;