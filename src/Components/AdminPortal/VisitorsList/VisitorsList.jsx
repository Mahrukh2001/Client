import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';


const VisitorsList = ({ handleApprove }) => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch('https://tpwits.vercel.app/api/visitors/');
        if (!response.ok) {
          throw new Error('Failed to fetch visitors');
        }
        const data = await response.json();
        setVisitors(data.map(visitor => ({ ...visitor, disabled: false })));
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  const handleApproval = (visitor) => {
    handleApprove(visitor);
    setVisitors(visitors.filter(v => v._id !== visitor._id));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Visitors List</h2>

      {/* Table for larger screens */}
      <div className="table-responsive d-none d-md-block">
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

      {/* Cards for mobile devices */}
      <div className="visitor-cards d-md-none">
        {visitors.map((visitor) => (
          <div key={visitor._id} className="visitor-card mb-3">
            <h5>{visitor.fullName}</h5>
            <p><strong>Position Applied For:</strong> {visitor.positionAppliedFor}</p>
            <p><strong>Experience:</strong> {visitor.yearsOfExperience} years</p>
            <p><strong>Contact:</strong> {visitor.mobileNo}</p>
            <div className="visitor-actions">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorsList;
