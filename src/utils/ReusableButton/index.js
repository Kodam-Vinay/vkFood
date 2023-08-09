const ReusableButton = (props) => {
  const { className, value, onClick, type } = props;
  return (
    <button
      className={`${className} border px-2 py-1 rounded-md pb-2`}
      onClick={onClick}
      type={type}
    >
      {value}
    </button>
  );
};
export default ReusableButton;
