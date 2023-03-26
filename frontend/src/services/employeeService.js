import axios from 'axios';
import {EmpBaseUrl} from '../config'

const baseUrl = EmpBaseUrl;


const EmployeeService = {
  getEmployees: async (token) => {
    try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}/emp/get`, config);
    return response.data;
  }catch(error){
    // console.log(error.response.data.error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
  },

  getEmployeesById: async (token,empid) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}/emp/get/${empid}`, config);
    return response.data;
  },

  createEmployee: async (token, data) => {
    try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(`${baseUrl}/emp/create`, data, config);
    return response.data;
  } catch (error){
  if (error.response && error.response.data) {
    throw new Error(error.response.data.error);
  } else {
    throw new Error("Something went wrong");
  }
}
},


  updateEmployee: async (token, data, empId,) => {
    try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.put(`${baseUrl}/emp/update/${empId}`, data, config);
    return response.data;
  }catch (error){
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong");
    }
  }
  },


  deleteEmployee: async (token, empId) => {
    try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${baseUrl}/emp/delete/${empId}`, config);
    return response.data;
  }catch (error){
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Something went wrong");
    }
  }
  },
};

export default EmployeeService;
