import React from 'react'; 
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Assuming you'll need Link for navigation

const EmployeesList = ({ employees, onDisable, onUpdate }) => { // Add onDisable and onUpdate props for handling actions

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee List</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Position</th>
              <th>Experience (Years)</th>
              <th>Contact</th>
              <th>Actions</th> {/* Add Actions column */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.fullName}</td>
                <td>{employee.positionAppliedFor}</td>
                <td>{employee.yearsOfExperience}</td>
                <td>{employee.mobileNo}</td>
                <td>
                  <Link to={`/employee/${employee._id}`}>
                    <Button variant="primary" className="btn-view me-2">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    variant="warning" 
                    className="me-2"
                    onClick={() => onUpdate(employee._id)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => onDisable(employee._id)}
                  >
                    Disable
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

export default EmployeesList;
