# react-refine

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Composable components for flexible filtering.

[build-badge]: https://img.shields.io/travis/flydiverny/react-refine/master.png?style=flat-square
[build]: https://travis-ci.org/flydiverny/react-refine
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-refine
[coveralls-badge]: https://img.shields.io/coveralls/flydiverny/react-refine/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/flydiverny/react-refine

### Installation

```
yarn add react-refine
```

## Usage

### Consuming refine results

Grant access to specific trees by using the `Grant`.

```js
import { RefineScope, Refine } from "react-refine";

<RefineScope>
  <FreeTextSearch />

  <Refine items={["abc", "123", "def"]}>
    {items => items.map(item => <div>{item}</div>)}
  </Refine>
</RefineScope>;
```

## filterController HOC

To create components which provides filters in the scope you can use the `filterController` HOC, which will provide `unsetFilter()` and `setFilter(filterFunc)` functions to your component.

### Example usage of filterController

```js
import { filterController } from "react-refine";

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

export default filterController(FreeTextSearch);
```
