import React, { useState, useEffect } from "react";
import L from "leaflet";
import icon from "./constants";
import { Marker, Popup, useMap } from "react-leaflet";

function LocationMarker(location) {
  const [position, setPosition] = useState(location);

  const map = useMap();
  if (position === null) {
    function location() {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }

    useEffect(() => {
      location();
    }, [map]);
  } else {
    function location() {
      setPosition(location);
      map.flyTo(location, map.getZoom());
      const radius = 200;
      const circle = L.circle(location, radius);
      circle.addTo(map);
    }

    useEffect(() => {
      location();
    }, [map]);
  }

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>You are here.</Popup>
    </Marker>
  );
}

export default LocationMarker;
