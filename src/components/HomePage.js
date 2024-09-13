import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/todo'); // Navigate to To-Do page
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to To-Do App</h1>
        <button onClick={handleLoginClick} className="btn btn-primary">Login</button>
        <button onClick={() => navigate('/signup')} className="btn btn-secondary">Sign Up</button>
      </div>
      <div className="home-image">
        <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" alt="Home Background" />
      </div>
    </div>
  );
};

export default HomePage;
