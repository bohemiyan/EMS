import axios from 'axios';
import { HrBaseURL } from '../config';

const baseUrl = HrBaseURL;

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/Hr/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("Hr", response.data.name);
      localStorage.setItem("email", response.data.email);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

  //#############################################################################
  export const sendOtp = async (email) => {
    try {
      const response = await axios.post(`${baseUrl}/Hr/send-otp`, {
        email,
      });
      return response.data;
    } catch (error) {
      // console.log(error.response)
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error('Something went wrong');
      }
    }
  };
  
  export const verifyOtp = async (email, otp) => {
    try {
      const response = await axios.post(`${baseUrl}/Hr/verify-otp`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error('Something went wrong');
      }
    }
  };
  
  export const resetPassword = async (email, newPassword) => {
    try {
      const response = await axios.post(`${baseUrl}/Hr/reset-password`, {
        email,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error('Something went wrong');
      }
    }
  };
  
  
  //#######################################################################333333###
 
  
  export const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/Hr/signup`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("Hr", response.data.name);
      localStorage.setItem("email", response.data.email);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

  export const Hrupdate = async (token,name,password,newpassword) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data={name,password,newpassword}
      const response = await axios.put(`${baseUrl}/Hr/update`,data,config);
      localStorage.setItem("Hr", response.data.name);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Hr");
    localStorage.removeItem('email')
  };
  
  export const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };

  export const HrName=()=>{
    return localStorage.getItem("Hr")
  };
  export const HrEmail=()=>{
    return localStorage.getItem('email')
  }

 