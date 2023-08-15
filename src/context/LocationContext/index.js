import { createContext } from "react";

const LocationContext = createContext({
  locationPoints: {
    lat: "",
    lon: "",
  },
  setLocationPoints: () => {},
});

LocationContext.displayName = "LocationContext";
export default LocationContext;
