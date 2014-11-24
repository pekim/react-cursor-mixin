var deepEqual = require('deep-equal');

var debugEnabled = false;

function enableDebug () {
  debugEnabled = true;
}

function debug () {
  var args = Array.prototype.slice.call(arguments, 0);

  args.unshift(this.constructor.displayName + ':');
  (console.debug || console.trace).apply(console, args);
}

function shouldComponentUpdate(nextProps, nextState) {
  return stateHasChanged.call(this, nextState) ||
          propsHaveChanged.call(this, nextProps);
}

function stateHasChanged(nextState) {
  if (isEqualState(this.state, nextState)) {
    return false;
  } else {
    if (debugEnabled) {
      debug.call(this, 'shouldComponentUpdate => true (state has changed)');
    }
    return true;
  }
}

function propsHaveChanged(nextProps) {
  if (haveDifferentKeys(this.props, nextProps)) {
    if (debugEnabled) {
      debug.call(this, 'shouldComponentUpdate => true (props have different keys)');
    }
    return true;
  }

  if (haveDifferentProps(this.props, nextProps)) {
    if (debugEnabled) {
      debug.call(this, 'shouldComponentUpdate => true (props have changed)');
    }
    return true;
  }

  return false;
}

// function filterCursors(props) {
//   var cursors = {};
//
//   for (var name in props) {
//     var potentialCursor = props[name];
//
//     if (isCursor(potentialCursor)) {
//       cursors[name] = potentialCursor;
//     }
//   }
//
//   return cursors;
// }

function haveDifferentKeys(object1, object2) {
  var keys1 = Object.keys(object1);
  var keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return true;
  }

  return !keys1.every(function existsInKeys2 (key) {
    return keys2.indexOf(key) !== -1;
  });
}

function haveDifferentProps(props1, props2) {
  for (var name in props1) {
    var value1 = props1[name];
    var value2 = props2[name];

    if (isCursor(value1)) {
      if (!value1.equals(value2)) {
        return true;
      }
    } else if (!deepEqual(value1, value2)) {
      return true;
    }
  }

  return false;
}

function isCursor (potential) {
  return potential &&
    ((typeof potential.deref === 'function') || (typeof potential.__deref === 'function'));
}

function isEqualState () {
  return deepEqual.apply(this, arguments);
}

shouldComponentUpdate.enableDebug = enableDebug;

module.exports = {
  shouldComponentUpdate: shouldComponentUpdate
};
