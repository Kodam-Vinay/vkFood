const EachRestaurantCard = (props) => {
  const { restaurantList } = props;
  const { name } = restaurantList;
  return (
    <li className="h-52 w-36">
      <h1>{name}</h1>
    </li>
  );
};
export default EachRestaurantCard;
