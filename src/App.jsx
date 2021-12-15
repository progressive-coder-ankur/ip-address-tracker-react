import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import icon from "./constants";
import "leaflet/dist/leaflet.css";
import Details from "./Details";

const defultCenter = [0, 0];
const defaultZoom = 13;
const myHeaders = new Headers();

function App() {
  const [ip, setIp] = useState("");
  const [apiUrl, setApiUrl] = useState(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_P9NFvlXwCLX2sgno1ZsdEC2E4BkxK&ipAddress="
  );
  const [data, setData] = useState(null);
  // const [position, setPosition] = useState([]);

  const fetchData = () => {
    return fetch(apiUrl, {
      method: "GET",
      mode: "cors",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((Data) => {
        setData(Data);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setApiUrl(apiUrl + ip);
    }, 1000);
    fetchData();
    return () => clearTimeout(timer);
  }, [ip]);

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    // const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        // setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here.</Popup>
      </Marker>
    );
  }

  return (
    <div className="App grid">
      <div className="hero"></div>
      <div className="middle">
        <div className="header">
          <h1 className="title">IP Address Tracker</h1>
        </div>
        <div className="input flex">
          <input
            type="text"
            className="input"
            minLength="7"
            maxLength="13"
            pattern="/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/"
            defaultValue={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Search for any IP address or domain"
          />
          <div className="icon" onClick={() => fetchData()}></div>
        </div>
        <Details data={data} />
      </div>

      <div className="map">
        <div className="map__container">
          <MapContainer
            center={defultCenter}
            zoom={defaultZoom}
            maxZoom={16}
            scrollWheelZoom
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>

      {/* <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div> */}
    </div>
  );
}

export default App;
