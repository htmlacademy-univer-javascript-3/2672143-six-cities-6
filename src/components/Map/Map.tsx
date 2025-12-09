import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/Offer';

interface MapProps {
  offers: Offer[];
}

export const Map: React.FC<MapProps> = ({ offers }) => {
  useEffect(() => {
    const map = L.map('cities__map').setView(
      [52.3909553943508, 4.85309666406198],
      12
    );

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
      map.remove();
    };
  }, [offers]);

  return <div id="cities__map" className="cities__map" />;
};

export default Map;
