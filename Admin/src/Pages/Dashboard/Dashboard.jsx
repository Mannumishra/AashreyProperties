import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Add your styling here

const Dashboard = () => {
  const links = [
    { path: '/dashboard', icon: 'fa-gauge', label: 'Dashboard' },
    { path: '/all-locations', icon: 'fa-location-dot', label: 'All Locations' },
    { path: '/all-properties', icon: 'fa-building', label: 'All Properties' },
    { path: '/all-vendor-properties', icon: 'fa-building-user', label: 'User Properties' },
    { path: '/all-users', icon: 'fa-user', label: 'All Users' },
  ];

  return (
    <div className="dashboard-container">
   <h1 className="dashboard-heading">Welcome to Admin Panel</h1>
      <div className="dashboard-links">
        {links.map((link, index) => (
          <Link to={link.path} className="dashboard-card" key={index}>
            <div className="dashboard-icon">
              <i className={`fa-solid ${link.icon}`}></i>
            </div>
            <div className="dashboard-label">{link.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
