import React from "react";
import PropTypes from "prop-types";
import RefineContext from "./RefineContext";

const consumerPropTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired
};

const funnel = op => ({ items, children }) => (
  <RefineContext.Consumer>
    {({ [op]: operation }) => children(operation(items))}
  </RefineContext.Consumer>
);

const Refine = funnel("refine");
Refine.propTypes = consumerPropTypes;
Refine.displayName = "Refine";

const Filter = funnel("filter");
Filter.propTypes = consumerPropTypes;
Filter.displayName = "Filter";

const Sort = funnel("sort");
Sort.propTypes = consumerPropTypes;
Sort.displayName = "Sort";

export { Refine, Filter, Sort };
