import React from 'react';
import'./errormessage.css'

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;
