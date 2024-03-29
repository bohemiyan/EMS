import {Routes,Route,Navigate} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer/Footer'
// import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import HrUpdate from './components/hrupdate/HrUpdate';
import EmpForm from './components/employee/EmpForm/EmpForm';
import { isLoggedIn} from './services/HrService';
import UpdateForm from './components/employee/UpdateForm/UpdateForm';
import ForgetPass from './components/login/ResetPasswordForm';

import './app.css'

function App() {
  const login=isLoggedIn();

  return (
    <div>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={login ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgetpass' element={<ForgetPass/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/hrupdate" element={<HrUpdate />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addemployee" element={<EmpForm />} />
        <Route path="/updateemployee/:id" element={<UpdateForm />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
    <Footer />
   </div>
  );
}

export default App;


