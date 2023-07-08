import React, { useEffect } from 'react'
import {useState} from 'react'
import {Mapa} from '../Layout/Mapa'

export const InicioDemo = () => {
    const [rutaMostrar, setRutaMostrar] = useState(0);
    const [numRutas, setNumRutas] = useState(0); 
    const [rutas, setRutas] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRutas = async () =>{
        let url = "http://localhost:8080/api/getRutas/10";
        let especificacionFecha = {
            "ciudad" : "Granada",
            "dia" : "Sábado",
            "dateInicioRuta" : "09:10",
            "dateFinRuta" : "13:50"
        };
        let especificacionCriteriosRuta = {
            "importanciaDistancia" : 1,
            "importanciaMuseo" : -1
        }
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
        
        console.log(rutas);
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
        <button onClick={() => console.log(rutas)}>Get Rutas</button>
        <button onClick={() => console.log(rutaMostrar)}>Ruta Mostrar</button>
        {loading ? <h1>Cargando...</h1>
        
        : <div>
            <h1>InicioDemo</h1>
            <button onClick={() => changeRuta(-1)}>anterior</button>
            <button onClick={() => changeRuta(+1)}>Siguiente</button>
            <Mapa pois={rutas[rutaMostrar].pois} path={rutas[rutaMostrar].path}></Mapa>
            </div>}
        
        {/* mapas */}
    </div>
  )
}
