import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from './Visitor.module.css';

function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    fathersName: '',
    email: '',
    mobileNo: '',
    dob: '',
    linkedIn: '',
    gitHub: '',
    experience: '',
    expectedSalary: '',
    jobDescription: '',
    startDate: '',
    onSiteAwareness: '',
    positionAppliedFor: '',
    skillsAndTechnologies: '',
    portfolioLinks: '',
    references: '',
    questionsForUs: '',
    resume: null, // to handle file input
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new object for submission, mapping the fields as needed
    const dataToSubmit = {
      fullName: formData.fullName,
      fathersName: formData.fathersName,
      email: formData.email,
      mobileNo: formData.mobileNo,
      dob: formData.dob,
      linkedIn: formData.linkedIn,
      gitHub: formData.gitHub,
      yearsOfExperience: formData.experience, 
      expectedSalary: formData.expectedSalary,
      previousJobs: formData.previousJobs,
      availableToStartOn: formData.startDate, 
      onSiteAwareness: formData.onSiteAwareness === "Yes", 
      positionAppliedFor: formData.positionAppliedFor,
      skillsAndTechnologies: formData.skillsAndTechnologies,
      portfolioLinks: formData.portfolioLinks,
      references: formData.references,
      questionsForUs: formData.questionsForUs,
      resume: formData.resume ? formData.resume.name : null 
    };
  
    try {
      const response = await fetch('https://tpwits.vercel.app/api/visitors/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(dataToSubmit), 
      });
  
     
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        alert("Application submitted successfully!");
      } else {
       
        const errorMessage = await response.text();
        console.error('Error:', errorMessage);
        alert("Failed to submit application: " + errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred while submitting the application. Please try again.");
    }
  };
  

  return (
    <div className={`${styles.container} mt-5`}>
    <h2 className={`${styles.header} text-center mb-4`}>Job Application Form</h2>
    <Form onSubmit={handleSubmit}>
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
          <Form.Group controlId="fathersName">
            <Form.Label>Father's Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your father's name"
              name="fathersName"
              value={formData.fathersName}
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
                required 
              />
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
              <Form.Control.Feedback type="invalid">
                Please enter a valid 11-digit mobile number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth (dd-mm-yy) *</Form.Label>
              <Form.Control 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="linkedIn">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="LinkedIn Profile URL" 
                name="linkedIn" 
                value={formData.linkedIn} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="gitHub">
              <Form.Label>GitHub</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="GitHub Profile URL" 
                name="gitHub" 
                value={formData.gitHub} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="resume">
              <Form.Label>CV/Resume (PDF) *</Form.Label>
              <Form.Control 
                type="file" 
                accept=".pdf" 
                name="resume" 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="experience">
              <Form.Label>Years of Experience *</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter your experience" 
                name="experience" 
                value={formData.experience} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="expectedSalary">
              <Form.Label>Expected Salary *</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter expected salary" 
                name="expectedSalary" 
                value={formData.expectedSalary} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="previousJobs">
          <Form.Label>Describe your previous job roles and key projects (if any)</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={4} 
            placeholder="Briefly describe your experience and projects" 
            name="previousJobs" 
            value={formData.previousJobs} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Available to Start On *</Form.Label>
          <Form.Control 
            type="date" 
            name="startDate" 
            value={formData.startDate} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="onSiteAwareness">
          <Form.Label>Are you aware this role requires working on-site? *</Form.Label>
          <Form.Control as="select" name="onSiteAwareness" value={formData.onSiteAwareness} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="positionAppliedFor">
          <Form.Label>Position Applied For *</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter the position you're applying for" 
            name="positionAppliedFor" 
            value={formData.positionAppliedFor} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="skillsAndTechnologies">
          <Form.Label>Skills And Technologies</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={2} 
            placeholder="List your skills and technologies" 
            name="skillsAndTechnologies" 
            value={formData.skillsAndTechnologies} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="portfolioLinks">
          <Form.Label>Portfolio or Project Links</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={2} 
            placeholder="Portfolio or project URLs (comma separated)" 
            name="portfolioLinks" 
            value={formData.portfolioLinks} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="references">
          <Form.Label>References</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={2} 
            placeholder="List any references (optional)" 
            name="references" 
            value={formData.references} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="questionsForUs">
          <Form.Label>Questions for Us</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={2} 
            placeholder="Do you have any questions for us?" 
            name="questionsForUs" 
            value={formData.questionsForUs} 
            onChange={handleChange} 
          />
        </Form.Group>

        <div className={styles.formButtons}> 
          <Button className={styles.submitButton} type="submit">Submit</Button>
          <Button className={styles.cancelButton} type="button">Cancel</Button>
        </div>
      </Form>

      <div className="mt-5 text-center">
        <h5>Our Location: Innovista Rawat Technology Park, Rawat, Islamabad</h5>
      </div>
    </div>
  );
}

export default JobApplicationForm;