import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from "react";

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [click,setClick] = useState(false);

  const handleClick1 = () => setClick(!click);
  const handleClick = () => {
    logout()
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Employee Managment System 
            
            <i className="fas fa-code"></i>
          </NavLink>

         {user && (
          <> <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick1}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/account"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick1}
            >
              Profile
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink
              exact
              to="/blog"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick1}
            >
              Blog
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/contact"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick1}
            >
              Feedback 
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/fertilizer"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick1}
            >
              Fertilizer
            </NavLink>
          </li> */}
        </ul>
        <div className="nav-icon" onClick={handleClick1}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div><>
          </><div>
              <span className='bb'>{user.email}</span>
              <button className='dan'onClick={handleClick}>Log out</button>
            </div></>
          )}
          {!user && (
            <div >
              <Link to="/login" className='danLink'>Login</Link>
              <Link to="/signup" className='danLink'>Signup</Link>
            </div>
          )}
          </div>
      </nav>
    </>
  );

}

export default Navbar