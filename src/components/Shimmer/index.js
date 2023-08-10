import { v4 as uuidV4 } from "uuid";

const Shimmer = () => {
  return (
    <div className="mt-10 main-shimmer space-y-3 w-full">
      <div></div>
      {Array(20)
        .fill("")
        .map((each) => (
          <div className="shimmer h-40 border" key={uuidV4()}></div>
        ))}
    </div>
  );
};
export default Shimmer;
