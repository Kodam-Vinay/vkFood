import { createContext } from "react";

const SearchContext = createContext({
  searchInput: "",
});

SearchContext.displayName = "SearchContext";

export default SearchContext;
