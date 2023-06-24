import React, { useState } from 'react';
import { sendOtp, verifyOtp, resetPassword } from '../../services/HrService';
import './login.css';
import ErrorMessage from '../errormessage/ErrorMessage';
import { useNavigate} from 'react-router-dom';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate=useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await sendOtp(email);
      setIsLoading(false);
      setIsOtpSent(true);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      // console.log(email)
      await verifyOtp(email, otp);
      setIsLoading(false);
      setIsOtpVerified(true);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await resetPassword(email, newPassword);
      setIsLoading(false);
      navigate('/login');
      // Password reset successful, you can redirect the user or show a success message
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleCancel=()=>{
navigate('/login');
  }

  return (
    <div className="login-container">
      {!isOtpSent && (
        <form className="login-form" onSubmit={handleEmailSubmit}>
          <h2 className="login-heading">Password Reset</h2>
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
          {error && <ErrorMessage message={error} />}
          <div className="form-group">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Send OTP'}
            </button>
            <button type="submit" 
            className="login-button" 
            disabled={isLoading}
            style={{background: "red",marginTop:"10px"}}
            onClick={handleCancel}
            >
            CANCEL
            </button>
          </div>
        </form>
      )}

      {isOtpSent && !isOtpVerified && (
        <form className="login-form" >
          <h2 className="login-heading">Verify OTP</h2>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            
            />
          </div>
          {error && <ErrorMessage message={error} />}
          <div className="form-group">
            <button type="submit" 
            className="login-button" 
            disabled={isLoading}
            onClick={handleOtpVerify}
            >
              {isLoading ? 'Loading...' : 'Verify OTP'}
            </button>
            <button className="resend-otp-button" onClick={handleEmailSubmit }>
              Resend OTP
              </button>

          </div>
        </form>
      )}

    

      {isOtpVerified && (
        <form className="login-form" onSubmit={handlePasswordReset}>
          <h2 className="login-heading">Reset Password</h2>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="repeatPassword"
              placeholder="Repeat new password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          {error && <ErrorMessage message={error} />}
          <div className="form-group">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Reset Password'}
            </button>
          </div>
        </form>
      )}


    </div>
  );
};

export default ResetPasswordForm;
