import React, { useEffect } from 'react'
import {useState} from 'react'
import {Mapa} from '../Layout/Mapa'

export const InicioDemo = () => {
    const [pois, setPois] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRutas = async () =>{
        let url = "http://localhost:8080/api/getRutas/3";
        const response = await fetch(url);
        const data = await response.json();
        
        setRutas(data.rutas);
        setLoading(false);
    };

    useEffect(() => {
        getRutas();
        
        console.log(rutas);
    },[]);

  return (
    <div>
        <button onClick={() => console.log(rutas)}>Get Rutas</button>
        {loading ? <h1>Cargando...</h1>
        
        : <div>
            <h1>InicioDemo</h1>
            <Mapa pois={rutas[0].pois} path={rutas[0].path}></Mapa>
            </div>}
        
        {/* mapas */}
    </div>
  )
}
