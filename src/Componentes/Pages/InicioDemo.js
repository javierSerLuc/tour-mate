import React, { useEffect } from 'react'
import {useState} from 'react'
import {Mapa} from '../Layout/Mapa'

import { useNavigate } from "react-router-dom";
import { ListaRuta } from '../Layout/ListaRuta';


import { MejoresRutas } from '../Layout/MejoresRutas';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


export const InicioDemo = () => {
    const [componenteMostrar, setComponenteMostrar] = useState(0); //Resumen ruta, 1 = mapa
    const [rutaMostrar, setRutaMostrar] = useState(0);
    const [numRutas, setNumRutas] = useState(0); 
    const [rutas, setRutas] = useState([]);
    const [rutasCompletas, setRutasCompletas] = useState([]); //Rutas completas, sin filtrar
    const [loading, setLoading] = useState(true);
    const [poiSeleccionado, setPoiSeleccionado] = useState(0);
    const [datosGrafico, setDatosGrafico] = useState([]);
    
    let botones = {width: '14rem',borderRadius: 35,bgcolor: '#5563ad',margin:4,':hover': {
      bgcolor: '#F8A41F', // theme.palette.primary.main
      color: 'white',
      
    }};

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
        let url = "http://localhost:8080/api/getRutas/5";
        
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
          console.log(requestOptions.body);
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        const array = data.rutas;
        setRutasCompletas(array);
        const mejoresRutas = array.slice(0,3);
        setRutas(mejoresRutas);
        setNumRutas(mejoresRutas.length);

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
        {/* <button onClick={() => setComponenteMostrar(0)}>Volver</button>
        <button onClick={() => console.log(datosGrafico)}>dsadsa</button>
        <button onClick={() => console.log(rutas)}>Get Rutas</button>
        <button onClick={() => console.log(rutasCompletas)}>Get Rutas Completas</button> */}
        {loading ? <CircularProgress sx={{marginTop:'20rem'}}/>
        
        :<div>
            {componenteMostrar === 0 ? <MejoresRutas setComponenteMostrar={setComponenteMostrar} listaRutas={rutas} setRutaMostrar={setRutaMostrar} datosGrafico={datosGrafico} />
            :<div>
              <div className='mapa-board'>
                {/* <button onClick={() => changeRuta(-1)}>anterior</button>
                <button onClick={() => changeRuta(+1)}>Siguiente</button> */}
                <div className='mapa'>
                    <Mapa pois={rutas[rutaMostrar].pois} path={rutas[rutaMostrar].path} poiActual={poiSeleccionado}></Mapa>
                </div>
                <div className='lista-rutas'>
                    <ListaRuta pois={rutas[rutaMostrar].pois} setPoiSeleccionado={setPoiSeleccionado} poiSeleccionado={poiSeleccionado}></ListaRuta>
                </div>
                
                 
              </div>
              <Button onClick={() => changeRuta(-1)} disabled={rutaMostrar === 0}   variant="contained" className='boton-landing' href='' sx={botones}> {"<-"} </Button>
              <Button onClick={() => setComponenteMostrar(0)}   variant="contained" className='boton-landing' href='' sx={botones}> {"Volver"} </Button>
              <Button onClick={() => changeRuta(1)}   disabled={rutaMostrar === 2}  variant="contained" className='boton-landing' href='' sx={botones}> {"->"} </Button>
              
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
