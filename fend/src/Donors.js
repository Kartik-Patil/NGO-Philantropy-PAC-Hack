import React from 'react';
import './Donors.css';

const Donors = () => {
  // Sample donor data
  const donors = [
    { name: 'John Doe', amount: 500, date: '2023-06-01' },
    { name: 'Jane Smith', amount: 1000, date: '2023-06-05' },
    { name: 'Mike Johnson', amount: 750, date: '2023-06-10' }
  ];

  return (
    <section id="donors" className="donors">
      <h2>Donors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>${donor.amount}</td>
              <td>{donor.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Donors;