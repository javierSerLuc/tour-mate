import React, { useEffect } from 'react'
import {useState} from 'react'
import {Mapa} from '../Layout/Mapa'

import { useNavigate } from "react-router-dom";
import { ListaRuta } from '../Layout/ListaRuta';

export const InicioDemo = () => {
    const [rutaMostrar, setRutaMostrar] = useState(0);
    const [numRutas, setNumRutas] = useState(0); 
    const [rutas, setRutas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [poiSeleccionado, setPoiSeleccionado] = useState(0);
    const navigate = useNavigate();

    const getRutas = async () =>{
        let url = "http://localhost:8080/api/getRutas/10";
        
        let dia = sessionStorage.getItem('dia');
        let dateInicioRuta = sessionStorage.getItem('horaInicio');
        let dateFinRuta = sessionStorage.getItem('horaFin');
        let poiInicial = sessionStorage.getItem('poiInicial');

        let especificacionFecha = {
            "ciudad" : "Granada",
            "dia" : dia,
            "dateInicioRuta" : dateInicioRuta,
            "dateFinRuta" : dateFinRuta,
            "poiInicio" : poiInicial
        };

        //borrar session storage

        // sessionStorage.removeItem('dia');
        // sessionStorage.removeItem('horaInicio');
        // sessionStorage.removeItem('horaFin');
        // sessionStorage.removeItem('poiInicial');
        


        // let especificacionFecha = {
        //     "ciudad" : "Granada",
        //     "dia" : "Sábado",
        //     "dateInicioRuta" : "09:10",
        //     "dateFinRuta" : "13:50"
        // };
        
        let especificacionCriteriosRuta = JSON.parse(sessionStorage.getItem('criteriosUsuario'));
        let especificaciones = {
            especificacionFechaRuta : especificacionFecha,
            especificacionCriteriosRuta : especificacionCriteriosRuta
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
        
        setRutas(data.rutas);
        setNumRutas(data.numeroRutas);
        
        setLoading(false);
    };

    useEffect(() => {
        getRutas();
        
    },[]);

    const changeRuta = (num) => {
        if(num > 0 && (1 + rutaMostrar) < numRutas){
            setRutaMostrar(rutaMostrar + 1);
        }
        else if(num < 0 && (rutaMostrar - 1) >= 0){
            setRutaMostrar(rutaMostrar - 1);
        }
    }

  return (
    <div>
        <button onClick={() => navigate('/')}>Volver</button>
        <button onClick={() => console.log(rutas)}>Get Rutas</button>
        {loading ? <h1>Cargando...</h1>
        
        : <div>
            <h1>InicioDemo</h1>
            <button onClick={() => changeRuta(-1)}>anterior</button>
            <button onClick={() => changeRuta(+1)}>Siguiente</button>
            <Mapa pois={rutas[rutaMostrar].pois} path={rutas[rutaMostrar].path} poiActual={poiSeleccionado}></Mapa>
            <ListaRuta pois={rutas[rutaMostrar].pois} setPoiSeleccionado={setPoiSeleccionado}></ListaRuta>
            </div>}
        
        {/* mapas */}
    </div>
  )
}
