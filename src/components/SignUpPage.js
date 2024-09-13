import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Ensure to import the CSS file

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add your sign-up logic here (mocked for now)
    navigate('/login'); // Redirect to Login page after signing up
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
      </div>
      <div className="signup-image">
        <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" alt="Background" />
      </div>
    </div>
  );
};

export default SignUpPage;
