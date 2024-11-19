import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';

const donations = [
  { projectTitle: 'Clean Water Initiative', ngoName: 'WaterAid', donationAmount: '$1000' },
  { projectTitle: 'Education for All', ngoName: 'Save the Children', donationAmount: '$1500' },
  { projectTitle: 'Healthcare Support', ngoName: 'Red Cross', donationAmount: '$2000' },
];

const PhilanthropistDonationHistory = () => {
    const appContext = useContext(AuthContext);
    const [donationList, setDonationList] = useState([]);
    useEffect(()=> {
        getDonations();
    },[])

    const getDonations = async()=> {
        const formData = new FormData();
        formData.append('philanthropistId', `${appContext.user.id}`);
        const response = await axios.post("http://localhost:8080/getDonations", formData);
        setDonationList(response.data);
        console.log(response.data);
    }
  return (
    <div>
      <h1>Donation History</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {
            (donationList ? <>
            {donationList.map((donation, index) => (
                <div 
                    key={index} 
                    style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    width: '100%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <h2>{donation.listedProjectName}</h2>
                    <p><strong>NGO Name:</strong> {donation.listedNgo}</p>
                    <p><strong>Donation Amount:</strong> {donation.amount}</p>
                    <p><strong>Donation Date :</strong> {donation.dateTime}</p>
                </div>
                ))}
            </>: <><h1 style={{textAlign: 'center'}}>Loading....</h1></>)
                
        }
      </div>
    </div>
  );
}

export default PhilanthropistDonationHistory;
