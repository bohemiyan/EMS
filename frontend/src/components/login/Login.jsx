import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/HrService';
import './login.css';
import ErrorMessage from '../errormessage/ErrorMessage'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      setIsLoading(false);
      navigate('/home');
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2 className='login-heading'>Log In</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        {error && <ErrorMessage message={error} />}
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Log in'}
        </button>
        </div>
        <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p className="mt-3">
  <Link to="/forgetpass" style={{ color: "red" }}>
    Forgot Password!
  </Link>
</p>

      </form>
    </div>
  );
};

export default Login;
