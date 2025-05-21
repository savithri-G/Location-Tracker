import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './App.css';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from './Mappiee.json';
import Lottie from "lottie-react";

<Lottie animationData={animationData} loop={true} />


// // Fix default icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
// });

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null; // This component doesn't render anything visible
}

function App() {
  const [position, setPosition] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setShowAnimation(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="app-container">
      <h1>📍 Location Tracker</h1>
      <button onClick={handleLocate}>Locate Me</button>

      {showAnimation && (
        <div className="animation-container">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: '450px', width: '450px', margin: 'auto' }}
          />
        </div>
      )}

      {position && (
        <div className="coordinates">
          <p>
            <strong>Latitude:</strong> {position[0]}
            <br />
            <strong>Longitude:</strong> {position[1]}
          </p>

          <MapContainer center={position} zoom={13} className="leaflet-container">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">Savithri</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={redIcon}>
              <Popup>You are here!</Popup>
            </Marker>
            <LocationMarker setPosition={setPosition} />
          </MapContainer>
          
        </div>
      )}
    </div>
  );
}

export default App;
