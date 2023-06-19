import React from 'react'
import {Routes,Route,BrowserRouter,NavLink} from 'react-router-dom'
import { InicioDemo } from '../Componentes/Pages/InicioDemo'

export const Rutas = () => {
  return (
    <BrowserRouter>
        {/*  */}

        <Routes>
            <Route path="/" element={<InicioDemo/>}/>
            <Route path="/mapa" element={<InicioDemo/>}/>
        </Routes>
    </BrowserRouter>
  )
}
