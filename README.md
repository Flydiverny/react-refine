# react-refine

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Composable components for flexible filtering and sorting!

[build-badge]: https://img.shields.io/travis/flydiverny/react-refine/master.png?style=flat-square
[build]: https://travis-ci.org/flydiverny/react-refine
[npm-badge]: https://img.shields.io/npm/v/react-refine.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-refine
[coveralls-badge]: https://img.shields.io/coveralls/flydiverny/react-refine/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/flydiverny/react-refine

### Installation

```
yarn add react-refine
```

# DOCS ARE WIP!

## Usage

### Consuming refine results

Within a scope filter and sorting can be applied using (`withSorter` and `withFilter`) HoCs.
The result can then be consumed using `Refine` (filtered & sorted), `Filter` and `Sort` components.

```js
import { RefineScope, Refine } from 'react-refine';

<RefineScope>
  <FreeTextSearch />

  <Refine items={['abc', '123', 'def']}>{items => items.map(item => <div>{item}</div>)}</Refine>
</RefineScope>;
```

## withFilter HOC

To create components which provides filters in the scope you can use the `filterController` HOC, which will provide `removeFilter()` and `setFilter(filterFunc)` functions to your component.

### Example usage of withFilter

```js
import { withFilter } from 'react-refine';

class FreeTextSearch extends Component {
  onChange = evt => {
    const query = evt.target.value;

    if (query.length === 0) {
      this.props.unsetFilter();
    } else {
      this.props.setFilter(items => items.filter(item => item.includes(query)));
    }
  };

  render() {
    return <input onChange={this.onChange} />;
  }
}

export default withFilter(FreeTextSearch);
```

### Example SortControl usage

```js
import { SortControl, ASC, DESC, OFF } from 'react-refine';

const Column = ({ column, comparator }) => (
  <SortControl comparator={comparator}>
    {({ toggleSorter, removeSorter, sortDirection }) => (
      <th>
        {column}{' '}
        <Arrow
          direction={sortDirection === DESC ? 'down' : 'up'}
          disabled={sortDirection === OFF}
        />
      </th>
    )}
  </SortControl>
);
```

```js
const alphabeticSort = (field) => (a, b) => a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0

<Column column={'Name'} comparator={alphabeticSort('name')} />
<Column column={'Adress'} comparator={alphabeticSort('street')} />
```
