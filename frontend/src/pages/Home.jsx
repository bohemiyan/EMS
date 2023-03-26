import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/employeeService';
import EmployeeCard from '../components/employee/Card/Card';
import {getToken,logout} from '../services/HrService';
import'./home.css'

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const hrToken=getToken();
  const navigate=useNavigate();
  


  useEffect(() => {
    const fetchData = async () => {
      try{
      const data = await EmployeeService.getEmployees(hrToken);
      const empdata=data.employees
      setEmployees(empdata);
      }catch(error)
      {
        console.error(error)
        if(error)
        {
          logout();
          navigate('/login');
        }

      }
    };
    fetchData();
  }, [hrToken]);

  const handleDelete =async(emp)=> {
    try {
      const empId=emp.target.value
       EmployeeService.deleteEmployee(hrToken,empId);
      setEmployees(employees.filter(obj => obj._id !==empId))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <div className='header'><h1>Employees</h1></div>
      <div className='list-container'>
      <div className="employee-list">
        {employees && employees.map((employee) => (
          <EmployeeCard key={employee._id} employess={employee} Delete={handleDelete} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Home;
