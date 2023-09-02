import React, { useEffect } from 'react'
import {useState} from 'react'
import {Mapa} from '../Layout/Mapa'

import { useNavigate } from "react-router-dom";
import { ListaRuta } from '../Layout/ListaRuta';


import { MejoresRutas } from '../Layout/MejoresRutas';


export const InicioDemo = () => {
    const [componenteMostrar, setComponenteMostrar] = useState(0); //Resumen ruta, 1 = mapa
    const [rutaMostrar, setRutaMostrar] = useState(0);
    const [numRutas, setNumRutas] = useState(0); 
    const [rutas, setRutas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [poiSeleccionado, setPoiSeleccionado] = useState(0);
    const [datosGrafico, setDatosGrafico] = useState([]);
    const navigate = useNavigate();
    
    const normalizarDatosGrafico = (rutas) => {
        let maxCoste = 0;
        let maxDistancia = 0;
        let maxMonumentos = 0;
        let maxNaturaleza = 0;
        let maxVisitas = 0;
      
        for (let i = 0; i < rutas.length; i++) {
          if (rutas[i].pois.length > maxVisitas) {
            maxVisitas = rutas[i].pois.length;
          }
          if (rutas[i].distancia > maxDistancia) {
            maxDistancia = rutas[i].distancia;
          }
          if (rutas[i].coste > maxCoste) {
            maxCoste = rutas[i].coste;
          }
          if (rutas[i].puntosMonumento > maxMonumentos) {
            maxMonumentos = rutas[i].puntosMonumento;
          }
          if (rutas[i].puntosAreasNaturales > maxNaturaleza) {
            maxNaturaleza = rutas[i].puntosAreasNaturales;
          }
        }
      
        let datosGraficoTMP = [];
        for (let i = 0; i < rutas.length; i++) {
          datosGraficoTMP.push([
            rutas[i].pois.length / maxVisitas,
            rutas[i].distancia / maxDistancia,
            rutas[i].puntosMonumento / maxMonumentos,
            rutas[i].puntosAreasNaturales / maxNaturaleza,
            rutas[i].coste / maxCoste,
          ]);
        }
      
        setDatosGrafico(datosGraficoTMP);
        setLoading(false);
      };
    const getRutas = async () =>{
        let url = "http://localhost:8080/api/getRutas/15";
        
        let dia = sessionStorage.getItem('dia');
        let dateInicioRuta = sessionStorage.getItem('horaInicio');
        let dateFinRuta = sessionStorage.getItem('horaFin');
        let poiInicial = sessionStorage.getItem('poiInicial');
        let vehiculo = sessionStorage.getItem('vehicle');

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
            especificacionCriteriosRuta : especificacionCriteriosRuta,
            vehicle : vehiculo
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
        const array = data.rutas;
        const mejoresRutas = array.slice(0,3);
        setRutas(mejoresRutas);
        setNumRutas(rutas.length);

        normalizarDatosGrafico(mejoresRutas);
        //Normalizar datos grafico
        //const datosArania = await normalizarDatosGrafico(rutas);
        //setDatosGrafico(datosArania);

       // setLoading(false);
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
        {/* <button onClick={() => navigate('/')}>Volver</button> */}
        <button onClick={() => setComponenteMostrar(0)}>Volver</button>
        <button onClick={() => console.log(datosGrafico)}>dsadsa</button>
        {/* <button onClick={() => console.log(rutas)}>Get Rutas</button> */}
        {loading ? <h1>Cargando...</h1>
        
        :<div>
            {componenteMostrar === 0 ? <MejoresRutas setComponenteMostrar={setComponenteMostrar} listaRutas={rutas} setRutaMostrar={setRutaMostrar} datosGrafico={datosGrafico} />
            :<div className='mapa-board'>
                {/* <button onClick={() => changeRuta(-1)}>anterior</button>
                <button onClick={() => changeRuta(+1)}>Siguiente</button> */}
                <div className='mapa'>
                    <Mapa pois={rutas[rutaMostrar].pois} path={rutas[rutaMostrar].path} poiActual={poiSeleccionado}></Mapa>
                </div>
                <div className='lista-rutas'>
                    <ListaRuta pois={rutas[rutaMostrar].pois} setPoiSeleccionado={setPoiSeleccionado} poiSeleccionado={poiSeleccionado}></ListaRuta>
                </div>    
            </div>}
            
            {/* <div>
                <button onClick={() => changeRuta(-1)}>anterior</button>
                <button onClick={() => changeRuta(+1)}>Siguiente</button>
                <div className='mapa'>
                    <Mapa pois={rutas[rutaMostrar].pois} path={rutas[rutaMostrar].path} poiActual={poiSeleccionado}></Mapa>
                </div>
                <div className='lista-rutas'>
                    <ListaRuta pois={rutas[rutaMostrar].pois} setPoiSeleccionado={setPoiSeleccionado}></ListaRuta>
                </div>
            </div> */}
        </div>}
        
        {/* mapas */}
    </div>
  )
}
