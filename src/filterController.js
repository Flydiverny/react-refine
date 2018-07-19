import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import Context from "./Context";

function guid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const filterController = WrappedComponent => {
  const uuid = guid();
  // eslint-disable-next-line react/prop-types
  const FilterController = ({ forwardedRef, ...props }) => (
    <Context.Consumer>
      {({ addFilter, removeFilter }) => (
        <WrappedComponent
          ref={forwardedRef}
          setFilter={filter => addFilter(uuid, filter)}
          unsetFilter={() => removeFilter(uuid)}
        />
      )}
    </Context.Consumer>
  );

  return FilterController;
};

const filterControllerWithForwardRef = WrappedComponent => {
  // eslint-disable-next-line react/prop-types
  const FilterController = filterController(WrappedComponent);

  const forwardRef = (props, ref) => (
    <FilterController {...props} forwardedRef={ref} />
  );

  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `filterController(${name})`;

  hoistNonReactStatics(filterController, WrappedComponent);

  return React.forwardRef(forwardRef);
};

export default filterControllerWithForwardRef;
