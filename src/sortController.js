import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import RefineContext from "./RefineContext";
import { OFF } from "./RefineScope";
import identityGen from "./identityGen";

const sortController = comparator => WrappedComponent => {
  const identifier = identityGen("sort");
  // eslint-disable-next-line react/prop-types
  const SortController = ({ forwardedRef, ...props }) => (
    <RefineContext.Consumer>
      {({ addSorter, removeSorter, sorters, toggleSorter }) => (
        <WrappedComponent
          ref={forwardedRef}
          setSortDirection={direction =>
            addSorter(identifier, comparator, direction)
          }
          unsetSorter={() => removeSorter(identifier)}
          toggleSortDirection={() => toggleSorter(identifier, comparator)}
          sortMode={
            (sorters.find(sorter => sorter.identifier === identifier) || {})
              .direction || OFF
          }
        />
      )}
    </RefineContext.Consumer>
  );

  hoistNonReactStatics(SortController, WrappedComponent);

  return SortController;
};

export default sortController;
