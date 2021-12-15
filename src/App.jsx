import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import icon from "./constants";
import "leaflet/dist/leaflet.css";
import Details from "./Details";

const defultCenter = [0, 0];
const defaultZoom = 13;
let fetchedData;
function App() {
  const [ip, setIp] = useState("");
  const [apiUrl, setApiUrl] = useState(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_CGJTd6vc7ck6dpfEafT0tqrASyb0O"
  );
  const [data, setData] = useState(null);

  const getIP = async (Url) => {
    await fetch(Url, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        return (fetchedData = result);
      });
    setData({ ...fetchedData });
  };

  useEffect(() => {
    Promise.all(getIP(apiUrl));
  }, []);

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
            onChange={(e) => setIp(e.target.value)}
            placeholder="Search for any IP address or domain"
          />
          <div
            className="icon"
            onClick={() => setApiUrl(apiUrl + "&ipAddress=" + ip)}
          ></div>
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
