import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ position, setPosition }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        // إنشاء الخريطة مرة واحدة فقط عند تحميل المكون
        mapRef.current = L.map('map').setView(position, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        // إعداد العلامة وجعلها قابلة للسحب
        markerRef.current = L.marker(position, { draggable: true }).addTo(mapRef.current);

        // تحديث الإحداثيات عند سحب العلامة
        markerRef.current.on('dragend', () => {
            const { lat, lng } = markerRef.current.getLatLng();
            setPosition([lat, lng]);
        });

        // تحديث الإحداثيات عند النقر على الخريطة
        mapRef.current.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            markerRef.current.setLatLng([lat, lng]);
        });

        return () => {
            mapRef.current.remove();
        };
    }, [setPosition, position]);

    useEffect(() => {
        if (mapRef.current && markerRef.current) {
            // تحديث العرض وموقع العلامة عند تغيير الموقع
            mapRef.current.setView(position, mapRef.current.getZoom());
            markerRef.current.setLatLng(position);
        }
    }, [position]);

    return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
