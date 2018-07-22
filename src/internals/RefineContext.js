import React from 'react';
import { OFF } from '../constants';

const RefineContext = React.createContext({
  filter: items => items,
  sort: items => items,
  refine: items => items,

  addFilter: () => {},
  removeFilter: () => {},

  removeSorter: () => {},
  toggleSorter: () => {},

  getSortDirection: () => OFF,
});

export default RefineContext;
