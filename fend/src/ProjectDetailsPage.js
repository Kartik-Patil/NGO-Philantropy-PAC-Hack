import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProjectDetailsPage.css';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';

const ProjectDetailsPage = () => {
  const {id} = useParams();
  const appContext = useContext(AuthContext);
  const [projectList, setProjectList] = useState(null);
  const[ngoDetails, setNgoDetails] = useState(null);
  const navigate = useNavigate();

  const fetchDetails = async()=> {
    const projectFormData = new FormData();
    projectFormData.append('id', id);
    const ngoFormData = new FormData();
    ngoFormData.append('id', appContext.user.id);
    const projectResponse = await axios.post("http://localhost:8080/getListingById", projectFormData);
    const ngoDetailsResponse = await axios.post("http://localhost:8080/getNgoById", ngoFormData);

    setProjectList(projectResponse.data);
    setNgoDetails(ngoDetailsResponse.data);

    console.log("Project response: ", projectResponse.data);
    console.log("Ngo Response: ", ngoDetailsResponse.data);
  }

  function getThumbnailLink(driveDirectLink) {
    const thumbnailSize =  4000;
    // Extract the file ID from the driveDirectLink using regex
    const fileIdMatch = driveDirectLink.match(/[a-zA-Z0-9_-]{25,}/);
    if (!fileIdMatch) {
        throw new Error('Invalid Google Drive direct link format');
    }
    const fileId = fileIdMatch[0];

    // Construct the thumbnail link
    const thumbnailLink = `https://drive.google.com/thumbnail?id=${fileId}&sz=${thumbnailSize}`;

    return thumbnailLink;
  }

  useEffect(()=> {
    fetchDetails();
  }, [])

  // Dummy project data for demonstration. Replace with actual data fetching logic if needed.
  const project = {
    title: "Empowering Rural Education",
    description: "Providing educational resources and infrastructure to underprivileged communities.",
    ngoName: "Helping Hands NGO",
    contactPersonName: "Jane Doe",
    contactPersonEmail: "jane.doe@example.com",
    contactPersonMobile: "+1 123-456-7890",
    projectStartDate: "2023-06-01",
    projectEndDate: "2024-06-01",
    projectLocation: "Rural Village, Country",
    projectObjectives: "To provide quality education to rural children.",
    targetAudience: "Children aged 6-14 in rural areas.",
    projectMethodology: "Building schools and providing training to teachers.",
    keyActivities: "Constructing classrooms, supplying educational materials.",
    expectedOutcomes: "Improved literacy rates and school attendance.",
    indicatorsOfSuccess: "Number of children enrolled, exam pass rates.",
    totalBudget: "$100,000",
    fundingSecured: "$50,000",
    fundingGap: "$50,000",
    proposedUtilization: "Building infrastructure, training teachers.",
    upiId: "helpinghands@upi",
    upiQrCode: "/images/upi_qr_code.jpg",  // Adjust the path as necessary
    ngoRegistrationCertificate: "/documents/registration_cert.pdf",
    previousWorkDocuments: "/documents/previous_work.pdf"
  };

  const handleDelist = async () => {
    const confirmDelist = await window.confirm("Are you sure you want to delist this project?");
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

  return <>

    {
      (projectList && ngoDetails) ? (
        <div className="project-details-container" >
        <header>
          <h1>Project Details</h1>
        </header>
        <div className="project-detail-content" >
          <section>
            <h2>Basic Information</h2>
            <p><strong>Project Title:</strong> {projectList.title}</p>
            <p><strong>Project Description:</strong> {projectList.description}</p>
            <p><strong>NGO Name:</strong> {projectList.ngoName}</p>
            <p><strong>Contact Person Name:</strong> {ngoDetails.contactPersonName}</p>
            <p><strong>Contact Person Email:</strong> {ngoDetails.email}</p>
            <p><strong>Project Start Date:</strong> 06-03-2024</p>
            <p><strong>Project End Date:</strong> 25-03-2025</p>
            <p><strong>Project Location:</strong> {ngoDetails.city}</p>
          </section>
          <section>
            <h2>Project Details and Financial Information</h2>
            <p><strong>Project Objectives:</strong> {project.projectObjectives}</p>
            <p><strong>Target Audience:</strong> {project.targetAudience}</p>
            <p><strong>Project Methodology:</strong> {project.projectMethodology}</p>
            <p><strong>Key Activities or Milestones:</strong> {project.keyActivities}</p>
            <p><strong>Expected Outcomes or Deliverables:</strong> {project.expectedOutcomes}</p>
            <p><strong>Measurable Indicators of Success:</strong> {project.indicatorsOfSuccess}</p>
            <p><strong>Total Project Budget:</strong> {project.totalBudget}</p>
            <p><strong>Funding Already Secured:</strong> {project.fundingSecured}</p>
            <p><strong>Funding Gap:</strong> {project.fundingGap}</p>
            <p><strong>Proposed Utilization of Funds:</strong> {project.proposedUtilization}</p>
          </section>
          <section>
            <h2>UPI Details and Proofs</h2>
            <p><strong>UPI ID:</strong> {project.upiId}</p>
            <p><strong>UPI QR Code:</strong> <img src={getThumbnailLink(projectList.imgUrl)} alt="UPI QR Code" /></p>
            <p><strong>NGO Registration Certificate:</strong> <a href={project.ngoRegistrationCertificate} download>Download</a></p>
            <p><strong>Previous Work Documents:</strong> <a href={project.previousWorkDocuments} download>Download</a></p>
          </section>
          <button className="delist-button" onClick={handleDelist}>Delist</button>
        </div>
      </div>
      ): 
      <> <h1>Loading.....</h1></>
    }
    
  </>
};

export default ProjectDetailsPage;
