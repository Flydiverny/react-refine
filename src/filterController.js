import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import RefineContext from "./RefineContext";
import identityGen from "./identityGen";

const filterController = WrappedComponent => {
  const uuid = identityGen("filter");

  const FilterController = props => (
    <RefineContext.Consumer>
      {({ addFilter, removeFilter }) => (
        <WrappedComponent
          {...props}
          setFilter={filter => addFilter(uuid, filter)}
          unsetFilter={() => removeFilter(uuid)}
        />
      )}
    </RefineContext.Consumer>
  );

  hoistNonReactStatics(FilterController, WrappedComponent);

  const name = WrappedComponent.displayName || WrappedComponent.name;
  FilterController.displayName = `filterController(${name})`;

  return FilterController;
};

export default filterController;
