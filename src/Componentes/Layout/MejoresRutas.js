import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import '../CSS/mejoresRutas.css';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

let botones = {width: '14rem',borderRadius: 35,bgcolor: '#5563ad',margin:4,':hover': {
  bgcolor: '#F8A41F', // theme.palette.primary.main
  color: 'white',
  
}};



const estiloMedallaOro = {
  backgroundColor: 'rgba(255, 215, 0, 0.4)', // Color dorado
  borderColor: 'rgba(255, 215, 0, 1)', // Color dorado
};
const estiloMedallaPlata = {
  backgroundColor: 'rgba(192, 192, 192, 0.4)', // Color plateado
  borderColor: 'rgba(192, 192, 192, 1)', // Color plateado
};
const estiloMedallaBronce = {
  backgroundColor: 'rgba(205, 127, 50, 0.4)', // Color bronce
  borderColor: 'rgba(205, 127, 50, 1)', // Color bronce
};

export const MejoresRutas = ({setComponenteMostrar,listaRutas,setRutaMostrar,datosGrafico}) => {
    //TODO: Normalizar los datos de las rutas
    const navigate = useNavigate();

  return (
    <div>
        
        <div className='winner-route-board'>
            {listaRutas.map((ruta,index) => {
                return(
                  
                <Card sx={{ maxWidth: 500,width:350,border: '3px solid #EFEEEE' }} key={index}>
                    <CardActionArea sx={{height:'100%'}} onClick={() => {setComponenteMostrar(1);setRutaMostrar(index)} }>
                        <CardContent>
                          <h2 className='montserrat700' style={{'marginBottom':0}}>Ruta #{index + 1}</h2>
                          <ul className='lista-info-mejores roboto'>
                              <li>Lugares Visitados: {ruta.pois.length}</li>
                              <li>Coste: {ruta.coste}€</li>
                              <li>Distancia Recorrida: {(ruta.distancia / 1000).toFixed(3).replace('.', ',')} km</li>

                              <li>Monumentos Historicos: {Math.ceil(ruta.puntosMonumento)}</li>
                              <li>Areas Naturales: {Math.ceil(ruta.puntosAreasNaturales)}</li>

                            </ul>
                            <Radar data={{
                                labels: ['Lugares visitados', 'Distancia Recorrida', 'Monumentos historicos', 'Areas Naturales', 'Coste'],
                                datasets: [
                                  {
                                    //label: 'Ruta' + (index + 1),
                                    //backgroundColor: 'rgba(75,192,192,0.4)',
                                    //borderColor: 'rgba(75,192,192,1)',
                                    //backgroundColor:'rgba(255, 215, 0, 0.4)',
                                    backgroundColor: index === 0 ? estiloMedallaOro.backgroundColor : index === 1 ? estiloMedallaPlata.backgroundColor : estiloMedallaBronce.backgroundColor,
                                    borderColor: index === 0 ? estiloMedallaOro.borderColor : index === 1 ? estiloMedallaPlata.borderColor : estiloMedallaBronce.borderColor,
                                    //data: [5,5,5,5,5],
                                    data: datosGrafico[index]
                                    //data:[datosGrafico[index].visitas, datosGrafico[index].distancia, datosGrafico[index].monumentos, datosGrafico[index].naturaleza, datosGrafico[index].coste]
                                  },
                                ],
                            }} options={{
                              scales: {
                                  r: {
                                      angleLines: {
                                          display: false
                                      },
                                      suggestedMin: 0.7,
                                      suggestedMax: 1,
                                      ticks: {
                                        stepSize: 0.1
                                    }

                                  }
                              },
                              plugins: {
                                legend: {
                                    display: false,
                                    
                                }
                            }
                          }}/>
                          <p className='resumen-ruta'>
                            Visita lugares como {ruta.pois[3].nombre}, {ruta.pois[2].nombre} y {ruta.pois[6].nombre} entre otros
                          </p>
                            
                        </CardContent>
                    </CardActionArea>
                </Card>
                
                );
            })}
            
                
        </div>
        <Button onClick={() => {sessionStorage.clear();navigate('/Inicio')}}   variant="contained" className='boton-landing' href='' sx={botones}>Cambia los criterios</Button>
                <Button onClick={() => window.location.reload()}   variant="contained" className='boton-landing' href='' sx={botones}>Generar mas Rutas</Button>
    </div>
  )
}
