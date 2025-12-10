import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/Offer';

interface MapProps {
  offers: Offer[];
}

export const Map: React.FC<MapProps> = ({ offers }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    let centerLat = 52.3909553943508;
    let centerLng = 4.85309666406198;

    if (offers.length > 0 && offers[0].latitude && offers[0].longitude) {
      centerLat = offers[0].latitude;
      centerLng = offers[0].longitude;
    }
    const map = L.map('cities__map').setView([centerLat, centerLng], 12);

    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    offers.forEach((offer) => {
      if (offer.latitude && offer.longitude) {
        const marker = L.marker([offer.latitude, offer.longitude]).addTo(map);
        marker.bindPopup(`
          <b>${offer.title}</b><br />
          <small>${offer.description || 'No description'}</small>
        `);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [offers]);

  return <div id="cities__map" className="cities__map" />;
};

export default Map;
