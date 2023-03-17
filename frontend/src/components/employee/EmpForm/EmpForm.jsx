import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getToken }  from '../../../services/HrService';
import  EmployeeService  from '../../../services/employeeService';
import ErrorMessage from '../../errormessage/ErrorMessage';
import './empform.css';

const EmpForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const HrTocken=getToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('position', position);
    if (image) {
      formData.append('image', image);
    }
    try {
      // console.log(formData.get('image'))
      await EmployeeService.createEmployee(HrTocken,formData);
      navigate('/home');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };


  return (
    <div className="emp-form">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <select id="position" name="position"   onChange={(e) => setPosition(e.target.value)} required>
          <option value="">Select</option>
            <option value="SDE">SDE</option>
            <option value="MERN">MERN</option>
            <option value="WEB">WEB</option>
            <option value="SERVER">SERVER</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image: Max 2MB</label>
          <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className='Submit'>Submit</button>
        <button type='cancel' className='Cancel' onClick={(e)=>{navigate('/home')}}>Cancel</button>
      </form>
    </div>
  );
};

export default EmpForm;
