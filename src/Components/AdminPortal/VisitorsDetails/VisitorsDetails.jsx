import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import './VisitorsDetails.css';

const VisitorDetails = () => {
  const { id } = useParams();
  const [visitor, setVisitor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitorDetails = async () => {
      try {
        const response = await fetch(`https://tpwits.vercel.app/api/users/3/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch visitor details');
        }
        const data = await response.json();
        setVisitor(data);
      } catch (error) {
        console.error('Error fetching visitor details:', error);
      }
    };

    fetchVisitorDetails();
  }, [id]);

  if (!visitor) return <h2>Loading...</h2>;

  return (
    <div className="visitor-details-container">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg visitor-card">
              <Card.Header as="h3" className="visitor-header text-center">Visitor Details</Card.Header>
              <Card.Body className="visitor-card-body">

                {/* Personal Details */}
                <section className="personal-details-section">
                  <h4 className="section-title">Personal Information</h4>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item><strong>Full Name:</strong> {visitor.fullName}</ListGroup.Item>
                    <ListGroup.Item><strong>Father's Name:</strong> {visitor.fatherName}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {visitor.email}</ListGroup.Item>
                    <ListGroup.Item><strong>Mobile No:</strong> {visitor.mobileNo}</ListGroup.Item>
                    <ListGroup.Item><strong>DOB:</strong> {moment(visitor.dob).format('LL')}</ListGroup.Item>
                    <ListGroup.Item><strong>Gender:</strong> {visitor.personalDetails?.gender}</ListGroup.Item>
                  <ListGroup.Item><strong>Marital Status:</strong> {visitor.personalDetails?.maritalStatus}</ListGroup.Item>
                  <ListGroup.Item><strong>Religion:</strong> {visitor.personalDetails?.religion}</ListGroup.Item>
                  <ListGroup.Item><strong>Blood Group:</strong> {visitor.personalDetails?.bloodGroup}</ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Address:</strong> 
                    <div>Current: {visitor.professionalDetails?.addresses?.current || 'N/A'}</div>
                    <div>Permanent: {visitor.professionalDetails?.addresses?.permanent || 'N/A'}</div>
                  </ListGroup.Item>
                  </ListGroup>
                </section>

                  {/* Professional Details */}
                  <section className="personal-details-section">
                  <h4 className="section-title">Professional Details</h4>
                  <ListGroup className="list-group-flush">
                  <ListGroup.Item><strong>LinkedIn:</strong> <a href={visitor.professionalDetails?.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a></ListGroup.Item>
                  <ListGroup.Item><strong>GitHub:</strong> <a href={visitor.professionalDetails?.gitHub} target="_blank" rel="noreferrer">GitHub</a></ListGroup.Item>
                  <ListGroup.Item><strong>Experience Years:</strong> {visitor.professionalDetails?.expYears}</ListGroup.Item>
                 
                  </ListGroup>
                </section>


            

               
                {/* Previous Jobs */}
                <section className="previous-jobs-section mt-5">
                  <h4 className="section-title">Previous Jobs</h4>
                  {visitor.professionalDetails?.prevJobs?.length ? (
                    visitor.professionalDetails.prevJobs.map((job, index) => (
                      <ListGroup.Item key={index}>
                        <strong>Organization:</strong> {job.organization} <br />
                        <strong>Designation:</strong> {job.designation} <br />
                        <strong>Start Date:</strong> {moment(job.startDate).format('LL')} <br />
                        <strong>End Date:</strong> {moment(job.endDate).format('LL')} <br />
                        <strong>Reason for Leaving:</strong> {job.reasonForLeaving}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No previous job details available.</ListGroup.Item>
                  )}
                </section>

                {/* Education */}
                <section className="education-section mt-5">
                  <h4 className="section-title">Education</h4>
                  {visitor.professionalDetails?.education?.length ? (
                    visitor.professionalDetails.education.map((edu, index) => (
                      <ListGroup.Item key={index}>
                        <strong>Degree:</strong> {edu.degree} <br />
                        <strong>Institute:</strong> {edu.institute} <br />
                        <strong>Passing Year:</strong> {moment(edu.passingYear).format('YYYY')} <br />
                        <strong>Grade:</strong> {edu.grade}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No education details available.</ListGroup.Item>
                  )}
                </section>

                {/* Skills */}
                <section className="skills-section mt-5">
                  <h4 className="section-title">Skills</h4>
                  <ListGroup.Item>
                    {visitor.professionalDetails?.skills?.length ? visitor.professionalDetails.skills.join(', ') : 'No skills available'}
                  </ListGroup.Item>
                  {visitor.professionalDetails?.portfolio?.length ? (
                    visitor.professionalDetails.portfolio.map((ref, index) => (
                      <ListGroup.Item key={index}>
                        {ref}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No portfolios available.</ListGroup.Item>
                  )}
                </section>


                 {/* JOINING DETAILS */}
                 <section className="professional-details-section mt-5">
                  <h4 className="section-title">Additional Details</h4>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item><strong>Position Applied For:</strong> {visitor.professionalDetails?.position || 'N/A'}</ListGroup.Item>
                    <ListGroup.Item><strong>Expected Salary:</strong> {visitor.professionalDetails?.expSalary ? `PKR ${visitor.professionalDetails.expSalary.toLocaleString()}` : 'N/A'}</ListGroup.Item>
                    <ListGroup.Item><strong>Expected Joining Date:</strong> {moment(visitor.professionalDetails?.expJoining).format('LL') || 'N/A'}</ListGroup.Item>
                    <ListGroup.Item><strong>On Site:</strong> {visitor.professionalDetails?.onSite ? 'Yes' : 'No'}</ListGroup.Item>
                  </ListGroup>
                </section>


                {/* References */}
                <section className="references-section mt-5">
                  <h4 className="section-title">References</h4>
                  {visitor.professionalDetails?.refs?.length ? (
                    visitor.professionalDetails.refs.map((ref, index) => (
                      <ListGroup.Item key={index}>
                        {ref}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No references available.</ListGroup.Item>
                  )}
                </section>

                {/* Questions */}
                <section className="questions-section mt-5">
                  <h4 className="section-title">Questions</h4>
                  <ListGroup.Item>{visitor.professionalDetails?.questions || 'No questions available.'}</ListGroup.Item>
                </section>

                <Button variant="primary" onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VisitorDetails;
