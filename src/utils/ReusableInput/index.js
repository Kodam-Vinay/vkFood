const ReusableInput = (props) => {
  const { type, className, inputId, onChange, placeholder, onKeyDown, value } =
    props;
  return (
    <input
      type={type}
      id={inputId}
      className={`p-2 rounded-md w-[250px] outline-none ${className}`}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      value={value}
    />
  );
};
export default ReusableInput;
