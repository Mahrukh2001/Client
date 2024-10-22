import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import VisitorsList from './Components/VisitorsList/VisitorsList';
import EmployeesList from './Components/EmployeesList/EmployeesList';
import VisitorsDetails from './Components/VisitorsDetails/VisitorsDetails';
function App() {
  const [employees, setEmployees] = useState([]); // Lift employees state to App

  const handleApprove = (visitor) => {
    // Add visitor to the employees list
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
        <div className="dashboard">
          <div className="sidebar">
            <nav className="nav flex-column">
              <Link className="nav-link active" to="/">Visitors List</Link>
              <Link className="nav-link" to="/employees">Employees</Link>
            </nav>
          </div>
          <div className="content">
            <Routes>
              {/* Pass handleApprove and employees to the respective components */}
              <Route path="/" element={<VisitorsList handleApprove={handleApprove} />} />
              <Route path="/employees" element={<EmployeesList employees={employees} />} />
              <Route path="/visitor/:id" element={<VisitorsDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
