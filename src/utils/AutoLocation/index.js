// import { useEffect, useState } from "react";

// const AutoLocation = () => {
//   const [autoGeoLocation, setAutoGeoLocation] = useState({
//     lat: "",
//     lon: "",
//   });

//   useEffect(() => {
//     {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(success, error);
//       } else {
//         console.log("geolocation is not supported");
//       }
//       function success(position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         setAutoGeoLocation((prev) => ({
//           ...prev,
//           lat: latitude,
//           lon: longitude,
//         }));
//       }
//     }
//     function error() {
//       console.log("Unable to get the position");
//     }
//   }, []);
//   return autoGeoLocation;
// };

// export default AutoLocation;

import { useState, useEffect } from "react";
export const AutoLocation = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    let watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...position, error };
};
