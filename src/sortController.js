import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import RefineContext from './RefineContext';
import identityGen from './identityGen';

const sortController = comparator => WrappedComponent => {
  const identifier = identityGen('sort');

  const SortController = props => (
    <RefineContext.Consumer>
      {({ removeSorter, getSorterDirection, toggleSorter }) => (
        <WrappedComponent
          {...props}
          setSortDirection={direction => toggleSorter(identifier, comparator, direction)}
          removeSorter={() => removeSorter(identifier)}
          toggleSorter={() => toggleSorter(identifier, comparator)}
          sortMode={getSorterDirection(identifier)}
        />
      )}
    </RefineContext.Consumer>
  );

  hoistNonReactStatics(SortController, WrappedComponent);

  const name = WrappedComponent.displayName || WrappedComponent.name;
  SortController.displayName = `sortController(${name})`;

  return SortController;
};

export default sortController;
