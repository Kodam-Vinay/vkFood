const ReusableInput = (props) => {
  const { type, className, inputId, onChange, placeholder, onKeyDown, value } =
    props;
  return (
    <input
      type={type}
      id={inputId}
      className={`bg-transparent border p-2 w-full outline-none ${className} rounded-md`}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      value={value}
    />
  );
};
export default ReusableInput;
