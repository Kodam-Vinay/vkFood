import { v4 as uuidV4 } from "uuid";

const Shimmer = () => {
  return (
    <div className="mt-10 main-shimmer space-y-3 w-full p-0 flex flex-col sm:flex-row sm:flex-wrap">
      <div></div>
      {Array(20)
        .fill("")
        .map((each) => (
          <div
            className="shimmer h-56 w-full max-w-[260px] border shadow-md rounded-md p-2 sm:mr-2 md:mr-5"
            key={uuidV4()}
          >
            <div className="w-full h-40 bg-gray-200"></div>
          </div>
        ))}
    </div>
  );
};
export default Shimmer;
