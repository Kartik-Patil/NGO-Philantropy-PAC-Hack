import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { FaDonate } from 'react-icons/fa';
import './ProjectDetailsPage.css';

const PhilanthropistProjectDetails = () => {
  const { id } = useParams();
  const appContext = useContext(AuthContext);
  const [projectList, setProjectList] = useState(null);
  const [ngoDetails, setNgoDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const navigate = useNavigate();

  const handlePopup = async () => {
    // console.log(ngoDetails);
    const confirm = window.confirm("Are you sure you want to donate?");
    if (confirm) {
      const formData = new FormData();
    formData.append('philanthropistId', `${appContext.user.id}`);
    formData.append('listedProjectName', projectList.title);
    formData.append('listedNgo', ngoDetails.name);
    formData.append('amount', `${donationAmount}`);
    formData.append('name', `${appContext.user.fullName}`);
    try{
      const response = await axios.post("http://localhost:8080/submit-donation", formData);
      console.log(response.data);
      alert('Donation Successful');
      setIsModalOpen(false)
    }
    
    catch(error) {
      alert("Something wrong, please try later");
      setIsModalOpen(false)
    }

  }
  };

  const fetchDetails = async () => {
    const projectFormData = new FormData();
    console.log("Id: ", id);
    projectFormData.append('id', id);
    const ngoFormData = new FormData();
    const projectResponse = await axios.post("http://localhost:8080/getListingById", projectFormData);
    console.log(projectResponse.data);
    setProjectList(projectResponse.data);
    const name = projectResponse.data.ngoName;
    ngoFormData.append('name', name);
    const ngoDetailsResponse = await axios.post("http://localhost:8080/getNgoByName", ngoFormData);

    setProjectList(projectResponse.data);
    console.log("Project List ",projectList);
    
    setNgoDetails(ngoDetailsResponse.data);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleDonate = () => {
    if (donationAmount && parseFloat(donationAmount) > 0) {
      alert(`Donation successful! Amount: ${donationAmount}`);
      setIsModalOpen(false);
      setDonationAmount('');
    } else {
      alert('Please enter a valid amount.');
    }
  };

  const handleDelist = async () => {
    const confirmDelist = window.confirm("Are you sure you want to delist this project?");
    if (confirmDelist) {
      try {
        const response = await axios.post(`http://localhost:8080/deleteListing/${id}`);
        alert(response.data);
        navigate('/ngo-dashboard');
      } catch (error) {
        console.error("There was an error delisting the project!", error);
        alert("Failed to delist the project. Please try again.");
      }
    }
  };

  return (
    <>
      {
        (projectList) ? (
          <div className="project-details-container">
            <header>
              <h1>Project Details</h1>
            </header>
            <div className="project-detail-content">
              <section>
                {
                  projectList ? <>
                  <h2>Project Details and Financial Information</h2>
                <p><strong>NGO Name:</strong> {projectList.ngoName}</p>
                <p><strong>Project Title:</strong> {projectList.title}</p>
                <p><strong>Project Category:</strong> {projectList.category}</p>
                <p><strong>Project Description:</strong> {projectList.description}</p>
                <p><strong>Target Amount</strong> {projectList.targetAmount}</p>
                <p><strong>Project Duration:</strong> {projectList.duration}</p>
                <p><strong>Beneficiary Info:</strong> {projectList.beneficiaryInfo}</p>
                
                  </>
                  :
                  <>
                  <h1>Loading....</h1></>
                }
                
              </section>
            </div>
            <div className="project-actions">
              <button onClick={() => setIsModalOpen(true)} className="donate-button">
                <FaDonate style={{ marginRight: '8px' }} /> Donate Now
              </button>
            </div>
          </div>
        ) : (
          <h1>Loading.....</h1>
        )
      }

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Donate to the Project</h2>
            <div>
              <label htmlFor="donationAmount">Amount: </label>
              <input
                type="number"
                id="donationAmount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>
            <button onClick={() => {handlePopup()}}>Submit</button>
            <button onClick={()=>{setIsModalOpen(false)}}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhilanthropistProjectDetails;


