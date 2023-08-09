const LabelElement = (props) => {
  const { inputId, value } = props;
  return (
    <label htmlFor={inputId} className="self-start text-white font-[600]ml-1">
      {value}
    </label>
  );
};
export default LabelElement;
