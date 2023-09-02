import React, { useMemo, useState } from 'react'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const horaRegex = /\d{2}:\d{2}/;
export const SelectorHora = ({horaReloj,setHoraReloj,reloj,setPoiInicialSelect,label,minHora,setErrorHora}) => {
  const [error, setError] = useState(null); 
    const errorMessage = React.useMemo(() => {
      switch (error) {
        case 'minTime': {
          //setErrorHora(1);
          return 'Selecciona una hora mayor a la hora de inicio';
        }
  
        case 'invalidDate': {
          //setErrorHora(1);
          return 'Your date is not valid';
        }
  
        default: {
          //setErrorHora(0);
          return '';
        }
      }
    }, [error]);
  
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
        <MobileTimePicker onAccept={(newValue) => getHora(newValue)} minTime={reloj === 1 ? minHora : ""} onError={(newError) => {setError(newError);newError === 'minTime' ? setErrorHora(1) :setErrorHora(0) }} slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }} defaultValue={horaReloj}  label={label} />
      }
    </div>
  )
}