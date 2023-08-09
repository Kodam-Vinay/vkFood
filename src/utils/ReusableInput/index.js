const ReusableInput = (props) => {
  const { type, className, inputId } = props;
  return (
    <input
      type={type}
      id={inputId}
      className={`p-2 rounded-md w-[250px] ${className}`}
    />
  );
};
export default ReusableInput;
