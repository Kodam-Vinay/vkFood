import { createContext } from "react";

const NavigationContext = createContext({
  activeId: "home",
  setActiveId: () => {},
});

NavigationContext.displayName = "NavigationContext";

export default NavigationContext;
