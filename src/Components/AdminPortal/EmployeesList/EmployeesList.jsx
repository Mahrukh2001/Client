import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployeesList = ({ employees, onDisable, onUpdate }) => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employees List</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Position</th>
              <th>Experience (Years)</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.fullName}</td>
                <td>{employee.positionAppliedFor}</td>
                <td>{employee.yearsOfExperience}</td>
                <td>{employee.mobileNo}</td>
                <td className="text-center">
                  <div className="d-flex flex-column">
                    <Link to={`/employee/${employee._id}`}>
                      <Button variant="primary" className="mb-2">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="warning" 
                      className="mb-2"
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
                  </div>
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
