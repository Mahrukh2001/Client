import React, { useState } from "react"; 
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from './Visitor.module.css'

function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    mobileNo: '',
    addresses: {
      current: '',
      permanent: ''
    },
    dob: '',
    personalDetails: {
      gender: '',
      maritalStatus: '',
      religion: '',
      bloodGroup: ''
    },
    professionalDetails: {
      linkedIn: '',
      gitHub: '',
      // cv: null,
      expYears: '',
    },
    prevJobs: {
      organization: '',
      designation: '',
      startDate: '',
      endDate: '',
      reasonForLeaving: ''
    },
    education: {
      degree: '',
      institute: '',
      passingYear: '',
      grade: ''
    },
    priorExp: {
      designation: '',
      employeeId: '',
      tenureOfService: '',
      reasonForLeaving: ''
    },
    expSalary: '',
    expJoining: '',
    onSite: '',
    position: '',
    skills: '',
    portfolio: '',
    refs: '',
    questions: ''
  });

  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    // Handle specific cases for addresses
    if (name === 'current' || name === 'permanent') {
      setFormData((prevState) => ({
        ...prevState,
        addresses: {
          ...prevState.addresses,
          [name]: value,
        },
      }));
    } 
    // Check if the name is for a nested field using dot notation
    else if (name.includes('.')) {
      const keys = name.split('.');
      setFormData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: type === 'file' ? files[0] : value,
        },
      }));
    } 
    // Handle regular fields
    else {
      if (name === 'email') {
        setEmailError(!value.includes('@') ? 'Invalid email. Must contain @' : '');
      }
  
      setFormData({
        ...formData,
        [name]: type === 'file' ? files[0] : value,
      });
    }
  };
  


 const handleSubmit = async (e) => {
  e.preventDefault();

  if (emailError) {
    alert("Please correct the errors before submitting.");
    return;
  }

  const dataToSubmit = {
    ...formData,
    resume: formData.professionalDetails.cv ? formData.professionalDetails.cv.name : null,
  };

  try {
    const response = await fetch('https://tpwits.vercel.app/api/users/3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    // Log the response
    console.log("Response:", response);

    if (response.ok) {
      const result = await response.json();
      alert("Application submitted successfully!");
    } else {
      const errorMessage = await response.text();
      alert("Failed to submit application: " + errorMessage);
    }
  } catch (error) {
    alert("An error occurred while submitting the application. Please try again.");
  }
};


  return (
    <div className={`${styles.container} mt-5`}>
      <h2 className={`${styles.header} text-center mb-4`}>Job Application Form</h2>
      <Form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="fatherName">
              <Form.Label>Father's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your father's name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!emailError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="mobileNo">
              <Form.Label>Mobile No *</Form.Label>
              <Form.Control
                type="text"
                pattern="\d{11}"
                minLength="11"
                maxLength="11"
                placeholder="Enter your 11-digit mobile number"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
        <Col md={6}>
  <Form.Group controlId="currentAddress">
    <Form.Label>Current Address</Form.Label>
    <Form.Control
      as="textarea"
      rows={2}
      placeholder="Enter your current address"
      name="current"
      value={formData.addresses.current}
      onChange={handleChange}
    />
  </Form.Group>
</Col>

<Col md={6}>
  <Form.Group controlId="permanentAddress">
    <Form.Label>Permanent Address</Form.Label>
    <Form.Control
      as="textarea"
      rows={2}
      placeholder="Enter your permanent address"
      name="permanent"
      value={formData.addresses.permanent}
      onChange={handleChange}
    />
  </Form.Group>
</Col>

          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Personal Details */}
         <h4 className="mt-4">Personal Details</h4>
        <Row>
          <Col md={3}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gender"
                name="personalDetails.gender"
                value={formData.personalDetails.gender}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="maritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Marital Status"
                name="personalDetails.maritalStatus"
                value={formData.personalDetails.maritalStatus}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="religion">
              <Form.Label>Religion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Religion"
                name="personalDetails.religion"
                value={formData.personalDetails.religion}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Blood Group"
                name="personalDetails.bloodGroup"
                value={formData.personalDetails.bloodGroup}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

          {/* Professional Details */}
          <h4 className="mt-4">Professional Details</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="linkedIn">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="text"
                placeholder="LinkedIn Profile"
                name="professionalDetails.linkedIn"
                value={formData.professionalDetails.linkedIn}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="gitHub">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                type="text"
                placeholder="GitHub Profile"
                name="professionalDetails.gitHub"
                value={formData.professionalDetails.gitHub}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
      
          {/* <Col md={6}>
            <Form.Group controlId="cv">
              <Form.Label>CV Upload</Form.Label>
              <Form.Control
                type="file"
                name="professionalDetails.cv"
                onChange={handleChange}
              />
            </Form.Group>
          </Col> */}
        <Col md={6}>
  <Form.Group controlId="expYears">
    <Form.Label>Experience (in years)</Form.Label>
    <Form.Control
      type="number" // Change type to number
      placeholder="Enter years of experience"
      name="professionalDetails.expYears"
      value={formData.professionalDetails.expYears}
      onChange={handleChange}
      min="0" // Optional: restrict to non-negative numbers
    />
  </Form.Group>
</Col>


        </Row>

    
        {/* Previous Jobs */}
          
           <h4 className="mt-4">Previous Jobs</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="organization">
              <Form.Label>Previous Organization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter previous organization"
                name="prevJobs.organization"
                value={formData.prevJobs.organization}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="designation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your designation"
                name="prevJobs.designation"
                value={formData.prevJobs.designation}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="prevJobs.startDate"
                value={formData.prevJobs.startDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="prevJobs.endDate"
                value={formData.prevJobs.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group controlId="reasonForLeaving">
              <Form.Label>Reason for Leaving</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason for leaving"
                name="prevJobs.reasonForLeaving"
                value={formData.prevJobs.reasonForLeaving}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        

        {/* Educational Background */}
    
           <h4 className="mt-4">Education</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="degree">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your degree"
                name="education.degree"
                value={formData.education.degree}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="institute">
              <Form.Label>Institute</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your institute"
                name="education.institute"
                value={formData.education.institute}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="passingYear">
              <Form.Label>Passing Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter passing year"
                name="education.passingYear"
                value={formData.education.passingYear}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="grade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter grade"
                name="education.grade"
                value={formData.education.grade}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
         {/* Prior Experience */}
         {/* <h4 className="mt-4">Prior Experience</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="designation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your previous designation"
                name="prevJobs.designation"
                value={formData.prevJobs.designation}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="employeeId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Employee ID"
                name="prevJobs.employeeId"
                value={formData.prevJobs.employeeId}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row> */}

        {/* Expected Details */}
        <h4 className="mt-4">Expected Details</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="expSalary">
              <Form.Label>Expected Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter expected salary"
                name="expSalary"
                value={formData.expSalary}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="expJoining">
              <Form.Label>Expected Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="expJoining"
                value={formData.expJoining}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="onSite">
              <Form.Label>On-Site Preference</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter on-site preference"
                name="onSite"
                value={formData.onSite}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter desired position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="skills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="portfolio">
              <Form.Label>Portfolio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your portfolio link"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="refs">
              <Form.Label>References</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter references"
                name="refs"
                value={formData.refs}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="questions">
              <Form.Label>Questions</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter any questions"
                name="questions"
                value={formData.questions}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit */}
        <div className="text-center">
          <Button type="submit" className="mt-4" variant="primary">
            Submit Application
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default JobApplicationForm;
