import { useEffect, useState } from "react";
import useDeviceCheck from "../../utils/useDeviceCheck";
import { useParams } from "react-router-dom";
import {
  RESTAURANT_CARD_API_URL_DESKTOP,
  RESTAURANT_CARD_API_URL_MOBILE,
} from "../../config/Constants";
import Shimmer from "../Shimmer";
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
    setApiStatus(constApiStatus.inProgress);
    const apiUrl = isMobile
      ? RESTAURANT_CARD_API_URL_MOBILE + id
      : RESTAURANT_CARD_API_URL_DESKTOP + id;
    const response = await fetch(apiUrl);
    if (response.ok) {
    } else {
    }
  };

  const SuccessView = () => <div>success</div>;

  const FailureView = () => <div>Failure</div>;

  const RenderResults = () => {
    switch (apiStaus.status) {
      case constApiStatus.inProgress:
        return <Shimmer />;
      case constApiStatus.success:
        return <SuccessView />;
      case constApiStatus.failure:
        return <FailureView />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2 h-[85%] sm:px-3 md:px-10 relative">
      {RenderResults()}
    </div>
  );
};
export default ResturantCardInfo;
