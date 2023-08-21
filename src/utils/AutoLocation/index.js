const AutoLocation = () => {
  let autoGeoLocation = {
    lat: "",
    lon: "",
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("geolocation is not supported");
  }
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    autoGeoLocation = {
      lat: latitude,
      lon: longitude,
    };
    localStorage.setItem("autoLocation", JSON.stringify(autoGeoLocation));
  }
  function error() {
    console.log("Unable to get the position");
  }
};

export default AutoLocation;
