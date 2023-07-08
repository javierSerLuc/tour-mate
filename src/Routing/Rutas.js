import React from 'react'
import {Routes,Route,BrowserRouter,NavLink} from 'react-router-dom'
import { InicioDemo } from '../Componentes/Pages/InicioDemo'
import { PaginaPrincipal } from '../Componentes/Pages/PaginaPrincipal'

export const Rutas = () => {
  return (
    <BrowserRouter>
        {/*  */}

        <Routes>
            <Route path="/" element={<PaginaPrincipal/>}/>
            <Route path="/mapa" element={<InicioDemo/>}/>
        </Routes>
    </BrowserRouter>
  )
}
