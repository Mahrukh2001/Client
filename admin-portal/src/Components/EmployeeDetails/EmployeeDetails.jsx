// Components/Departments/EmployeeDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const employeeDetails = {
  1: { name: 'John Doe', designation: 'Software Engineer', cnic: '12345-6789012-3', fatherName: 'Michael Doe', salary: '$80,000', image: '/path/to/image1.jpg' },
  2: { name: 'Jane Smith', designation: 'Accountant', cnic: '23456-7890123-4', fatherName: 'Robert Smith', salary: '$70,000', image: '/path/to/image2.jpg' },
  3: { name: 'Mark Johnson', designation: 'HR Specialist', cnic: '34567-8901234-5', fatherName: 'James Johnson', salary: '$60,000', image: '/path/to/image3.jpg' },
  // Add more employee details as needed
};

const EmployeeDetails = () => {
  const { id } = useParams();
  const employee = employeeDetails[id];

  if (!employee) {
    return <div>Employee not found.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img src={employee.image} alt={employee.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h2>{employee.name}</h2>
          <p><strong>Designation:</strong> {employee.designation}</p>
          <p><strong>CNIC:</strong> {employee.cnic}</p>
          <p><strong>Father's Name:</strong> {employee.fatherName}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
