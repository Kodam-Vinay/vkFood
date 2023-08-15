import { useEffect } from "react";

const useNavigationLinkSessionStorage = (activeId) => {
  useEffect(() => {
    sessionStorage.setItem("activeId", JSON.stringify(activeId));
  });
};
export default useNavigationLinkSessionStorage;
