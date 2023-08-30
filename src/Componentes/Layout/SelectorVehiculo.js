import React from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../CSS/SelectVehicle.css';

export const SelectorVehiculo = ({vehiculo,setVehiculo}) => {
    const vehiculos = ['Coche','Andando'];

    const handleChange = (event) => {
        //setPoi(event.target.value);
        let vehiculo = event.target.value;
        //driving-car foot-walking
        if(vehiculo === 'Coche'){
            sessionStorage.setItem('vehicle', 'driving-car');
        }
        else{
            sessionStorage.setItem('vehicle', 'foot-walking');
        }

        
        setVehiculo(event.target.value);
    };
  return (
    <div>
        {vehiculo === ''&& 
            <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Vehículo</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              //value={poi}
              onChange={handleChange}
              autoWidth
              label="Vehículo"
              value={vehiculo ?? " "}
              
            >
              
              {vehiculos.map((v,index) =>{
                return(<MenuItem key={index} value={v}>{v}</MenuItem>)
              })}
        
            </Select>
          </FormControl>
        }

        {vehiculo !== ''&& 
            <FormControl sx={{ minWidth: 180,marginTop:0 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Vehículo</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              //value={poi}
              onChange={handleChange}
              autoWidth
              label="Vehículo"
              defaultValue={vehiculo}
              value={vehiculo ?? " "}
              
              
            >
              
              {vehiculos.map((v,index) =>{
                return(<MenuItem key={index} value={v}>{v}</MenuItem>)
              })}
        
            </Select>
          </FormControl>
        }
    </div>
  )
}
