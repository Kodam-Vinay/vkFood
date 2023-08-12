const FilterRestaurantMenu = (menuInfo, searchMenu) => {
  let result = [];
  console.log(menuInfo);
  if (searchMenu === undefined) {
  } else {
    result = menuInfo.filter((each) =>
      each?.card?.name?.infotoLowerCase().includes(searchMenu.toLowerCase())
    );
  }
  return result;
};
export default FilterRestaurantMenu;
