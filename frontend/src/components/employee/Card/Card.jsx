import React from 'react';
import { isLoggedIn, getToken } from '../../../services/HrService';
import EmployeeService from '../../../services/employeeService';

import { useNavigate } from 'react-router-dom';
import './card.css';

const EmployeeCard = ({ employee }) => {
  
  const navigate = useNavigate();
  
  const  hrAuth  = isLoggedIn();
  const token=getToken();

  const handleDelete = async () => {
    try {
      await EmployeeService.deleteEmployee(token,employee._id);
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='card-container'>
      <div className='card-image'>
        <img className='emp-img' src={employee.image} alt='employee' />
      </div>
      <div className='card-content'>
        <h2>{employee.name}</h2>
        <p>{employee.position}</p>
        <ul>
          <li>Phone: {employee.phone}</li>
          <li>Email: {employee.email}</li>
       
        </ul>
  
        {hrAuth && (
          <div className='card-buttons'>
            <button
              className='card-button update-button'
              onClick={() => navigate(`/updateemployee/${employee._id}`)}
            >
              Update
            </button>
            <button className='card-button delete-button' onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
