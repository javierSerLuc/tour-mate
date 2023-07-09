import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

let nombresDiasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const SelectorDia = ({diaCalendar,setDiaCalendar}) => {
  

  const getDia = (date) => {
    sessionStorage.setItem('dia', nombresDiasSemana[date["$W"]]);
    setDiaCalendar(date);
  };
  return (
    <div>
      {diaCalendar === ''&&
        <DatePicker onChange={(newValue) => getDia(newValue)} label="Día de la ruta" format='DD/MM/YYYY' />
      }
      {diaCalendar !== ''&& 
        <DatePicker onChange={(newValue) => getDia(newValue)} label="Día dedsa la ruta" format='DD/MM/YYYY' defaultValue={diaCalendar}/>
      }

    </div>
  )
}
