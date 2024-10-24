import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import LoginForm from './Components/LoginForm/LoginForm';
import JobApplicationForm from './Components/VisitorForm/Visitor';
// Import Admin Components
import VisitorsList from './Components/AdminPortal/VisitorsList/VisitorsList';
import VisitorsDetails from './Components/AdminPortal/VisitorsDetails/VisitorsDetails';
import EmployeesList from './Components/AdminPortal/EmployeesList/EmployeesList';
// Import Employee Portal Component
import EmployeeData from './Components/EmployeePortal/EmployeeData/EmployeeData';

function App() {
  const [employees, setEmployees] = useState([]);

  const handleApprove = (visitor) => {
    setEmployees([...employees, visitor]);
  };

  return (
    <Router>
      <AppContent employees={employees} handleApprove={handleApprove} />
    </Router>
  );
}

function AppContent({ employees, handleApprove }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication token here
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Redirect to login page after logout
  };

  
  const isFullScreenFormRoute = location.pathname === '/JobApplicationForm' || location.pathname === '/login';
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isEmployeeRoute = location.pathname.startsWith('/employee');

  return (
    <div className="App">
      {/* Show header and dashboard only for Admin or Employee portal */}
      {!isFullScreenFormRoute && (isAdminRoute || isEmployeeRoute) && (
        <>
          <header className="admin-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h1 className="admin-title">{isAdminRoute ? 'Admin Portal' : 'Employee Portal'}</h1>
            </div>
            <div>
              <button onClick={handleLogout} className="btn btn-primary logout-btn">Logout</button>
            </div>
          </header>

          {/* Dashboard */}
          <div className="dashboard">
            {/* Sidebar - Only show for Admin Portal */}
            {isAdminRoute && (
              <div className="sidebar">
                <nav className="nav flex-column">
                  <Link className="nav-link active" to="/admin/visitors">Visitors</Link>
                  <Link className="nav-link" to="/admin/employees">Employees</Link>
                
                </nav>
              </div>
            )}

            {/* Content */}
            <div className="content">
              <Routes>
                {/* Admin Portal Routes */}
                {isAdminRoute && (
                  <>
                    <Route path="/admin/visitors" element={<VisitorsList handleApprove={handleApprove} />} />
                    <Route path="/admin/employees" element={<EmployeesList employees={employees} />} />
                    <Route path="/admin/visitor/:id" element={<VisitorsDetails />} />
                  </>
                )}

                {/* Employee Portal Routes */}
                {isEmployeeRoute && (
                  <>
                    <Route path="/employee/employeeData" element={<EmployeeData />} />
                  </>
                )}

                {/* Login and Job Application */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/JobApplicationForm" element={<JobApplicationForm />} />
              </Routes>
            </div>
          </div>
        </>
      )}

      {/* Full screen for JobApplicationForm and LoginForm */}
      {isFullScreenFormRoute && (
        <div className="full-screen-form">
          <Routes>
            <Route path='/JobApplicationForm' element={<JobApplicationForm />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
        </div>
      )}

      {/* Redirect root ("/") to login page */}
      {location.pathname === '/' && <Navigate to="/login" replace />}
    </div>
  );
}

export default App;
