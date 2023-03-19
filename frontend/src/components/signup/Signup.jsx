import React, { useState,useEffect } from 'react';
import { signup } from '../../services/HrService';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../errormessage/ErrorMessage';
import './signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('')
  const [showPassword, setshowPassword] = useState(false)
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setshowPassword(!showPassword);
  };

 
  useEffect(() => {
    if(password!==retypePassword)
    setError('Mismatched Password')
    else 
    setError(null)
  }, [retypePassword,password])
  

  const handleSignup = async (e) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      await signup(name, email, password)
      .then(() =>{
        navigate('/home');
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2 className="signup-heading">Sign Up</h2>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
           <button type="button" onClick={handleShowPasswordClick}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        </div>
        <div className="form-field">
          <label htmlFor="password">Retype Password:</label>
          <input
            type="password"
            id="retype-password"
            placeholder="Retype password"
            value={retypePassword}
            onChange={handleRetypePasswordChange}
            required
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <div className="form-field">
      
          <button type="submit"
           className="signup-button"  disabled={error==='Mismatched Password' ? true : false}>
           {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
          <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

