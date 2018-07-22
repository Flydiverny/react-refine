import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import identityGen from './internals/identityGen';
import refineHoc from './internals/refineHoc';

const withFilter = WrappedComponent => {
  class WithFilter extends Component {
    constructor(props) {
      super(props);
      this.id = identityGen('filter');
    }

    componentWillUnmount() {
      this.props.refine.clearFilter(this.id);
    }

    addFilter = filter => {
      this.props.refine.addFilter(this.id, filter);
    };

    removeFilter = () => {
      this.props.refine.removeFilter(this.id);
    };

    render() {
      const { refine, ...props } = this.props;
      return (
        <WrappedComponent {...props} setFilter={this.addFilter} clearFilter={this.removeFilter} />
      );
    }
  }

  hoistNonReactStatics(WithFilter, WrappedComponent);

  const name = WrappedComponent.displayName || WrappedComponent.name;
  WithFilter.displayName = `withFilter(${name})`;
  WithFilter.WrappedComponent = WrappedComponent;

  return refineHoc(WithFilter);
};

export default withFilter;
