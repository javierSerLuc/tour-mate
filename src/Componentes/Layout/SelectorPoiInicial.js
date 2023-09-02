import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { async } from 'q';
import CircularProgress from '@mui/material/CircularProgress';

export const SelectorPoiInicial = ({poiInicialSelect,setPoiInicialSelect}) => {
    //const [poi, setPoi] = React.useState('');
    const [listaPois, setListaPois] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleChange = (event) => {
        //setPoi(event.target.value);
        sessionStorage.setItem('poiInicial', event.target.value);
        setPoiInicialSelect(event.target.value);
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
      
      setListaPois(data.map((poi) => poi.nombre));
      setLoading(false);

    };

    useEffect(() => {
        cargarPoisIniciales();
      
      
    }, []);
  
    return (
      
      <div>
        {loading ? <CircularProgress/> :
        {poiInicialSelect} === '' ?
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Lugar de inicio</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            //value={poi}
            onChange={handleChange}
            autoWidth
            label="Lugar de inicio"
            value={poiInicialSelect ?? " "}
            
          >
            
            {listaPois.map((poi,index) =>{
              return(<MenuItem key={index} value={poi}>{poi}</MenuItem>)
            })}
      
          </Select>
        </FormControl>
        :
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Lugar de inicio</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            //value={poi}
            onChange={handleChange}
            autoWidth
            label="Lugar de inicio"
            defaultValue={poiInicialSelect}
            value={poiInicialSelect ?? " "}
            
          >
            
            {listaPois.map((poi,index) =>{
              return(<MenuItem key={index} value={poi}>{poi}</MenuItem>)
            })}
      
          </Select>
        </FormControl>
        }
      </div>
    );
}
