import { ReactElement, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


export default function Map(): ReactElement {

    const [coordinate , setCoordinate] = useState<[number, number]>([0, 0]);
    const [center, setCenter] = useState<[number, number]>([-33.4528512, -70.7002368]);

    /**
     * Función que genera una ubicación aleatoria en Santiago de Chile
     * @returns arreglo con latitud y longitud aleatorias
     */
    function getRandomLocationInSantiago() : [number, number] {
        // Rango aproximado de latitud y longitud para la Región Metropolitana de Santiago
        const latMin = -33.65;
        const latMax = -33.25;
        const lonMin = -70.95;
        const lonMax = -70.45;
    
        // Generar latitud y longitud aleatorias dentro del rango
        const latitude = Math.random() * (latMax - latMin) + latMin;
        const longitude = Math.random() * (lonMax - lonMin) + lonMin;
    
        return [latitude, longitude];
    }

    useEffect(() => {
        const [latitude, longitude] = getRandomLocationInSantiago();
        setCoordinate([latitude, longitude]);
    }, []);

    return (
        <MapContainer center={center} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinate}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}