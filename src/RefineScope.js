import React, { Component } from "react";
import PropTypes from "prop-types";
import RefineContext from "./RefineContext";

export const SORT_MODE_ONE = "sort_one";
export const SORT_MODE_TIE = "sort_tie";

export const ASC = "asc";
export const DESC = "desc";
export const OFF = "off";

const useSorter = ({ comparator, direction } = {}, a, b) =>
  comparator ? comparator(a, b) * (direction === ASC ? 1 : -1) : 0;

class RefineScope extends Component {
  state = {
    filters: {},
    sorters: {}
  };

  setRefiner = (type, identifier, funnel, overwrite = false) => {
    this.setState(state => ({
      [type]: {
        ...(overwrite ? {} : state[type]),
        [identifier]: funnel
      }
    }));
  };

  unsetRefiner = (type, identifier) => {
    this.setState(
      ({ [type]: { [identifier]: removingMe, ...funnels }, ...state }) => ({
        ...state,
        [type]: {
          ...funnels
        }
      })
    );
  };

  addFilter = (identifier, funnel) =>
    this.setRefiner("filters", identifier, funnel);

  removeFilter = identifier => this.unsetRefiner("filters", identifier);

  addSorter = (identifier, comparator, direction = ASC) =>
    this.setRefiner(
      "sorters",
      identifier,
      { comparator, direction },
      this.props.sortMode === SORT_MODE_ONE
    );

  removeSorter = identifier => this.unsetRefiner("sorters", identifier);

  toggleSorter = identifier => {
    const { comparator, direction } = this.state.sorters[identifier];
    const newDirection = direction === ASC ? DESC : ASC;
    this.addSorter(identifier, comparator, newDirection);
  };

  filter = items => {
    const filters = Object.values(this.state.filters);

    if (filters.length === 0) {
      return items;
    }

    return filters.reduce(
      (currentItems, filter) => (filter ? filter(currentItems) : currentItems),
      items
    );
  };

  sort = itemsIn => {
    const sorters = Object.values(this.state.sorters);

    if (sorters.length === 0) {
      return itemsIn;
    }

    return itemsIn.concat().sort((a, b) => {
      let sortResult = 0;

      for (let funnel of sorters) {
        sortResult = useSorter(funnel, a, b);

        if (sortResult !== 0) {
          break;
        }
      }

      return sortResult;
    });
  };

  refine = items => this.sort(this.filter(items));

  render() {
    return (
      <RefineContext.Provider
        value={{
          filter: this.filter,
          sort: this.sort,
          refine: this.refine,
          addFilter: this.addFilter,
          removeFilter: this.removeFilter,
          addSorter: this.addSorter,
          removeSorter: this.removeSorter,
          sorters: this.state.sorters,
          toggleSorter: this.toggleSorter
        }}
      >
        {this.props.children}
      </RefineContext.Provider>
    );
  }
}

RefineScope.defaultProps = {
  sortMode: SORT_MODE_TIE
};

RefineScope.propTypes = {
  children: PropTypes.node.isRequired,
  sortMode: PropTypes.oneOf([SORT_MODE_ONE, SORT_MODE_TIE])
};

export default RefineScope;
