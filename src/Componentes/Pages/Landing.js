import React, { useEffect } from 'react'
import '../../Landing.css'
import { Nav } from '../Layout/Nav'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, [])
  
  return (
    <div className='landing'>
        {/* <div className='fondo'></div> */}
        {/* <Nav/> */}
        <div className="landing-content">
            <div className="landing-text">
                <div className='texto'>
                    <span className='montserrat400'>Viaja</span>
                    <span className='montserrat400'>con</span>
                    <span className='montserrat700'>Tour Mate</span>
                </div>
                <div className='sub-texto'>
                    <span className='roboto'>Olvídate de las complicadas guías de viaje y deja que TourMate cree rutas turísticas hechas a medida según tus preferencias.Descubre el mundo con facilidad y comodidad con TourMate, tu compañero de viaje personalizado.</span>
                </div>
                <div className='boton'>
                    <Button onClick={() => navigate('/Inicio')}   variant="contained" className='boton-landing' href='' sx={{width: 200,borderRadius: 35,bgcolor: '#F8A41F',
    ':hover': {
      bgcolor: '#F8A41F', // theme.palette.primary.main
      color: 'white',
      
    },
  }}>Empieza tu viaje</Button>
                </div>
            </div>
            <div className="landing-image">
                <img src="/../Couple.svg" alt="Landing" />
            </div>
        </div>
    </div>
  )
}
