import React from 'react'
import { SelectorDia } from './SelectoresFechas/SelectorDia'
import { SelectorHora } from './SelectoresFechas/SelectorHora'

export const SelectorFecha = ({diaCalendar,setDiaCalendar}) => {
  return (
    <div>
        
        <SelectorDia diaCalendar={diaCalendar} setDiaCalendar={setDiaCalendar}/>
        <SelectorHora/>
        <SelectorHora/>
    </div>
  )
}
