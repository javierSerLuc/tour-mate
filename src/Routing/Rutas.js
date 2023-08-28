import React from 'react'
import {Routes,Route,BrowserRouter,NavLink} from 'react-router-dom'
import { InicioDemo } from '../Componentes/Pages/InicioDemo'
import { PaginaPrincipal } from '../Componentes/Pages/PaginaPrincipal'
import { Landing } from '../Componentes/Pages/Landing'

export const Rutas = () => {
  return (
    <BrowserRouter>
        {/*  */}

        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/Inicio" element={<PaginaPrincipal/>}/>
            <Route path="Ruta" element={<InicioDemo/>}/>
        </Routes>
    </BrowserRouter>
  )
}
