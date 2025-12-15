import React, { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/Offer';

type MapProps = {
  offers: Offer[];
  hoveredOfferId?: string | null;
};

const ICONS = {
  default: L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 39],
    iconAnchor: [15, 39],
    popupAnchor: [0, -39],
  }),
  active: L.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [30, 39],
    iconAnchor: [15, 39],
    popupAnchor: [0, -39],
  }),
};

export const Map: React.FC<MapProps> = (props: MapProps) => {
  const { offers, hoveredOfferId } = props;
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const mapCenter = useMemo(() => {
    if (offers.length > 0 && offers[0].city?.location) {
      return {
        lat: offers[0].city.location.latitude,
        lng: offers[0].city.location.longitude,
        zoom: offers[0].city.location.zoom,
      };
    }
    return { lat: 48.85661, lng: 2.351499, zoom: 1 };
  }, [offers]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map('cities__map').setView(
      [mapCenter.lat, mapCenter.lng],
      mapCenter.zoom
    );
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    markersRef.current = {};

    offers.forEach((offer) => {
      if (offer.location?.latitude && offer.location?.longitude) {
        const marker = L.marker(
          [offer.location.latitude, offer.location.longitude],
          {
            icon: ICONS.default,
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
  }, [mapCenter, offers]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([offerId, marker]) => {
      marker.setIcon(offerId === hoveredOfferId ? ICONS.active : ICONS.default);
    });
  }, [hoveredOfferId]);

  return <div id="cities__map" className="cities__map" />;
};

export default Map;
