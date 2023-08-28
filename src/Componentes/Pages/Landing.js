import React from 'react'
import '../../Landing.css'
import { Nav } from '../Layout/Nav'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export const Landing = () => {
  const navigate = useNavigate();
  
  return (
    <div className='landing'>
        <div className='fondo'></div>
        <Nav/>
        <div className="landing-content">
            <div className="landing-text">
                <div className='texto'>
                    <span className='montserrat400'>Viaja</span>
                    <span className='montserrat400'>con</span>
                    <span className='montserrat700'>Tour Mate</span>
                </div>
                <div className='sub-texto'>
                    <span className='roboto'>Lorem Ipsum es simplemente el texto de relleno de las imprentas.Lorem Ipsum es simplemente el texto de relleno de las imprentasLorem Ipsum es simplemente el texto de relleno de las imprentas</span>
                </div>
                <div className='boton'>
                    <Button onClick={() => navigate('/Inicio')}   variant="contained" className='boton-landing' href='/Inicio' sx={{width: 200,borderRadius: 35,
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
