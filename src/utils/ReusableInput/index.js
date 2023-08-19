const ReusableInput = (props) => {
  const {
    type,
    className,
    inputId,
    onChange,
    placeholder,
    onKeyDown,
    value,
    pattern,
    maxLength,
    required,
    minLength,
  } = props;
  return (
    <input
      type={type}
      id={inputId}
      className={`bg-transparent border p-2 w-full outline-none ${className} rounded-md`}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      value={value}
      pattern={pattern}
      maxLength={maxLength}
      required={required}
      minLength={minLength}
    />
  );
};
export default ReusableInput;
