import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import {
  RefineScope,
  Refine,
  Sort,
  Filter,
  withFilter,
  withSorter,
  SORT_MODE_ONE,
  SORT_MODE_TIE,
  PRIORITY_FIRST,
  SortControl,
} from '../../src';

const items = ['Hello World', '12345', 'Hello W0r1d', '66666', '55555'];

const freeTextFilter = filter => items => items.filter(item => item.includes(filter));

const lengthFilter = filter => items => items.filter(item => item.length <= filter);

const onChange = (filter, setFilter, clearFilter) => evt => {
  if (evt.target.value.length === 0) {
    clearFilter();
  } else {
    setFilter(filter(evt.target.value));
  }
};

const FreeTextFilter = ({ text, setFilter, clearFilter }) => (
  <input onChange={onChange(freeTextFilter, setFilter, clearFilter)} placeholder={text} />
);

const LengthFilter = ({ setFilter, clearFilter }) => (
  <input onChange={onChange(lengthFilter, setFilter, clearFilter)} />
);

const Sorter = ({ text, sorter }) => (
  <SortControl comparator={sorter}>
    {({ toggleSorter, removeSorter, sortDirection }) => (
      <Fragment>
        {text}: {sortDirection}
        <button onClick={() => toggleSorter()}>Toggle</button>
        <button onClick={() => removeSorter()}>Off</button>
      </Fragment>
    )}
  </SortControl>
);

const EnhancedFreeTextFilter = withFilter(FreeTextFilter);
const EnhancedLengthFilter = withFilter(LengthFilter);

const alphaSort = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const lengthSort = (a, b) => a.length - b.length;

const Facet = ({ component: Component, ...props }) => (
  <table>
    <thead>
      <tr>
        <th>
          <Sorter text={'Alpha'} sorter={alphaSort} />
        </th>
        <th>
          <Sorter text={'Length'} sorter={lengthSort} />
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
        <EnhancedFreeTextFilter text={'First'} />
        <EnhancedFreeTextFilter text={'Second'} />
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

ReactDOM.render(<Demo />, document.querySelector('#demo'));
