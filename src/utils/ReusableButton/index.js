import { forwardRef } from "react";

const ReusableButton = forwardRef((props, ref) => {
  const { className, value, onClick, type } = props;
  return (
    <button
      className={`${className} border px-2 py-1 rounded-md pb-2 outline-none`}
      onClick={onClick}
      type={type}
      ref={ref}
    >
      {value}
    </button>
  );
});
export default ReusableButton;
