import React from "react";

const FilterContext = React.createContext({
  filter: items => items,
  addFilter: () => {},
  removeFilter: () => {}
});

export default FilterContext;
