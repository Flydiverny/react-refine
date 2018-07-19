import React, { Component } from "react";
import PropTypes from "prop-types";
import Context from "./Context";

class FilterScope extends Component {
  state = {
    filters: {}
  };

  addFilter = (identifier, filter) => {
    this.setState(state => ({
      filters: {
        ...state.filters,
        [identifier]: filter
      }
    }));
  };

  removeFilter = identifier => this.addFilter(identifier, undefined);

  filter = items => {
    const filters = Object.values(this.state.filters);

    if (filters.length === 0) {
      console.log("returning items");
      return items;
    }

    return filters.reduce(
      (currentItems, filter) => (filter ? filter(currentItems) : currentItems),
      items
    );
  };

  render() {
    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          filter: this.filter,
          addFilter: this.addFilter,
          removeFilter: this.removeFilter
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

FilterScope.propTypes = {
  children: PropTypes.node.isRequired
};

export default FilterScope;
