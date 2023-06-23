import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-ant-path';
import 'leaflet.animatedmarker/src/AnimatedMarker';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export const Mapa = ({ pois, path }) => {
  const [running, setRunning] = useState(false);
  const mapRef = useRef(null);
  const animatedMarkerRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).fitBounds(
      pois.map(poi => [poi.lat, poi.lng])
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    const defaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
    L.Marker.prototype.options.icon = defaultIcon;

    pois.forEach(poi => {
      const { lat, lng, nombre } = poi;
      const marker = L.marker([lat, lng]).addTo(map);
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
          'https://cdn-icons-png.flaticon.com/512/6147/6147668.png',
        iconSize: [30, 30],
      }),
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [pois, path]);

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
      <div ref={mapRef} style={{ height: '600px' }} />
    </div>
  );
};





