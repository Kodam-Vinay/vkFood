import "./style.css";
import { useState } from "react";
import AddItem from "../AddItem";

const MenuCardItem = (props) => {
  const { menuDetails } = props;
  const { id, name, imageId, price, defaultPrice } = menuDetails;
  const [vegClassifier] = useState(
    menuDetails?.itemAttribute?.vegClassifier
      ? menuDetails?.itemAttribute?.vegClassifier
      : "VEG"
  );

  return (
    <AddItem
      price={price}
      vegClassifier={vegClassifier}
      name={name}
      defaultPrice={defaultPrice}
      imageId={imageId}
      id={id}
      menuDetails={menuDetails}
    />
  );
};
export default MenuCardItem;
