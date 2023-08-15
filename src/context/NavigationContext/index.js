import { createContext } from "react";

const NavigationContext = createContext({
  activeId: "home",
  setActiveId: () => {},
  navigationLinks: [],
});
export default NavigationContext;
