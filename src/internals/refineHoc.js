import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import RefineContext from './RefineContext';

const refineHoc = WrappedComponent => {
  const RefineHoC = props => (
    <RefineContext.Consumer>
      {refine => <WrappedComponent {...props} refine={refine} />}
    </RefineContext.Consumer>
  );

  hoistNonReactStatics(RefineHoC, WrappedComponent);

  const name = WrappedComponent.displayName || WrappedComponent.name;
  RefineHoC.displayName = `refine(${name})`;
  RefineHoC.WrappedComponent = WrappedComponent;

  return RefineHoC;
};

export default refineHoc;
