'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

export default function MapComponent() {
    // Fix for default marker icons not loading correctly in Next.js + Leaflet
    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    return (
        <div className="w-full h-full min-h-[500px]">
            <MapContainer
                center={[37.7749, -122.4194]} // Default center to SFO roughly
                zoom={3}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* SFO Marker */}
                <Marker position={[37.6213, -122.3790]}>
                    <Popup>
                        <strong>San Francisco</strong> <br /> SFO Airport
                    </Popup>
                </Marker>
                {/* Tokyo Marker */}
                <Marker position={[35.5494, 139.7798]}>
                    <Popup>
                        <strong>Tokyo</strong> <br /> HND Airport
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
