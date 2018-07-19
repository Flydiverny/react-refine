import React, { Component } from "react";
import PropTypes from "prop-types";
import Context from "./Context";
import React from "react";

const FilterResult = ({ items, children }) => (
  <Context.Consumer>{({ filter }) => children(filter(items))}</Context.Consumer>
);

FilterResult.propTypes = {
  items: PropTypes.array
};

export default FilterResult;
