import { v4 as uuidV4 } from "uuid";

const Shimmer = () => {
  return (
    <div className="main-shimmer p-0 flex flex-col items-center justify-center sm:flex-row sm:flex-wrap  space-y-3">
      <div></div>
      {Array(20)
        .fill("")
        .map((each) => (
          <div
            className="shimmer w-full sm:h-[370px] sm:max-w-[260px] flex sm:flex-col border shadow-md rounded-md p-2 sm:mr-2 md:mr-5"
            key={uuidV4()}
          >
            <div className="w-24 h-24 sm:w-full xs:h-44 xs:w-48 bg-gray-200 rounded-md shadow-sm sm:mb-2 flex-shrink-0 mr-5 sm:mr-0"></div>
            <div className="flex flex-col m-0 space-y-2 w-full">
              <div className="w-[90%] h-5 rounded-md bg-gray-200"></div>
              <div className="w-24 h-8 rounded-md bg-gray-200"></div>
              <div className="w-[90%] h-8 rounded-md bg-gray-200"></div>
              <div className="w-[80%] h-4 rounded-md bg-gray-200"></div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Shimmer;
