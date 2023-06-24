import React from 'react';
import {isLoggedIn,HrName,logout} from '../../services/HrService';
import './navbar.css';
import logo from './github.ico';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const login=isLoggedIn();
  const Hr=HrName();
  const navigate=useNavigate();

  const currentUrl = window.location.pathname;
  const page = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img src={logo} 
        onClick={()=>{navigate('/')}} alt="logo" 
        />
        </div>
      {login && (
        <div className="navbar-right">
          {page==='home' &&(
          <div className="add-employee">
            <button onClick={() => navigate('/addemployee')}>Add Employee</button>
          </div>
        )}
         
          <div className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="hr-name" onClick={()=>navigate('/HrUpdate')}>{Hr}</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
