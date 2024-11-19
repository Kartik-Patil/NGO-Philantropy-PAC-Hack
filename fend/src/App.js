import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NGOLoginPage from './NGOLoginPage';
import PhilanthropistLoginPage from './PhilanthropistLoginPage';
import NGORegistrationPage from './NGORegistrationPage';
import PhilanthropistRegistrationPage from './PhilanthropistRegistrationPage';
import NGODashboard from './NGODashboard';
import PhilanthropistDashboard from './PhilanthropistDashboard';
import ProfilePage from './ProfilePage'; // Import the new component
import AuthState from './context/AuthState';
import Protector from './protector/Protector';
import ListingPage from './ListingPage';
import ProjectDetailsPage from './ProjectDetailsPage';
import PhilanthropistsListing from './PhilanthropistsListing';
import PhilanthropistProjectDetails from './PhilanthropistProjectDetails';
import PhilanthropistDonationHistory from './PhilanthropistDonationHistory';
import NgoDonations from './NgoDonations';

const App = () => {
  return (
    <AuthState>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ngo-login" element={<NGOLoginPage />} />
              <Route path="/philanthropist-login" element={<PhilanthropistLoginPage />} />
              <Route path="/ngo-registration" element={<NGORegistrationPage />} />
              <Route path="/philanthropist-registration" element={<PhilanthropistRegistrationPage />} />
              <Route path="/ngo-dashboard" element={<Protector><NGODashboard /></Protector>} />
              <Route path="/philanthropist-dashboard" element={<Protector><PhilanthropistDashboard /></Protector>} />
              <Route path="/profile" element={<Protector><ProfilePage /></Protector>} /> {/* Add route for profile page */}
              <Route path='/create-listing/step-1' element={<Protector><ListingPage/></Protector>} />
              <Route path='/project-details/:id' element={<ProjectDetailsPage/>} />
              <Route path='/ngo-details/:projectId' element={<PhilanthropistsListing/>} />
              <Route path='/listing-details/:id' element={<PhilanthropistProjectDetails/>} />
              <Route path='/philanthropist-donation-history' element={<PhilanthropistDonationHistory/>} />
              <Route path='/ngo-donations' element={<NgoDonations/>} />
            </Routes>
          </div>
        </Router>
    </AuthState>
  );
};

export default App;
