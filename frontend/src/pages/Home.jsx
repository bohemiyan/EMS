import { useEffect, useState } from 'react';
import EmployeeService from '../services/employeeService';
import EmployeeCard from '../components/employee/Card/Card';
import {getToken} from '../services/HrService';
import'./home.css'

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const hrToken=getToken();


  useEffect(() => {
    const fetchData = async () => {
      const data = await EmployeeService.getEmployees(hrToken);
      const empdata=data.employees
      setEmployees(empdata);
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