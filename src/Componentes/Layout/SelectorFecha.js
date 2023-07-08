import React from 'react'
import { SelectorDia } from './SelectoresFechas/SelectorDia'
import { SelectorHora } from './SelectoresFechas/SelectorHora'

export const SelectorFecha = ({diaCalendar,setDiaCalendar,horaInicioReloj,setHoraInicioReloj,horaFinReloj,setHoraFinReloj}) => {
  return (
    <div>
     

        
        <SelectorDia diaCalendar={diaCalendar} setDiaCalendar={setDiaCalendar}/>
        <SelectorHora horaReloj={horaInicioReloj} setHoraReloj={setHoraInicioReloj} reloj={0}/>
        <SelectorHora horaReloj={horaFinReloj} setHoraReloj={setHoraFinReloj} reloj={1}/>
    </div>
  )
}
