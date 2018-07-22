import React from 'react';
import PropTypes from 'prop-types';
import RefineContext from './RefineContext';

const facet = op => ({ items, children }) => (
  <RefineContext.Consumer>
    {({ [op]: operation }) => children(operation(items))}
  </RefineContext.Consumer>
);

export const [Refine, Filter, Sort] = ['Refine', 'Filter', 'Sort'].map(type => {
  const Facet = facet(type.toLowerCase());
  Facet.propTypes = {
    items: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
  };
  Facet.displayName = type;

  return Facet;
});
