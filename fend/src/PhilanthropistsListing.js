import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaDonate } from 'react-icons/fa'; // Importing FaDonate icon
import './PhilanthropistProjectDetails.css';
import axios from 'axios';
import './PhilanthropistDashboard.css'

const PhilanthropistsListing = () => {

  const[listings, setListings] = useState(null);
  const [ngo, setNgo] = useState(null);

  const { projectId } = useParams();

  const fetchAllListingsOfNgos = async () => {
    const formData = new FormData();
    formData.append('id', projectId);
    console.log(formData);
    const response = await axios.post('http://localhost:8080/getNgoById', formData);
    setNgo(response.data);
    // console.log(response.data);
    const ngoName = response.data.name;
    console.log("Name: ", ngoName);
    setNgo(response.data.name);

    const newFormData = new FormData();
    newFormData.append('name', ngoName);
    const listingResponse = await axios.post('http://localhost:8080/ngo-listings', newFormData);
    console.log(listingResponse.data);
    setListings(listingResponse.data);
  }

  useEffect(()=> {
    fetchAllListingsOfNgos();
  }, [])
  const [isLiked, setIsLiked] = useState(false);

  // Dummy data for demonstration purposes
  const project = {
    title: "Education for Underprivileged Children",
    description: "Providing quality education to children in rural areas.",
    ngoName: "Teach for India",
    contactPersonName: "John Doe",
    contactPersonEmail: "john.doe@example.com",
    contactPersonMobile: "+91 9876543210",
    projectStartDate: "2023-06-01",
    projectEndDate: "2024-06-01",
    projectLocation: "Rural Village, India",
    projectObjectives: "To provide quality education to rural children.",
    targetAudience: "Children aged 6-14 in rural areas.",
    projectMethodology: "Building schools and providing training to teachers.",
    keyActivities: "Constructing classrooms, supplying educational materials.",
    expectedOutcomes: "Improved literacy rates and school attendance.",
    indicatorsOfSuccess: "Number of children enrolled, exam pass rates.",
    totalBudget: "₹100,000",
    fundingSecured: "₹50,000",
    fundingGap: "₹50,000",
    proposedUtilization: "Building infrastructure, training teachers.",
    upiId: "teachforindia@upi",
    upiQrCode: "/images/upi_qr_code.jpg", // Adjust the path as necessary
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="project-details-container">
      <header>
        <h1>Listing Details </h1>>
      </header>
      <h1>{ngo}</h1>
      <div className="ngo-tiles-container">
          {
            listings? <>
            {listings.map((listing) => (
              <Link
                key={listing.id}
                to={`/listing-details/${listing.id}`}
                className="ngo-tile"
              >
                <h3 className="ngo-tile-title">{listing.title}</h3>
                <p className="ngo-tile-description">{listing.description}</p>
              </Link>
            ))}
            </>: <><h1>Loading....</h1></>
          }
        </div>
    </div>
  );
};

export default PhilanthropistsListing;
