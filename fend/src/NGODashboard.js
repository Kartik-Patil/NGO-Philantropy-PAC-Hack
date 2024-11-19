import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './NGODashboard.css';
import { useContext } from 'react';
import AuthContext from '../src/context/AuthContext';
import axios from 'axios';

const NGODashboard = () => {  
  const fetchListings = async()=> {
    const formData = new FormData();
    formData.append('name', appContext.user.name);
    const response = await axios.post('http://localhost:8080/ngo-listings', formData);
    setProjects(response.data);
    console.log(response.data);
  }

  const [projects, setProjects] = useState([{
    id: 1,
    title: "Empowering Rural Education",
    image: "project1.jpg", // Replace with actual image URLs later
    description: "Providing educational resources and infrastructure to underprivileged communities.",
  },
  {
    id: 2,
    title: "Clean Water Initiative",
    image: "project2.jpg", // Replace with actual image URLs later
    description: "Building sustainable water purification systems for remote villages.",
  },]);

  useEffect(()=> {
    fetchListings();
  }, [])
  const appContext = useContext(AuthContext);

  const navigate = useNavigate();

  const handleListingClick = () => {
    navigate('/create-listing/step-1');
  };

  const handleLogout = () => {
    // Handle logout logic here
    appContext.logOut();
    window.location.href = "/";
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  // Dummy donation data
  const [showDetails, setShowDetails] = useState(false);
  const getRandomAmount = () => {
    return Math.floor(Math.random() * 9000) + 10000; // Random value between 10000 and 18999
  };
  
    // Dummy donation data with random amounts above 10,000
    const donationData = [
      { month: 'Jan', amount: getRandomAmount() },
      { month: 'Feb', amount: getRandomAmount() },
      { month: 'Mar', amount: getRandomAmount() },
      { month: 'Apr', amount: getRandomAmount() },
      { month: 'May', amount: getRandomAmount() },
      { month: 'Jun', amount: getRandomAmount() },
    ];
  

  const donationDetails = [
    { donor: 'John Doe', amount: 2500, date: '2024-06-05' },
    { donor: 'Jane Smith', amount: 1000, date: '2024-06-10' },
    { donor: 'Mike Johnson', amount: 3000, date: '2024-06-12' },
    // Add more donation details as needed
  ];

  const handleProjectClick = (projectId) => {
    console.log(projectId);
    alert(projectId);
    navigate(`/project-details/${projectId}`); // Navigate to the project detail page
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>NGO Dashboard</h1>
        <nav>
          <ul>
            <li>
              <button onClick={handleProfileClick}>Profile</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="listing-section">
          <button className="listing-button" onClick={handleListingClick}>
            +
            <br />
            Make a listing
          </button>
        </section>

        {/* Listed Projects Section */}
        <section className="projects-section">
          <h2>Listed Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-tile"
                onClick={() => handleProjectClick(project.id)}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Donation History Section */}
        <section className="donation-history">
          <h2>Donation History</h2>
          <div className="donation-chart-container">
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donationData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                dataKey="amount" 
                fill="#00C49F"  /* Vibrant teal color */
                radius={[5, 5, 0, 0]} /* Rounded top corners */
                barSize={50}             /* Adjust bar width if needed */
              />
            </BarChart>
            </ResponsiveContainer>
          </div>
          <button onClick={() => {navigate('/ngo-donations')}}>
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          {/* {showDetails && (
            <div className="donation-details">
              <table>
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donationDetails.map((donation, index) => (
                    <tr key={index}>
                      <td>{donation.donor}</td>
                      <td>${donation.amount}</td>
                      <td>{donation.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} */}
        </section>
      </main>
    </div>
  );
};

export default NGODashboard;
