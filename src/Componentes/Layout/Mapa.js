import React from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {  useEffect } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';



export const Mapa = ({pois,path}) => {

    useEffect(() => {
        
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        
        L.Marker.prototype.options.icon = DefaultIcon
        // Crea el mapa y configura la vista inicial
        
        const map = L.map('map');
        // Calcula los límites geográficos de los POIs
        const bounds = L.latLngBounds(pois.map(poi => [poi.lat, poi.lng]));
    
        // Ajusta el zoom y la ubicación inicial del mapa en función de los límites
        map.fitBounds(bounds);

    
        // Agrega el mapa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        }).addTo(map);

        ///const poisToShow = pois.slice(0, 10);
    
        // Dibuja los marcadores de los POIs
        pois.forEach(poi => {
          const { lat, lng } = poi;
          const marker = L.marker([lat, lng]).addTo(map);
          marker.bindPopup(poi.nombre)
        });

        const updatedCoordinates = path.map(coordinate => [coordinate[1], coordinate[0]]);

       
        //pintar polilinea del path en morado
        const pathLine = L.polyline(updatedCoordinates, {color: 'blue'}).addTo(map);


    
        // Limpia el mapa cuando el componente se desmonte
        return () => {
          map.remove();
        };
      }, [pois]);

  return (
    <div id="map" style={{ height: '600px' }} />
  )
}
