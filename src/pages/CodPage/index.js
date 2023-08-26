import CaptchaCode from "../../components/CaptchaCode";
const CodPage = () => {
  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80">
      <div className="flex flex-col md:flex-row justify-between items-center text-center">
        <h1 className="font-bold text-xl md:text-3xl">Cash On Delivery</h1>
        <p className="text-red-500 animate-pulse">
          *Data is not stored, don't enter your personal Details
        </p>
      </div>
      <CaptchaCode />
    </div>
  );
};
export default CodPage;
