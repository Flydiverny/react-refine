import React from "react";

const RefineContext = React.createContext({
  filter: items => items,
  sort: items => items,
  refine: items => items,

  addFilter: () => {},
  removeFilter: () => {},

  addSorter: () => {},
  removeSorter: () => {},

  sorters: {},
  toggleSorter: () => {}
});

export default RefineContext;
