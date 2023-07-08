import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { async } from 'q';

export const SelectorPoiInicial = () => {
    const [poi, setPoi] = React.useState('');
    const [listaPois, setListaPois] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleChange = (event) => {
        setPoi(event.target.value);
    };

    const cargarPoisIniciales = async() => {
      //obtener datos del session storage
      const dia = sessionStorage.getItem('dia');
      const dateInicioRuta = sessionStorage.getItem('horaInicio');

      let url = 'http://localhost:8080/api/getPoisAbiertos';
      let especificaciones = {
        "ciudad" : "Granada",
        "dia" : dia,
        "dateInicioRuta" : dateInicioRuta
      };
      let requestOptions ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(especificaciones)
      }
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      
      setListaPois(data.map((poi) => poi.nombre));
      setLoading(false);

    };

    useEffect(() => {
      cargarPoisIniciales();
    }, []);
  
    return (
      
      <div>
        {loading ? <h1>Cargando...</h1> :
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Lugar de inicio</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={poi}
            onChange={handleChange}
            autoWidth
            label="Lugar de inicio"
          >
            
            {listaPois.map((poi,index) =>{
              return(<MenuItem index={index} value={poi}>{poi}</MenuItem>)
            })}
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem> */}
          </Select>
        </FormControl>
        }
      </div>
    );
}
