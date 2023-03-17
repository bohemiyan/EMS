import React, { useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {getToken }  from '../../../services/HrService';
import  EmployeeService  from '../../../services/employeeService';
import './updateform.css';

const UpdateForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);

  const  HrToken  = getToken();
  const navigate = useNavigate();
  const location = useLocation();
  
  const empId = location.pathname.split("/")[2];
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await EmployeeService.getEmployeesById(HrToken,empId);
     const emp=data.employee;
      
      setName(emp.name);
      setEmail(emp.email);
      setPhone(emp.phone);
      setPosition(emp.position);
      setImage(emp.image);
    };
    fetchData();
  }, [empId,HrToken]);



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('position', position);
    if (image) {
      formData.append('image', image);
    }

    EmployeeService.updateEmployee(HrToken,formData,empId )
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="update-form">
      <h2>Update Employee</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <select
            className="form-control"
            id="position"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          >
            <option value="">Select Position</option>
            <option value="SDE">SDE</option>
            <option value="MERN">MERN</option>
            <option value="WEB">WEB</option>
            <option value="SERVER">SERVER</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image: Max 2MB</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="Submit">
          Update
        </button>
        <button type="cancel" className="Cancel" onClick={(e)=>{navigate('/home')}}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateForm;
