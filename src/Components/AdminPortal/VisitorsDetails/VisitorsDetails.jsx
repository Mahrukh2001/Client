import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Button, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment'; // Import moment
import './VisitorsDetails.css'; // Custom CSS file
import visitorImage from '../../../images/icon.png'; // Adjust the path according to the file structure

const VisitorDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [visitor, setVisitor] = useState(null); // State to hold the visitor data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitorDetails = async () => {
      try {
        const response = await fetch(`https://tpwits.vercel.app/api/visitors/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch visitor details');
        }
        const data = await response.json();
        setVisitor(data); // Set the visitor data from the API
      } catch (error) {
        console.error('Error fetching visitor details:', error);
      }
    };

    fetchVisitorDetails();
  }, [id]); // Fetch details when the component mounts or when the ID changes

  if (!visitor) return <h2>Loading...</h2>; // Show loading while fetching data

  return (
    <div className="visitor-details-container">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg">
              <Card.Header as="h3" className="text-center visitor-header">Visitor Details</Card.Header>
              <Card.Body className="visitor-card-body">
                <div className="text-center visitor-image-section mb-4">
                  <img 
                    src={visitorImage} 
                    alt="Visitor Avatar" 
                    className="rounded-circle visitor-avatar"
                  />
                </div>

                <Card.Title className="visitor-name">{visitor.fullName}</Card.Title>
                <Card.Subtitle className="mb-4 text-muted">{visitor.positionAppliedFor}</Card.Subtitle>

                <ListGroup className="list-group-flush">
                  <ListGroupItem><strong>Email:</strong> {visitor.email}</ListGroupItem>
                  <ListGroupItem><strong>Mobile No:</strong> {visitor.mobileNo}</ListGroupItem>
                  <ListGroupItem><strong>DOB:</strong> {moment(visitor.dob).format('dddd, MMMM Do YYYY')}</ListGroupItem> {/* Updated format */}
                  <ListGroupItem><strong>LinkedIn:</strong> <a href={visitor.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a></ListGroupItem>
                  <ListGroupItem><strong>GitHub:</strong> <a href={visitor.gitHub} target="_blank" rel="noreferrer">GitHub</a></ListGroupItem>
                  <ListGroupItem><strong>Years of Experience:</strong> {visitor.yearsOfExperience}</ListGroupItem>
                  <ListGroupItem><strong>Expected Salary:</strong> {visitor.expectedSalary}</ListGroupItem>
                  <ListGroupItem><strong>Available to Start On:</strong> {moment(visitor.availableToStartOn).format('dddd, MMMM Do YYYY')}</ListGroupItem> {/* Updated format */}
                  <ListGroupItem><strong>On-Site Requirement:</strong> {visitor.onSiteAwareness ? 'Yes' : 'No'}</ListGroupItem>
                  <ListGroupItem><strong>Skills:</strong> {visitor.skillsAndTechnologies}</ListGroupItem>
                  <ListGroupItem><strong>Previous Jobs:</strong> {visitor.previousJobs}</ListGroupItem>
                  <ListGroupItem><strong>Portfolio:</strong> {visitor.portfolioLinks}</ListGroupItem>
                  <ListGroupItem><strong>References:</strong> {visitor.references}</ListGroupItem>
                  <ListGroupItem><strong>Questions For Us:</strong> {visitor.questionsForUs}</ListGroupItem>
                </ListGroup>
                <div className="d-flex justify-content-center mt-4">
                  <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VisitorDetails;
