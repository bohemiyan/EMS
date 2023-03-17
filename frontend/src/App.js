import {Routes,Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import EmpForm from './components/employee/EmpForm/EmpForm';
import { isLoggedIn} from './services/HrService';
import UpdateForm from './components/employee/UpdateForm/UpdateForm';


const App = () => {
  const  login  = isLoggedIn();
  return (
    <div className="App">
<Navbar/>
     <Routes>
           <Route 
              path="/" 
              element={login ? <Home /> : <Login/>} 
            />
          <Route path="/login" element={ <Login/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/addemployee" element={<EmpForm/>} />
          <Route path="/updateemployee/:id" element={<UpdateForm/>} />
        </Routes>
      <Footer/>
    </div>
  );
};

export default App;

