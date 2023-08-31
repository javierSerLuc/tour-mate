import React from 'react'
import { SelectorDia } from './SelectoresFechas/SelectorDia'
import { SelectorHora } from './SelectoresFechas/SelectorHora'
import { SelectorVehiculo } from './SelectorVehiculo'
import '../CSS/Selector1.css'
export const SelectorFecha = ({diaCalendar,setDiaCalendar,horaInicioReloj,setHoraInicioReloj,horaFinReloj,setHoraFinReloj,setPoiInicialSelect,vehiculo,setVehiculo}) => {
  return (
    <div className='selector-uno'>
     

        
        <SelectorDia diaCalendar={diaCalendar} setDiaCalendar={setDiaCalendar}/>
        <SelectorHora horaReloj={horaInicioReloj} setHoraReloj={setHoraInicioReloj} reloj={0} setPoiInicialSelect={setPoiInicialSelect} label="Hora de Inicio"/>
        <SelectorHora horaReloj={horaFinReloj} setHoraReloj={setHoraFinReloj} reloj={1} label="Hora de Fin"/>
        <SelectorVehiculo vehiculo={vehiculo} setVehiculo={setVehiculo}/>
    </div>
  )
}
