import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Navbar from './components/Navbar'



function App() {
  const { user } = useAuthContext()

  return (

    <div className='backPage'>
    <div className="App">
      <BrowserRouter>
        <Navbar />   
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
             <Route 
              path="/account" 
              element={user ? <Account /> : <Navigate to="/login" />} 
            />
          
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
         
          </Routes>
        </div>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

