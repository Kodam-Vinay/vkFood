import { useEffect, useState } from "react";

const RandomNumber = () => {
  const [randomNumber, setRandomNum] = useState();
  useEffect(() => {
    setRandomNum(Math.round(Math.random() * 999999));
  }, []);
  return JSON.stringify(randomNumber);
};
export default RandomNumber;
