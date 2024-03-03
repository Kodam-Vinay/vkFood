import { CLOUDINARY_IMG_URL } from "../../config/Constants";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import ReusableButton from "../../utils/ReusableButton";
import MenuCardItem from "../MenuCardItem";
import RestroCardUpSection from "../RestroCardUpSection";

const index = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  city,
  costForTwoMessage,
  slaString,
  avgRating,
  totalRatingsString,
  filterData,
  cartItemsList,
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className="h-full w-full">
      <RestroCardUpSection
        cloudinaryImageId={cloudinaryImageId}
        name={name}
        cuisines={cuisines}
        areaName={areaName}
        city={city}
        costForTwoMessage={costForTwoMessage}
        slaString={slaString}
        avgRating={avgRating}
        totalRatingsString={totalRatingsString}
      />
      <p className="font-bold text-sm xs:text-base">
        Free Delivery On Order Above Rs.299
      </p>

      <hr className="border-dotted my-2 border-black" />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      {cartItemsList?.length > 0 ? (
        <Link to="/cart">
          <div className="flex flex-col items-center">
            <ReusableButton
              type="button"
              value={
                <p>
                  cart{" "}
                  <sup className="text-green-600">{cartItemsList?.length}</sup>
                </p>
              }
              className="bg-red-100 px-4 font-bold hover:bg-red-700 hover:text-white flex fixed bottom-10"
            />
          </div>
        </Link>
      ) : null}
      {filterData?.length > 0 ? (
        <ul className="menu-restaurant h-[40vh] md:h-[45vh] overflow-y-auto">
          {filterData.map((eachItem) => (
            <MenuCardItem
              key={eachItem?.card?.info?.id}
              menuDetails={eachItem?.card?.info}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col space-y-1 items-center  h-[40vh]">
          <img
            src={CLOUDINARY_IMG_URL + "no-food"}
            alt="no-food"
            className="w-48"
          />
          <h1 className="font-bold text-xl">No Items Found .🍔</h1>
        </div>
      )}
    </div>
  );
};

export default index;
