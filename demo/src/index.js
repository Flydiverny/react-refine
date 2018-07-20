import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import {
  RefineScope,
  Refine,
  Sort,
  Filter,
  filterController,
  sortController,
  SORT_MODE_ONE,
  SORT_MODE_TIE
} from "../../src";
import { PRIORITY_FIRST } from "../../src/RefineScope";

const items = ["Hello World", "12345", "Hello W0r1d", "66666", "55555"];

const freeTextFilter = filter => items =>
  items.filter(item => item.includes(filter));

const lengthFilter = filter => items =>
  items.filter(item => item.length <= filter);

const onChange = (filter, setFilter, unsetFilter) => evt => {
  if (evt.target.value.length === 0) {
    unsetFilter();
  } else {
    setFilter(filter(evt.target.value));
  }
};

const FreeTextFilter = ({ setFilter, unsetFilter }) => (
  <input onChange={onChange(freeTextFilter, setFilter, unsetFilter)} />
);
const LengthFilter = ({ setFilter, unsetFilter }) => (
  <input onChange={onChange(lengthFilter, setFilter, unsetFilter)} />
);

const Sorter = ({ toggleSortDirection, unsetSorter, sortMode }) => (
  <Fragment>
    {sortMode}
    <button onClick={toggleSortDirection}>Toggle</button>
    <button onClick={unsetSorter}>Off</button>
  </Fragment>
);

const EnhancedFreeTextFilter = filterController(FreeTextFilter);
const EnhancedLengthFilter = filterController(LengthFilter);
const LengthSorter = sortController((a, b) => a.length - b.length)(Sorter);
const AlphabeticSorter = sortController((a, b) => (a < b ? -1 : a > b ? 1 : 0))(
  Sorter
);

const Facet = ({ component: Component, ...props }) => (
  <table>
    <thead>
      <tr>
        <th>
          Alpha:
          <AlphabeticSorter />
        </th>
        <th>
          Length:
          <LengthSorter />
        </th>
      </tr>
    </thead>
    <tbody>
      <Component {...props}>
        {items =>
          items.map(item => (
            <tr key={item}>
              <td>{item}</td>
              <td>{item.length}</td>
            </tr>
          ))
        }
      </Component>
    </tbody>
  </table>
);

class Demo extends Component {
  render() {
    const resultView = (
      <Fragment>
        <EnhancedFreeTextFilter />
        <EnhancedLengthFilter />

        <h2>Refined Result</h2>
        <Facet component={Refine} items={items} />

        <h2>Sorted Result</h2>
        <Facet component={Sort} items={items} />

        <h2>Filtered Result</h2>
        <Facet component={Filter} items={items} />
      </Fragment>
    );

    return (
      <div>
        <h1>react-refine Demo</h1>
        <h2>Refine Scope with single sort mode</h2>
        <RefineScope sortMode={SORT_MODE_ONE}>{resultView}</RefineScope>

        <hr />

        <h2>Refine Scope with multi sort mode</h2>
        <RefineScope sortMode={SORT_MODE_TIE} sortPriority={PRIORITY_FIRST}>
          {resultView}
        </RefineScope>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.querySelector("#demo"));
