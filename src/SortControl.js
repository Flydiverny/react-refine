import React from 'react';
import PropTypes from 'prop-types';
import identityGen from './internals/identityGen';
import refineHoc from './internals/refineHoc';

class SortControl extends React.Component {
  state = {
    id: identityGen('sort'),
  };

  constructor(props) {
    super(props);
    this.toggleSorter();
  }

  componentDidUpdate(prevProps) {
    if (this.props.disabled) {
      this.removeSorter();
    }

    if (prevProps.comparator !== this.props.comparator) {
      this.toggleSorter(this.getSortDirection());
    }
  }

  componentWillUnmount() {
    this.props.refine.removeSorter(this.state.id);
  }

  toggleSorter = forcedDirection => {
    if (this.props.disabled) {
      this.removeSorter();
    } else {
      this.props.refine.toggleSorter(this.state.id, this.props.sorter, forcedDirection);
    }
  };

  removeSorter = () => {
    this.props.refine.removeSorter(this.state.id);
  };

  getSortDirection = () => this.props.refine.getSortDirection(this.state.id);

  render() {
    return this.props.children({
      toggleSorter: this.toggleSorter,
      removeSorter: this.removeSorter,
      sortDirection: this.getSortDirection(),
    });
  }
}

SortControl.propTypes = {
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SortControl.defaultProps = {
  disabled: false,
};

export default refineHoc(SortControl);