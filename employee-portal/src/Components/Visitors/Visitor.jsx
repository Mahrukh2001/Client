import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import './Visitor.css';

function JobApplicationForm() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Job Application Form</h2>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="fathersName">
              <Form.Label>Father's Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your father's name" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
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
              <Form.Control type="date" required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="linkedin">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control type="text" placeholder="LinkedIn Profile URL" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="github">
              <Form.Label>GitHub</Form.Label>
              <Form.Control type="text" placeholder="GitHub Profile URL" />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="resume">
              <Form.Label>CV/Resume (PDF) *</Form.Label>
              <Form.Control type="file" accept=".pdf" required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="experience">
              <Form.Label>Years of Experience *</Form.Label>
              <Form.Control type="number" placeholder="Enter your experience" required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="expectedSalary">
              <Form.Label>Expected Salary *</Form.Label>
              <Form.Control type="number" placeholder="Enter expected salary" required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="jobDescription">
          <Form.Label>Describe your previous job roles and key projects (if any)</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Briefly describe your experience and projects" />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Available to Start On *</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>

        <Form.Group controlId="onSiteWork">
          <Form.Label>Are you aware this role requires working on-site? *</Form.Label>
          <Form.Control as="select" required>
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="positionAppliedFor">
          <Form.Label>Position Applied For *</Form.Label>
          <Form.Control type="text" placeholder="Enter the position you're applying for" required />
        </Form.Group>

        <Form.Group controlId="skills">
          <Form.Label>Skills and Technologies</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="List your skills and technologies" />
        </Form.Group>

        <Form.Group controlId="portfolioLinks">
          <Form.Label>Portfolio or Project Links</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Portfolio or project URLs (comma separated)" />
        </Form.Group>

        <Form.Group controlId="references">
          <Form.Label>References</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="List any references (optional)" />
        </Form.Group>

        <Form.Group controlId="questions">
          <Form.Label>Questions for Us</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Do you have any questions for us?" />
        </Form.Group>

        <div className="form-buttons"> 
         
         <Button variant="primary" type="submit">Submit</Button>
         <Button variant="secondary" type="button">Cancel</Button>
</div>


      </Form>

      <div className="mt-5 text-center">
        <h5>Our Location: Innovista Rawat Technology Park, Rawat, Islamabad</h5>
      </div>
    </div>
  );
}

export default JobApplicationForm;
