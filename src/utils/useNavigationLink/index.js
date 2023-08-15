import { useEffect } from "react";

const useNavigationLink = (activeId) => {
  useEffect(() => {
    sessionStorage.setItem("activeId", JSON.stringify(activeId));
  });
};
export default useNavigationLink;
