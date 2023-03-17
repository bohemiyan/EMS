import React from 'react';
import {isLoggedIn,HrName,logout} from '../../services/HrService';
import './navbar.css';
import logo from './github.ico';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const login=isLoggedIn();
  const Hr=HrName();
  const navigate = useNavigate();



  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img src={logo} 
        onClick={()=>{navigate('/home')}} alt="logo" 
        />
        </div>

        {/* {login && (
          
        )} */}
      
      {login && (
        <div className="navbar-right">
          <div className="hr-name">{Hr}</div>
          <div className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="add-employee">
            <button onClick={() => navigate('/addemployee')}>Add Employee</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
