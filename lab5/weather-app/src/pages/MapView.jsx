import { MapContainer, TileLayer, LayersControl, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Виправлення іконок (іноді вони зникають у React)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Компонент для оновлення центру карти
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const MapView = ({ lat, lon, apiKey }) => {
  // Перевірка наявності координат, щоб карта не "падала"
  if (!lat || !lon) return null;

  return (
    <div className="map-wrapper" style={{ height: '400px', width: '100%', marginTop: '20px', borderRadius: '15px', overflow: 'hidden' }}>
      <MapContainer 
        center={[lat, lon]} 
        zoom={8} 
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={[lat, lon]} />
        
        {/* Базовий шар карти */}
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution='&copy; OpenStreetMap contributors'
        />
        
        <LayersControl position="topright">
          <LayersControl.Overlay name="Опади">
            <TileLayer 
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`} 
            />
          </LayersControl.Overlay>
          
          <LayersControl.Overlay name="Хмари">
            <TileLayer 
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`} 
            />
          </LayersControl.Overlay>
        </LayersControl>

        <Marker position={[lat, lon]} />
      </MapContainer>
    </div>
  );
};

export default MapView;