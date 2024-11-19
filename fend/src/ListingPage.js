import React, { useState, useContext } from 'react';
import './ListingPage.css';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ListingPage() {
  const navigate = useNavigate();
  const appContext = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Update to store a single image
  const [targetAmount, setTargetAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [beneficiaryInfo, setBeneficiaryInfo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 3) {
      try {
        // Upload image
        const formData = new FormData();
        formData.append('image', image);

        const uploadResponse = await axios.post('http://localhost:8080/uploadToGoogleDrive', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = uploadResponse.data.url;

        // Create listing
        const listingData = {
          ngoName: appContext.user.name,
          title: title,
          description,
          category,
          imgUrl: imageUrl,
          targetAmount,
          duration,
          beneficiaryInfo,
        };

        const listingResponse = await axios.post('http://localhost:8080/listing', listingData);
        alert(listingResponse.data.message);
        if(listingResponse.data.message === "Successfully Listed"){
          navigate('/ngo-dashboard');
        }
        else {
          alert('Please try again after some time');
        }


      } catch (error) {
        console.error("There was an error processing your request!", error);
        alert("An error occurred while creating the listing. Please try again.");
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 1) {
      alert('Please select only one image');
      event.target.value = null; // Clear the selected files
    } else {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="listing-page">
      <div className="progress-bar">
        <div
          className={`progress-step ${step === 1 ? 'active' : ''}`}
          onClick={() => setStep(1)}
        >
          Step 1
        </div>
        <div
          className={`progress-step ${step === 2 ? 'active' : ''}`}
          onClick={() => setStep(2)}
        >
          Step 2
        </div>
        <div
          className={`progress-step ${step === 3 ? 'active' : ''}`}
          onClick={() => setStep(3)}
        >
          Step 3
        </div>
      </div>

      <div className="form-container">
        {step === 1 && (
          <div className="form-wrapper">
            <h2>Create Listing - Step 1</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
              <label>
                Category:
                <select
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Environment">Environment</option>
                  {/* Add more categories */}
                </select>
              </label>
              <button type="submit" className="submit-button">
                Next
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="form-wrapper">
            <h2>Create Listing - Step 2</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Image:
                <input
                  type="file"
                  name="image"
                  required
                  onChange={handleFileChange}
                />
              </label>
              <label>
                Target Amount:
                <input
                  type="number"
                  name="targetAmount"
                  required
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </label>
              <label>
                Duration:
                <input
                  type="text"
                  name="duration"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </label>
              <button type="submit" className="submit-button">
                Next
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="form-wrapper">
            <h2>Create Listing - Step 3</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Beneficiary Information:
                <textarea
                  name="beneficiaryInfo"
                  required
                  value={beneficiaryInfo}
                  onChange={(e) => setBeneficiaryInfo(e.target.value)}
                ></textarea>
              </label>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingPage;
