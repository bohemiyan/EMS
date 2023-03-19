import React from 'react';
import { isLoggedIn} from '../../../services/HrService';


import { useNavigate } from 'react-router-dom';
import './card.css';

const EmployeeCard = (props) => {
  const navigate = useNavigate();
  const  loggedin  = isLoggedIn();
  const employee=props.employess;

  let Style=null
  if(!employee.image)
  {
  Style={
    backgroundImage: 'url("https://source.unsplash.com/random/300x150/?person")'
  }
}

  return (
    <div className='card-container'>
      <div className='card-image' style={Style}>
        <img className='emp-img' src={employee.image} alt='employee picture' />
      </div>
      <div className='card-content'>
        <h2>{employee.name}</h2>
        <p>{employee.position}</p>
        <ul>
          <li>Phone: {employee.phone}</li>
          <li>Email: {employee.email}</li>
       
        </ul>
  
        {loggedin && (
          <div className='card-buttons'>
            <button
              className='card-button update-button'
              onClick={() => navigate(`/updateemployee/${employee._id}`)}
            >
              Update
            </button>
            <button className='card-button delete-button' value={employee._id} onClick={props.Delete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
