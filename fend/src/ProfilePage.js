import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const appContext = useContext(AuthContext);
  const [establishmentDate, setEstablishmentDate] = useState('2023-01-01');
  const [contactPersonName, setContactPersonName] = useState(appContext.user.contactPersonName);
  const [contactPersonEmail, setContactPersonEmail] = useState(appContext.user.email);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedProfile = {
      name: appContext.user.name,
      id: appContext.user.id,
      contactPersonName: contactPersonName,
      email: contactPersonEmail,
    };
    axios.post('http://localhost:8080/profile-update', updatedProfile)
      .then(response => {
        console.log('Profile updated:', response.data);
        alert("Successfully updated profile");
        appContext.setUser(response.data);
        setIsEditing(false);
        navigate('/ngo-dashboard');
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  return (
    <div className="profile-container">
      <header>
        <h1>Profile</h1>
      </header>
      <section className="profile">
        <p>Welcome to your NGO dashboard!</p>
        <div className="profile-info">
          {isEditing ? (
            <>
              <label>
                Date of Establishment:
                <input
                  type="date"
                  value={establishmentDate}
                  onChange={(e) => setEstablishmentDate(e.target.value)}
                />
              </label>
              <label>
                Contact Person Name:
                <input
                  type="text"
                  value={contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                />
              </label>
              <label>
                Contact Person Email:
                <input
                  type="email"
                  value={contactPersonEmail}
                  onChange={(e) => setContactPersonEmail(e.target.value)}
                />
              </label>
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p>NGO Name: {appContext.user.name}</p>
              <p>Date of Establishment: {establishmentDate}</p>
              <p>Contact Person Name: {contactPersonName}</p>
              <p>Contact Person Email: {contactPersonEmail}</p>
              <button onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
