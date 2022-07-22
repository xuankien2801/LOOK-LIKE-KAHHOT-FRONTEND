import React from 'react';
import { Link } from 'react-router-dom';
import { navStyle, navEleStyle, navLinkStyle } from './AdminNavBar';

// This component forms the navigation bar for the login/register pages
const NavBar = () => {
  return (
    <div id="navBar" style={navStyle}>
      <div style={navEleStyle}>
        <span ><Link to="/login" style={navLinkStyle}>Login</Link></span>
      </div>
      <div style={navEleStyle}>
        <span ><Link to="/register" style={navLinkStyle}>Register</Link></span>
      </div>
    </div>
  )
}
export default NavBar;
