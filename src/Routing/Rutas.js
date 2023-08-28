import React from 'react'
import {Routes,Route,BrowserRouter,NavLink} from 'react-router-dom'
import { InicioDemo } from '../Componentes/Pages/InicioDemo'
import { PaginaPrincipal } from '../Componentes/Pages/PaginaPrincipal'
import { Landing } from '../Componentes/Pages/Landing'
import { Nav } from '../Componentes/Layout/Nav'
import '../Landing.css'

export const Rutas = () => {
  return (
    <BrowserRouter>
        {/*  */}
        <div className='fondo'></div>
        <Nav/>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/Inicio" element={<PaginaPrincipal/>}/>
            <Route path="Ruta" element={<InicioDemo/>}/>
        </Routes>
    </BrowserRouter>
  )
}
