import ReusableInput from "../../utils/ReusableInput";

const index = ({ setSearchValue, searchValue }) => {
  return (
    <div className="mb-4 flex items-center justify-between w-full">
      <h1 className="font-bold">MENU</h1>
      <div>
        <ReusableInput
          type="search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="search in Menu"
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default index;
