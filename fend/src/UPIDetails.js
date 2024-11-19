import React from "react";
import { useParams } from "react-router-dom";
import "./UPIDetails.css";

const UPIDetails = () => {
  const { projectId } = useParams();

  // Dummy data (Replace with actual data fetching logic)
  const projects = [
    {
      id: "1",
      upiId: "helpinghands@upi",
      upiQrCode: "/images/upi_qr_code.jpg", // Adjust the path as needed
    },
    // Add more project data with UPI details
  ];

  // Find the project based on projectId
  const project = projects.find((proj) => proj.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="upi-details-container">
      <h1>UPI Payment Details</h1>
      <p>
        <strong>UPI ID:</strong> {project.upiId}
      </p>
      <p>
        <strong>UPI QR Code:</strong>
      </p>
      <img
        src={process.env.PUBLIC_URL + project.upiQrCode}
        alt="UPI QR Code"
        className="upi-qr-code"
      />
    </div>
  );
};

export default UPIDetails;

