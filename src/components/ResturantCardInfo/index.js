import { useEffect, useState } from "react";
import useDeviceCheck from "../../utils/useDeviceCheck";
import { useParams } from "react-router-dom";
import {
  RESTAURANT_CARD_API_URL_DESKTOP,
  RESTAURANT_CARD_API_URL_MOBILE,
} from "../../config/Constants";
const constApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ResturantCardInfo = () => {
  const { id } = useParams();
  const [apiStaus, setApiStatus] = useState({
    status: constApiStatus.initial,
    errorMsg: "",
    cityName: "",
    data: [],
  });
  const isMobile = useDeviceCheck();
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    const apiUrl = isMobile
      ? RESTAURANT_CARD_API_URL_MOBILE + id
      : RESTAURANT_CARD_API_URL_DESKTOP + id;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  };

  return <div className="p-2 h-[85%] sm:px-3 md:px-10 relative">hello</div>;
};
export default ResturantCardInfo;
