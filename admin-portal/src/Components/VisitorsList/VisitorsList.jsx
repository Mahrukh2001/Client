import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import './VisitorsList.css';
import '../../App.css';

const VisitorsList = ({ handleApprove }) => { // Accept handleApprove as a prop
  const [visitors, setVisitors] = useState([]); // State to hold visitors data

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch('https://tpwits.vercel.app/api/visitors/');
        if (!response.ok) {
          throw new Error('Failed to fetch visitors');
        }
        const data = await response.json();
        setVisitors(data.map(visitor => ({ ...visitor, disabled: false }))); // Add a disabled property
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleApproval = (visitor) => {
    handleApprove(visitor); // Call the handleApprove function passed down from App

    // Remove the visitor from the visitors list
    setVisitors(visitors.filter(v => v._id !== visitor._id));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Visitors List</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Position Applied For</th>
              <th>Experience (Years)</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor._id}>
                <td>{visitor.fullName}</td>
                <td>{visitor.positionAppliedFor}</td>
                <td>{visitor.yearsOfExperience}</td>
                <td>{visitor.mobileNo}</td>
                <td>
                  <Link to={`/visitor/${visitor._id}`}>
                    <Button variant="primary" className="btn-view me-2 mb-2">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    variant="success" 
                    className="mb-2" 
                    onClick={() => handleApproval(visitor)}
                  >
                    Approve as Employee
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default VisitorsList;
