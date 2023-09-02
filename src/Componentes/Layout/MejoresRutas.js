import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

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


export const MejoresRutas = ({setComponenteMostrar,listaRutas,setRutaMostrar,datosGrafico}) => {
    //TODO: Normalizar los datos de las rutas

  return (
    <div>
        <h1>HOALLLLL</h1>
        <button onClick={() => console.log(datosGrafico) }>datas</button>
        <div className='winner-route-board'>
            {listaRutas.map((ruta,index) => {
                return(
                <Card sx={{ maxWidth: 500,width:450 }} key={index}>
                    <CardActionArea onClick={() => {setComponenteMostrar(1);setRutaMostrar(index)}}>
                        <CardContent>
                            <Radar data={{
                                labels: ['Lugares visitados', 'Distancia Recorrida', 'Monumentos historicos', 'Areas Naturales', 'Coste'],
                                datasets: [
                                  {
                                    label: 'Ruta' + (index + 1),
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'rgba(75,192,192,1)',
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
                              }
                          }}/>
                            <h2>{ruta.coeficienteRS}</h2>
                            <p>{ruta.distancia}</p>
                        </CardContent>
                    </CardActionArea>
                </Card>
                );
            })}
        </div>
    </div>
  )
}
