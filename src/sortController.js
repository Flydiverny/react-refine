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
          removeSorter={() => removeSorter(identifier)}
          toggleSorter={forcedDirection => toggleSorter(identifier, comparator, forcedDirection)}
          sortDirection={getSorterDirection(identifier)}
        />
      )}
    </RefineContext.Consumer>
  );

  hoistNonReactStatics(SortController, WrappedComponent);

  const name = WrappedComponent.displayName || WrappedComponent.name;
  SortController.displayName = `sortController(${name})`;
  SortController.WrappedComponent = WrappedComponent;

  return SortController;
};

export default sortController;
