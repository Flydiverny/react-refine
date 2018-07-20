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
      {({ removeSorter, getSorterDirection, toggleSorter }) => (
        <WrappedComponent
          ref={forwardedRef}
          setSortDirection={direction =>
            toggleSorter(identifier, comparator, direction)
          }
          unsetSorter={() => removeSorter(identifier)}
          toggleSortDirection={() => toggleSorter(identifier, comparator)}
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
