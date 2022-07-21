import React from 'react';
import { Link } from 'react-router-dom';

export const navStyle = {
  display: 'flex',
  backgroundColor: '#FF8E00',
}

export const navEleStyle = {
  padding: '15px 15px',
}

export const navLinkStyle = {
  color: 'black',
  fontWeight: 'bold',
}

// This component serves as the navbar for all pages with admin status
const AdminNavBar = () => {
  return (
    <div id="navBar" style={navStyle}>
      <div style={navEleStyle}>
        <span><Link id='nav-home' style={navLinkStyle} to="/home">Home</Link></span>
      </div>
      <div style={navEleStyle}>
        <span><Link id='nav-logout' style={navLinkStyle} to="/login">Logout</Link></span>
      </div>
    </div>
  )
}
export default AdminNavBar;