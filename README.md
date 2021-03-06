## What
A [React](https://github.com/facebook/react) mixin implementing `shouldComponentUpdate`, for efficient rendering with [immutable-js Cursor](https://github.com/facebook/immutable-js/tree/master/contrib/cursor)s.

## How to use
### Use the mixin in your React components.
```javascript
var mixin = require('react-cursor-mixin');

var MyComponent = React.createClass({
  mixins: [mixin],
  ...
});
```

### Use Cursors as props for data.
All props whose value is a `Cursor` are checked for change by the mixin.

As a `Cursor` holds a reference to a path in a nested immutable data structure,
the check for change is very efficient.

### Use other props for non-cursor data
All props whose value are checked for deep equality.
This is not a performant as checking cursors.

### Use `state` for local state when needed.
A component's state is checked for change by the mixin.

The check is for deep equality, and so will not be as efficient as cursor checks.

## License
[MIT](./LICENSE)
