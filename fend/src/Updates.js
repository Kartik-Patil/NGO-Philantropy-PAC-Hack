import React from 'react';
import './Updates.css';

const Updates = () => {
  // Sample updates data
  const updates = [
    'New project launched in rural areas.',
    'Successful fundraising event held.',
    'Volunteers needed for upcoming campaign.'
  ];

  return (
    <section id="updates" className="updates">
      <h2>Updates</h2>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>{update}</li>
        ))}
      </ul>
    </section>
  );
};

export default Updates;