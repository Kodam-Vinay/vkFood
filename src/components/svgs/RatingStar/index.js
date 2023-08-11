import * as React from "react";
const RatingStar = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx={10} cy={10.5} rx={10} ry={10.5} fill="#93C5FD" />
    <path
      d="M10 0L12.0206 7.25532H18.5595L13.2694 11.7394L15.2901 18.9947L10 14.5106L4.70993 18.9947L6.73056 11.7394L1.44049 7.25532H7.97937L10 0Z"
      fill="#FFCA28"
    />
  </svg>
);
export default RatingStar;
