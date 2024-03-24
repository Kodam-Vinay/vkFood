import { FaSearch } from "react-icons/fa";
import ReusableButton from "../../utils/ReusableButton";
import ReusableInput from "../../utils/ReusableInput";
import { BiCurrentLocation } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { ProgressBar } from "react-loader-spinner";

const ExploreMainPage = ({
  searchClicked,
  isSearchEmpty,
  setSearchClicked,
  setCityName,
  onClickSearch,
  RenderResults,
  onClickAutoLocation,
  cityName,
  apiStatus,
  constApiStatus,
}) => {
  return (
    <div className="p-2 h-[90%] sm:px-3 md:px-10 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center overflow-hidden h-[14%] md:h-[10%]">
        <div className="flex">
          <div
            className={`search-city flex items-center border border-gray-400 w-fit self-center sm:self-start rounded-md ${
              searchClicked && isSearchEmpty ? "border-red-600 border-2" : null
            }`}
          >
            <ReusableInput
              type="search"
              className="p-1 pb-2 w-full max-w-[250px] border-0"
              placeholder="Enter A City Name"
              onChange={(e) => {
                setSearchClicked(false);
                setCityName(e.target.value);
              }}
              onKeyDown={(e) => (e.key === "Enter" ? onClickSearch() : null)}
              value={cityName}
            />
            <ReusableButton
              value={<FaSearch />}
              className={`h-10 border flex flex-col items-center justify-center border-gray-400 border-r-0 border-b-0 border-t-0 hover:bg-red-700 hover:text-white ${
                searchClicked && isSearchEmpty
                  ? "border-red-600 border-2"
                  : null
              }`}
              onClick={onClickSearch}
            />
          </div>
          <ReusableButton
            value={
              <>
                <span className="hidden md:block md:mr-2 font-bold">
                  Get Current Location
                </span>
                <BiCurrentLocation />
              </>
            }
            className={`h-10 border flex flex-row items-center justify-center ml-2 hover:bg-red-700 hover:text-white`}
            onClick={onClickAutoLocation}
          />
        </div>
        {apiStatus?.status === constApiStatus?.success ? (
          <p className="text-center sm:m-auto flex items-center justify-center my-2 font-bold capitalize">
            <MdLocationPin />
            {apiStatus?.cityName}
          </p>
        ) : apiStatus?.status === constApiStatus?.inProgress ? (
          <p className="text-center sm:mx-auto flex items-center justify-center">
            <ProgressBar
              height="40"
              width="150"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          </p>
        ) : null}
      </div>
      <div className="main-body w-full flex flex-col mt-4 overflow-y-auto h-full pb-20">
        <div className="mb-4">{RenderResults()}</div>
      </div>
    </div>
  );
};

export default ExploreMainPage;
