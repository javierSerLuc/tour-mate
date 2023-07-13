import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-ant-path';
import 'leaflet.animatedmarker/src/AnimatedMarker';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import redIcon from '../../Resources/markerRed.png';
import blueIcon from '../../Resources/markerBlue.png';


export const Mapa = ({ pois, path, poiActual }) => {
  const [running, setRunning] = useState(false);
  const mapRef = useRef(null);
  const animatedMarkerRef = useRef(null);
  const markersRef = useRef([]);

  //crear un marker como el defaultIcon pero en rojo
  


  useEffect(() => {
    const map = L.map(mapRef.current).fitBounds(
      pois.map(poi => [poi.lat, poi.lng])
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    const defaultIcon = L.icon({
      iconUrl: blueIcon ,
      shadowUrl: iconShadow,
      iconSize: [35, 37],
    });
    L.Marker.prototype.options.icon = defaultIcon;
    markersRef.current = L.layerGroup().addTo(map);

    pois.forEach(poi => {
      const { lat, lng, nombre } = poi;
      const marker = L.marker([lat, lng]).addTo(markersRef.current);
      marker.bindPopup(nombre);
    });

    const updatedCoordinates = path.map(coordinate => [
      coordinate[1],
      coordinate[0],
    ]);

    const antPath = L.polyline.antPath(updatedCoordinates, {
      delay: 1000,
      dashArray: [10, 20],
      weight: 5,
      color: 'blue',
      pulseColor: 'white',
      paused: false,
    }).addTo(map);

    animatedMarkerRef.current = L.animatedMarker(updatedCoordinates, {
      autoStart: false,
      interval: 40,
      icon: L.icon({
        iconUrl:
          'https://i.pinimg.com/originals/42/a7/6d/42a76d77c74d286d8474fa7bf54e035b.png',
        iconSize: [70, 70],
      }),
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [pois, path]);

  useEffect(() => {
    //limpiar mla layer de markers y volverla a crearla poniendo el marker con indice === poiActual de rojo
    console.log(poiActual);
    markersRef.current.clearLayers();
    pois.forEach((poi, index) => {
      const { lat, lng, nombre } = poi;
      const marker = L.marker([lat, lng]).addTo(markersRef.current);
      if (index === poiActual) {
        marker.setIcon(
          L.icon({
            iconUrl: redIcon,
            shadowUrl: iconShadow,
            iconSize: [35, 37],

          })
        );
      }
      marker.bindPopup(nombre);
    }
    );
  }, [poiActual]);

  const toggleAnimation = () => {
    if (running) {
      animatedMarkerRef.current.stop();
      setRunning(false);
    } else {
      animatedMarkerRef.current.start();
      setRunning(true);
    }
  };

  return (
    <div>
      <button onClick={toggleAnimation}>Toggle Animation</button>
      <div ref={mapRef} style={{ height: '500px' }} />
    </div>
  );
};





