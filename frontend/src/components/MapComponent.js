import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ position, setPosition }) => {
    useEffect(() => {
        const map = L.map('map').setView(position, 13); // تحديد الإحداثيات الافتراضية

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const marker = L.marker(position).addTo(map); // إضافة علامة للموقع

        // حدث النقر لتحديث الموقع
        map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]); // تحديث الإحداثيات
            marker.setLatLng([lat, lng]); // تحديث موقع العلامة
        });

        return () => {
            map.remove(); // تنظيف الخريطة عند تفكيك المكون
        };
    }, [position, setPosition]);

    return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
