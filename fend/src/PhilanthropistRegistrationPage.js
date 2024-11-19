import React, { useState } from 'react';
import styles from './PhilanthropistRegistrationPage.module.css';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const PhilanthropistRegistrationPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: '',
    phoneNumber: '',
    occupation: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/registration/philanthropist', formData)
    .then((res)=>{
      console.log(res.data);
      if(res.data) {
        alert("Successfully Registered");
      }
      auth.updateUser(res.data);
      const isLoggedIn = true;
      if (isLoggedIn) {
      // Redirect to philanthropist dashboard upon successful login
          navigate('/philanthropist-dashboard');
    } else {
        alert('Login failed. Please try again.');
    }
    })
    // Simulate successful registration
    // setRegistrationSuccess(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Philanthropist Registration</div>
      {registrationSuccess ? (
        <div className={styles.successMessage}>
          <p>Registration successful! Please login again.</p>
          <a href="/philanthropist-login">Go to Philanthropist Login</a>
        </div>
      ) : (
        <div className={styles.content}>
          <form onSubmit={handleSubmit}>
            <div className={styles.userDetails}>
              <div className={styles.inputBox}>
                <span className={styles.details}>Full Name:</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>Email address:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>Password:</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>Confirm Password:</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>Country:</span>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>State/Province:</span>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>City:</span>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>Phone Number:</span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <span className={styles.details}>Occupation:</span>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.button}>
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PhilanthropistRegistrationPage;