import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const VisitorsList = ({ handleApprove }) => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found');
        }

        // Make GET request with Authorization header
        const response = await fetch('http://172.25.1.20:3000/api/users/3', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this visitor?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://172.25.1.20:3000/api/users/3/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete visitor');
      }

      setVisitors(visitors.filter(visitor => visitor._id !== id));
    } catch (error) {
      console.error('Error deleting visitor:', error);
    }
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
              <th>Skills</th>
              <th>Experience (Years)</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor._id}>
                <td>{visitor.fullName}</td>
                <td>{visitor.professionalDetails?.skills ? visitor.professionalDetails.skills.join(', ') : 'N/A'}</td>
                <td>{visitor.professionalDetails?.expYears}</td>
                <td>{visitor.mobileNo}</td>
                <td>
                  <Link to={`/admin/visitor/${visitor._id}`}>
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
                  <Button 
                    variant="danger" 
                    className="mb-2" 
                    onClick={() => handleDelete(visitor._id)}
                  >
                    Disable
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
            <p><strong>Skills:</strong> {visitor.professionalDetails?.skills ? visitor.professionalDetails.skills.join(', ') : 'N/A'}</p>
            <p><strong>Experience:</strong> {visitor.professionalDetails?.expYears} years</p>
            <p><strong>Contact:</strong> {visitor.mobileNo}</p>
            <div className="visitor-actions">
              <Link to={`/admin/visitor/${visitor._id}`}>
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
              <Button 
                variant="warning" // Changed from danger to warning for "Disable"
                className="mb-2" 
                onClick={() => handleDelete(visitor._id)}
              >
                Disable
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorsList;
