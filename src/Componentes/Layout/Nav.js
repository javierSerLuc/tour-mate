import React from 'react'
import '../CSS/Nav.css'
export const Nav = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
        <span className='montserrat900'>TOUR MATE</span>
      </div>
      <div className="nav-links montserrat700">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </div>
    </div>
  )
}
