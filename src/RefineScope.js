import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefineContext from './internals/RefineContext';
import {
  SORT_MODE_ONE,
  SORT_MODE_TIE,
  ASC,
  DESC,
  OFF,
  PRIORITY_FIRST,
  PRIORITY_LAST,
} from './constants';

const useSorter = ({ comparator, direction } = {}, a, b) =>
  comparator ? comparator(a, b) * (direction === ASC ? 1 : -1) : 0;

class RefineScope extends Component {
  state = {
    filters: [],
    sorters: [],
  };

  removeFunnel = (type, idToRemove) => {
    this.setState(state => ({
      [type]: state[type].filter(({ identifier }) => identifier !== idToRemove),
    }));
  };

  addFunnel = (type, identifier, funnel, overwrite = false) => {
    this.setState(state => {
      let nextList = null;
      const oldList = (overwrite ? [] : state[type]).filter(f => f.identifier !== identifier);

      const newFunnel = { identifier, ...funnel };

      if (this.props.sortPriority === PRIORITY_LAST) {
        nextList = [newFunnel].concat(oldList);
      } else {
        nextList = oldList.concat([newFunnel]);
      }

      return {
        [type]: nextList,
      };
    });
  };

  addFilter = (identifier, filter) => this.addFunnel('filters', identifier, { filter });

  removeFilter = identifier => this.removeFunnel('filters', identifier);

  removeSorter = identifier => this.removeFunnel('sorters', identifier);

  toggleSorter = (idToFind, comparatorIn, forceDirection) => {
    const index = this.state.sorters.findIndex(({ identifier }) => identifier === idToFind);

    if (index > -1) {
      this.setState(state => {
        const funnels = state.sorters.concat();
        const { identifier, comparator, direction } = state.sorters[index];
        const newDirection = forceDirection || direction === ASC ? DESC : ASC;
        const newFunnel = { identifier, comparator, direction: newDirection };

        if (this.props.sortPriority === PRIORITY_LAST) {
          funnels.splice(index, 1);

          return {
            sorters: [newFunnel].concat(funnels),
          };
        } else {
          funnels[index] = newFunnel;

          return {
            sorters: funnels,
          };
        }
      });
    } else {
      this.addFunnel(
        'sorters',
        idToFind,
        { comparator: comparatorIn, direction: forceDirection || ASC },
        this.props.sortMode === SORT_MODE_ONE
      );
    }
  };

  filter = items => {
    const filters = this.state.filters;

    if (filters.length === 0) {
      return items;
    }

    return filters.reduce(
      (currentItems, { filter }) => (filter ? filter(currentItems) : currentItems),
      items
    );
  };

  sort = itemsIn => {
    const sorters = this.state.sorters;

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

  getSortDirection = identifier =>
    (this.state.sorters.find(funnel => funnel.identifier === identifier) || {}).direction || OFF;

  render() {
    return (
      <RefineContext.Provider
        value={{
          filter: this.filter,
          sort: this.sort,
          refine: this.refine,
          addFilter: this.addFilter,
          removeFilter: this.removeFilter,
          removeSorter: this.removeSorter,
          getSortDirection: this.getSortDirection,
          toggleSorter: this.toggleSorter,
        }}
      >
        {this.props.children}
      </RefineContext.Provider>
    );
  }
}

RefineScope.defaultProps = {
  sortMode: SORT_MODE_TIE,
  sortPriority: PRIORITY_LAST,
};

RefineScope.propTypes = {
  children: PropTypes.node.isRequired,
  sortMode: PropTypes.oneOf([SORT_MODE_ONE, SORT_MODE_TIE]),
  sortPriority: PropTypes.oneOf([PRIORITY_LAST, PRIORITY_FIRST]),
};

export default RefineScope;
