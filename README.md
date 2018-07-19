# react-filtered

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Composable components for flexible filtering.

[build-badge]: https://img.shields.io/travis/flydiverny/react-filtered/master.png?style=flat-square
[build]: https://travis-ci.org/flydiverny/react-filtered
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-filtered
[coveralls-badge]: https://img.shields.io/coveralls/flydiverny/react-filtered/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/flydiverny/react-filtered

### Installation

```
yarn add react-filtered
```

## Usage

### Consuming filtered results

Grant access to specific trees by using the `Grant`.

```js
import { FilterScope, FilterResult } from "react-filtered";

<FilterScope>
  <FreeTextSearch />

  <FilterResult items={["abc", "123", "def"]}>
    {filteredItems => filteredItems.map(item => <div>{item}</div>)}
  </FilterResult>
</FilterScope>;
```

## filterController HOC

To create components which provides filters in the scope you can use the `filterController` HOC, which will provide `unsetFilter()` and `setFilter(filterFunc)` functions to your component.

### Example usage of filterController

```js
import { filterController } from "react-filtered";

class FreeTextSearch extends Component {
  onChange = evt => {
    const filter = evt.target.value;

    if (filter.length === 0) {
      this.props.unsetFilter();
    } else {
      this.props.setFilter(items =>
        items.filter(item => item.includes(filter))
      );
    }
  };

  render() {
    return <input onChange={this.onChange} />;
  }
}

export default filterController(FreeTextSearch);
```
