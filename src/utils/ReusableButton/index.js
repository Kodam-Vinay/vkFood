import { forwardRef } from "react";

const ReusableButton = forwardRef((props, ref) => {
  const { className, value, onClick, type, disabled } = props;
  return (
    <button
      className={`${className} border px-2 py-1 rounded-md pb-2 outline-none cursor-pointer`}
      onClick={onClick}
      type={type ? type : "button"}
      ref={ref}
      disabled={disabled}
    >
      {value}
    </button>
  );
});
export default ReusableButton;
