import * as React from "react";
const FoodTypeIcon = (props) => (
  <svg
    width={20}
    height={19}
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={20} height={19} rx={4} fill={props.bg} />
    <circle cx={10} cy={9} r={6} fill={props.circle} />
  </svg>
);
export default FoodTypeIcon;
