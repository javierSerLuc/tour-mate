import React from 'react'
import '../CSS/Nav.css'
import logo from '../../Resources/logo.svg'

export const Nav = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <a href="/"className='montserrat900 titulo'>TOUR MATE</a>
      </div>
      <div className="nav-links montserrat700">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Crear Ruta</a></li>
          <li><a href="#">Contacto</a></li>
          <li><a href="#">Sobre Nosotros</a></li>
        </ul>
      </div>
    </div>
  )
}
