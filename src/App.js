import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Import Admin Components
import VisitorsList from './Components/AdminPortal/VisitorsList/VisitorsList';
import VisitorsDetails from './Components/AdminPortal/VisitorsDetails/VisitorsDetails';
import EmployeesList from './Components/AdminPortal/EmployeesList/EmployeesList';


function App() {
  const [employees, setEmployees] = useState([]);

  const handleApprove = (visitor) => {
    setEmployees([...employees, visitor]);
  };

  return (
    <Router>
      <div className="App">
        <header className="admin-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h1 className="admin-title">Admin Portal</h1>
          </div>
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-bar" />
          </div>
        </header>

        {/* Dashboard and Content */}
        <div className="dashboard">
          {/* Sidebar */}
          <div className="sidebar">
            <nav className="nav flex-column">
              <Link className="nav-link active" to="/">Visitors</Link>
              <Link className="nav-link" to="/employees">Employees</Link>
            </nav>
          </div>

          {/* Content */}
          <div className="content">
            <Routes>
              {/* Admin Portal Routes */}
              <Route path="/" element={<VisitorsList handleApprove={handleApprove} />} />
              <Route path="/employees" element={<EmployeesList employees={employees} />} />
              <Route path="/visitor/:id" element={<VisitorsDetails />} />

              {/* Employee Portal Routes */}
              {/* <Route path="/employee-portal" element={<EmployeePortal />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/visitor-form" element={<VisitorForm />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
