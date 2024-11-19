import React from 'react';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faHeart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './PhilanthropistDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../src/context/AuthContext';

const PhilanthropistDashboard = () => {
  const appContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [ngos, setNgos] = useState([]);

  const fetchAllNgos = async()=> {
    const response = await axios.get('http://localhost:8080/get/ngo');
    setNgos(response.data);
    console.log(response.data);
  }

  const handleLogOut = () => {
    appContext.logOut();
  }

  useEffect(()=> {
    fetchAllNgos();
  },[])
  const ngoProjects = [
    {
      id: 1,
      title: 'Education for Underprivileged Children',
      ngoName: 'Teach for India',
      description: 'Providing quality education to children in rural areas.',
    },
    {
      id: 2,
      title: 'Clean Water Initiative',
      ngoName: 'Water Aid',
      description: 'Ensuring access to clean drinking water in remote villages.',
    },
    // Add more NGO projects here...
  ];

  return (
    <div className="philanthropist-dashboard">
      <header className="dashboard-header">
        <h1 className="header-title">Philanthropist Dashboard</h1>
        <nav className="header-nav">
          <Link to="/philanthropist-donation-history" className="nav-btn">
            <FontAwesomeIcon icon={faHistory} />
          </Link>
          {/* <button className="nav-btn">
            <FontAwesomeIcon icon={faHeart} />
          </button> */}
          {/* <div  className="nav-btn">
            <FontAwesomeIcon icon={faUser} />
          </div> */}
          <button className="nav-btn" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </nav>
      </header>
      <main className="dashboard-main">
        <h2 className="listed-ngos-heading">Listed NGOs</h2>
        <div className="ngo-tiles-container">
          {
            ngos? <>
            {ngos.map((project) => (
              <Link
                key={project.id}
                to={`/ngo-details/${project.id}`}
                className="ngo-tile"
              >
                <h3 className="ngo-tile-title">{project.name}</h3>
                <p className="ngo-tile-description">{project.description}</p>
              </Link>
            ))}
            </>: <><h1>Loading....</h1></>
          }
        </div>
      </main>
    </div>
  );
};

export default PhilanthropistDashboard;



