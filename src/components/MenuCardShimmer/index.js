import { v4 as uuidV4 } from "uuid";

const MenuCardShimmer = () => {
  return (
    <div className="p-0 flex flex-col justify-center w-full">
      <div className="h-full w-full">
        <div className="h-full w-full flex flex-col">
          <div className="h-full w-full mb-3 flex">
            <div className="bg-gray-200 flex-shrink-0 w-24 h-24 sm:w-40 sm:h-40 rounded-md shadow-md shadow-black mr-4"></div>
            <div className="space-y-1 w-72">
              <div className="bg-gray-200 h-8"></div>
              <div className="bg-gray-200 h-3"></div>
              <div className="bg-gray-200 h-3"></div>
            </div>
          </div>
          <div className="flex items-center sm:-mt-20 sm:ml-44">
            <div className="bg-gray-200 flex flex-col items-center h-20 w-32 sm:w-44">
              <div className="bg-gray-200 flex items-center mt-2">
                <div className="bg-gray-200 h-4 w-4 xs:h-4 xs:w-4 sm:h-6 sm:w-6" />
                <div className="bg-gray-200 h-1"></div>
              </div>
            </div>
            <div className="bg-gray-200 rating-container border h-16 w-28 xs:h-20 xs:w-32 rounded-md p-1 space-y-1 sm:space-y-2 ml-2 xs:ml-8">
              <div className="bg-gray-200 flex items-center">
                <div className="bg-gray-200 h-4 w-4 xs:h-4 xs:w-4 sm:h-6 sm:w-6" />
                <div className="bg-gray-200 h-1 ml-2"></div>
              </div>
              <div className="bg-gray-200 h-1"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 w-full p-2 sm:max-w-40 flex items-center sm:ml-2 mt-6"></div>
      <hr className="border-dotted my-5 border-black" />
      <div className="bg-gray-200 mb-4 flex items-center p-2 w-20 ml-2"></div>
      {Array(5)
        .fill("")
        .map((each) => (
          <div className="border-b-2 p-2 flex justify-between" key={uuidV4()}>
            <div className="w-2/3 space-y-1">
              <div className="bg-gray-200 h-5 w-5 rounded-md"></div>
              <div className="bg-gray-200 font-bold text-sm h-2 w-20"></div>
              <div className="bg-gray-200 flex items-center w-20">
                <div className="bg-gray-200 rounded-full h-4 w-4"></div>
                <div className="bg-gray-200 w-20"></div>
              </div>
            </div>
            <div className="image-and-add-button-container flex flex-col">
              <div className="bg-gray-200 h-28 rounded-md w-36 sm:h-36 sm:w-52 shadow-sm shadow-black"></div>
              <div className="bg-gray-200 h-10 w-16 hover:text-white self-center mt-2 rounded-md"></div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default MenuCardShimmer;
