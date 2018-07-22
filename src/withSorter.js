import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import SortControl from './SortControl';

const withSorter = comparator => WrappedComponent => {
  const WithSorter = props => (
    <SortControl comparator={comparator}>
      {({ toggleSorter, removeSorter, sortDirection }) => (
        <WrappedComponent
          {...props}
          toggleSorter={toggleSorter}
          removeSorter={removeSorter}
          sortDirection={sortDirection}
        />
      )}
    </SortControl>
  );

  hoistNonReactStatics(WithSorter, WrappedComponent);

  const name = WrappedComponent.displayName || WrappedComponent.name;
  WithSorter.displayName = `withSorter(${name})`;
  WithSorter.WrappedComponent = WrappedComponent;

  return WithSorter;
};

export default withSorter;
