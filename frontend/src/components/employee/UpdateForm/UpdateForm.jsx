import React, { useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {getToken }  from '../../../services/HrService';
import  EmployeeService  from '../../../services/employeeService';
import ErrorMessage from '../../errormessage/ErrorMessage';
import './updateform.css';

const UpdateForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setimageName] = useState()
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState(false)

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
      setimageName(emp.image)
    };
    fetchData();
  }, [empId,HrToken]);


const imageChange=(e)=>{
            setImage(e.target.files[0]);
            setimageName(e.target.files[0].name)
}

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setisLoading(true);
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
        setisLoading(false);
        navigate('/home');
      })
      .catch((error) => {
        setError(error.message);
        setisLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="update-form">
      <form onSubmit={handleFormSubmit}>
      <h2>Update Employee</h2>
      <div className="emp-update-form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="emp-update-form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="emp-update-form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="emp-update-form-group">
          <label htmlFor="position">Position</label>
          <select id="position" name="position" value={position}   onChange={(e) => setPosition(e.target.value)} required>
          <option value="">Select</option>
            <option value="SDE">SDE</option>
            <option value="MERN">MERN</option>
            <option value="WEB">WEB</option>
            <option value="SERVER">SERVER</option>
          </select>
        </div>
        <div className="emp-update-form-group">
          <label htmlFor="image">Image: Max 2MB</label>
          <input type="file" id="image" name="image" 
          onChange={imageChange} />
          {!imageName && <ul>No image</ul>}
          {imageName && <ul>{imageName}</ul>}
        
        </div>
        <div className="buttons">
        {error && <ErrorMessage message={error} />}
        <button type="submit" className="emp-u-Submit">
         {isLoading? 'Loading..':'Update'}
        </button>
        <button type="cancel" className="emp-u-Cancel" onClick={(e)=>{navigate('/home')}}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
