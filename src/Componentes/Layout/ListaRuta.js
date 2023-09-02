import React from 'react'
import {useState} from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { ListItemButton,IconButton } from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import '../CSS/ListaRuta.css';

export const ListaRuta = ({pois,setPoiSeleccionado,poiSeleccionado}) => {

  let styleSeleccionado = {
    bgcolor: '#F8A41F',
    //border radius arriba de 10 px
    borderRadius: '10px 10px 0px 0px',
    marginTop: '0.5rem',
    ':hover': {
      bgcolor: '#F8A41F'
      
    }
  };
  let styleNoSeleccionado = {
    marginTop: '0.5rem',
    ':hover': {
      bgcolor: '#ffc05d', // theme.palette.primary.main
      color: 'white',
      
    }
  };

  let styleNoSeleccionadoAbierto = {
    marginTop: '0.5rem',
    bgcolor: '#ffc05d',
    borderRadius: '10px 10px 0px 0px',
    ':hover': {
      bgcolor: '#F8A41F', // theme.palette.primary.main
      color: 'white',
      
    }
  };

  const [open, setOpen] = useState([]);

  const toggleOpen = (index) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };

  const traducirHorario = (horario) => {
      // Diccionario de días en inglés a español
    const diasEnIngles = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const diasEnEspanol = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    // Separar el string en partes
    const partes = horario.split(" ");
    console.log(partes);

    const partesDia = partes[0].split("-");
    const partesHora = partes[1].split("-");

    // Obtener los índices de inicio y fin de los días en inglés
    const indiceInicio = diasEnIngles.indexOf(partesDia[0]);
    const indiceFin = diasEnIngles.indexOf(partesDia[1]);

    if (indiceInicio === -1 || indiceFin === -1) {
      return "Horario no válido";
    }

    let horarioEnEspanol = "";
    // Crear el horario en español
    if(partesHora[0] === '00:00' && partesHora[1] === '23:59'){
       horarioEnEspanol = `${diasEnEspanol[indiceInicio]} a ${diasEnEspanol[indiceFin]}: Abierto las 24 horas`;
      
    }
    else{
       horarioEnEspanol = `${diasEnEspanol[indiceInicio]} a ${diasEnEspanol[indiceFin]}: ${partesHora[0]} - ${partesHora[1]}`;
    }

    

    return horarioEnEspanol;

  };

  return (
    <div>
        <List>
            {pois.map((poi,index) => (
              <div>
                <ListItemButton className='lista-mui' key={index} onClick={() => setPoiSeleccionado(index)} sx={poiSeleccionado === index ?  styleSeleccionado : open[index] ? styleNoSeleccionadoAbierto :  styleNoSeleccionado } disableTouchRipple={true}>
                    
                    <ListItemText primary={(index+1) + ") " + poi.nombre} />
                    <IconButton onClick={() => toggleOpen(index)}>
                      {open[index] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemButton>
                <Collapse in={open[index]} unmountOnExit>
                <div className='info-poi'>
                  <ul className='lista-info'>
                    {poi.horario.map((horario,index) => (
                      <li key={index}>{traducirHorario(horario)}</li>
                    ))}
                    <li>Coste: {poi.coste}€</li>
                  </ul>
                  <p className='poi-description'>
                    {poi.descripcion}
                  </p>

                </div>
            {/* Otros detalles del POI */}
          </Collapse>
              </div>
                
            ))}
        </List>
    </div>
  )
}
