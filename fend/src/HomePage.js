import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <div className="content-box">
        <h1>Welcome to our platform</h1>
        <h3>We bridge philanthropists and NGOs who want to eradicate poverty from this planet. Join the mission!</h3>
        <p>Are you an NGO or a philanthropist?</p>
        <div className="button-container">
          <button onClick={() => window.location.href='/ngo-login'}>I'm an NGO</button>
          <button className="second-button" onClick={() => window.location.href='/philanthropist-login'}>I'm a philanthropist</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;