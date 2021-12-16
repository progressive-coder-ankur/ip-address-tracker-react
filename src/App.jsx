import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import icon from "./constants";
import "leaflet/dist/leaflet.css";
import Details from "./Details";

const myHeaders = new Headers();
const center = { lat: 51.505, lng: -0.09 };
const IpPattern =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function App() {
  const [ip, setIp] = useState(null);
  const [apiUrl, setApiUrl] = useState(
    // "https://geo.ipify.org/api/v2/country,city?apiKey=at_P9NFvlXwCLX2sgno1ZsdEC2E4BkxK&ipAddress="
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_P9NFvlXwCLX2sgno1ZsdEC2E4BkxK&ipAddress="
  );
  const [data, setData] = useState(null);

  const [newPosition, setNewPosition] = useState(null);

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
    fetchData();
  }, []);

  useEffect(() => {
    if (ip !== null && IpPattern.test(ip)) {
      const timer = setTimeout(() => {
        setApiUrl(apiUrl + ip);
      }, 500);
      fetchData();
      return () => clearTimeout(timer);
    } else if (ip === "" || data === null) {
      setApiUrl(apiUrl);
    }
  }, [ip]);

  function LocationMarker(location) {
    const [position, setPosition] = useState(null);

    const map = useMap();
    if (position === null) {
      function locate() {
        map.locate().on("locationfound", function (e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
          const radius = e.accuracy;
          const circle = L.circle(e.latlng, radius);
          circle.addTo(map);
        });
      }

      useEffect(() => {
        locate();
      }, [map]);
    } else {
      function locate() {
        setPosition(newPosition);
        map.flyTo(newPosition, map.getZoom());
        const radius = 200;
        const circle = L.circle(newPosition, radius);
        circle.addTo(map);
      }

      useEffect(() => {
        locate();
      }, [map]);
    }

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
        <form onSubmit={(e) => e.preventDefault} noValidate>
          <div className="input flex">
            <input
              type="text"
              className="input"
              minLength="7"
              maxLength="15"
              pattern="/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/"
              defaultValue={ip}
              onChange={(e) => {
                setIp(e.target.value);
              }}
              placeholder="Search for any IP address or domain"
            />
            <div className="icon" onClick={() => fetchData()}></div>
          </div>
        </form>
        <Details data={data} />
      </div>

      <div className="map">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom
          zoomControl={false}
          zoomAnimation={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker newPosition={newPosition} />
        </MapContainer>
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
