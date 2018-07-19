import React, { Component } from "react";
import ReactDOM from "react-dom";

import { FilterScope, FilterResult, filterController } from "../../src";

const items = ["Hello World", "123", "Hello World 123", "5767"];

const freeTextFilter = filter => items =>
  items.filter(item => item.includes(filter));

const lengthFilter = filter => items =>
  items.filter(item => item.length <= filter);

class FreeTextFilter extends Component {
  onChange = evt => {
    if (evt.target.value.length === 0) {
      this.props.unsetFilter();
    } else {
      this.props.setFilter(freeTextFilter(evt.target.value));
    }
  };

  render() {
    return <input onChange={this.onChange} />;
  }
}

class LengthFilter extends Component {
  onChange = evt => {
    if (evt.target.value.length === 0) {
      this.props.unsetFilter();
    } else {
      this.props.setFilter(lengthFilter(evt.target.value));
    }
  };

  render() {
    return <input onChange={this.onChange} />;
  }
}

const EnhancedFreeTextFilter = filterController(FreeTextFilter);
const EnhancedLengthFilter = filterController(LengthFilter);

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-filtered Demo</h1>
        <FilterScope>
          <h1>Filter Scope 1</h1>
          <EnhancedFreeTextFilter />
          <EnhancedLengthFilter />
          <FilterResult items={items}>
            {filteredItems => filteredItems.map(item => <div>{item}</div>)}
          </FilterResult>
        </FilterScope>
        <FilterScope>
          <h1>Filter Scope 2</h1>
          <EnhancedFreeTextFilter />
          <EnhancedLengthFilter />
          <FilterResult items={items}>
            {filteredItems => filteredItems.map(item => <div>{item}</div>)}
          </FilterResult>

          <FilterScope>
            <h1>Filter Scope 3 inside of Filter Scope 2</h1>
            <EnhancedFreeTextFilter />
            <EnhancedLengthFilter />
            <FilterResult items={items}>
              {filteredItems => filteredItems.map(item => <div>{item}</div>)}
            </FilterResult>
          </FilterScope>
        </FilterScope>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.querySelector("#demo"));
