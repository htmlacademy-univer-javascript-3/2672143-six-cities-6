import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/Offer';

interface MapProps {
  offers: Offer[];
  hoveredOfferId?: string | null;
}
export const Map: React.FC<MapProps> = ({ offers, hoveredOfferId }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const defaultIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 39],
    iconAnchor: [15, 39],
    popupAnchor: [0, -39],
  });

  const activeIcon = L.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [30, 39],
    iconAnchor: [15, 39],
    popupAnchor: [0, -39],
  });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    let centerLat = 48.85661;
    let centerLng = 2.351499;
    let zoom = 1;

    if (offers.length > 0 && offers[0].city && offers[0].city.location) {
      centerLat = offers[0].city.location.latitude;
      centerLng = offers[0].city.location.longitude;
      zoom = offers[0].city.location.zoom;
    }

    const map = L.map('cities__map').setView([centerLat, centerLng], zoom);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    markersRef.current = {};

    offers.forEach((offer) => {
      if (
        offer.location &&
        offer.location.latitude &&
        offer.location.longitude
      ) {
        const marker = L.marker(
          [offer.location.latitude, offer.location.longitude],
          {
            icon: defaultIcon,
          }
        ).addTo(map);

        marker.bindPopup(`
          <b>${offer.title}</b><br />
          <small>${offer.type}</small><br />
          <strong>&euro;${offer.price}</strong> night
        `);

        markersRef.current[offer.id] = marker;
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [offers]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([offerId, marker]) => {
      if (offerId === hoveredOfferId) {
        marker.setIcon(activeIcon);
      } else {
        marker.setIcon(defaultIcon);
      }
    });
  }, [hoveredOfferId]);

  return <div id="cities__map" className="cities__map" />;
};

export default Map;
