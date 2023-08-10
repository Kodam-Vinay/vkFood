const EachRestaurantCard = (props) => {
  const { restaurantList } = props;
  const { name } = restaurantList;
  return (
    <li>
      <h1>{name}</h1>
    </li>
  );
};
export default EachRestaurantCard;
