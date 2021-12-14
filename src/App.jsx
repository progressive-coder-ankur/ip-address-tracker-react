import { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import icon from "./constants";
import "./App.css";
import "leaflet/dist/leaflet.css";

const defultCenter = [0, 0];
const defaultZoom = 13;

function App() {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="App">
      <div className="hero">
        <div className="middle">
          <div className="header">
            <h1 className="title">IP Address Tracker</h1>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Search for any IP address or domain"
            />
          </div>
          <div className="details">
            <div className="ip">
              <h3 className="heading">IP Address</h3>
              <p>{"Some Data "}</p>
            </div>
            <div className="location">
              <h3 className="heading">Location</h3>
              <p>{"Some Data "}</p>
            </div>
            <div className="timezone">
              <h3 className="heading">Timezone</h3>
              <p>{"Some Data "}</p>
            </div>
            <div className="ISP">
              <h3 className="heading">ISP</h3>
              <p>{"Some Data "}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="map">
        <div className="map__container">
          <MapContainer
            center={defultCenter}
            zoom={defaultZoom}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>

      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </div>
  );
}

export default App;
