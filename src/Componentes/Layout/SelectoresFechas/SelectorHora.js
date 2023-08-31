import React from 'react'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const horaRegex = /\d{2}:\d{2}/;
export const SelectorHora = ({horaReloj,setHoraReloj,reloj,setPoiInicialSelect,label}) => {


  const getHora = (date) => {
    
    let cadena = date["$d"].toString();
    const hora = cadena.match(horaRegex)[0];
    if(reloj === 0){
      sessionStorage.setItem('horaInicio', hora);
      setPoiInicialSelect('');
      sessionStorage.setItem('poiInicial', '');
    }
    else{
      sessionStorage.setItem('horaFin', hora);
    }
    setHoraReloj(date);
    
  };
  return (
    <div>
      {horaReloj === ''&&
        <MobileTimePicker onAccept={getHora} label={label}   />
      }

      {horaReloj !== ''&&
        <MobileTimePicker onAccept={(newValue) => getHora(newValue)}  defaultValue={horaReloj}  label={label} />
      }
    </div>
  )
}