import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import identityGen from './internals/identityGen';
import refineHoc from './internals/refineHoc';

const withSorter = comparator => WrappedComponent => {
  class WithSorter extends Component {
    constructor(props) {
      super(props);
      this.id = identityGen('sort');
    }

    componentWillUnmount() {
      this.props.refine.removeSorter(this.id);
    }

    toggleSorter = forcedDirection =>
      this.props.refine.toggleSorter(this.id, comparator, forcedDirection);

    removeSorter = () => {
      this.props.refine.removeSorter(this.id);
    };

    getSortDirection = () => this.props.refine.getSortDirection(this.id);

    render() {
      const { refine, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          toggleSorter={this.toggleSorter}
          removeSorter={this.removeSorter}
          sortDirection={this.getSortDirection()}
        />
      );
    }
  }

  hoistNonReactStatics(WithSorter, WrappedComponent);

  const name = WrappedComponent.displayName || WrappedComponent.name;
  WithSorter.displayName = `withSorter(${name})`;
  WithSorter.WrappedComponent = WrappedComponent;

  return refineHoc(WithSorter);
};

export default withSorter;
