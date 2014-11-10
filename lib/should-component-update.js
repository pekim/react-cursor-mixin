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
          cursorsHaveChanged.call(this, nextProps);
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

function cursorsHaveChanged(nextProps) {
  var cursors = filterCursors(this.props);
  var nextCursors = filterCursors(nextProps);

  if (haveDifferentKeys(cursors, nextCursors)) {
    if (debugEnabled) {
      debug.call(this, 'shouldComponentUpdate => true (cursors have different keys)');
    }
    return true;
  }

  if (haveDifferentCursors(cursors, nextCursors)) {
    if (debugEnabled) {
      debug.call(this, 'shouldComponentUpdate => true (cursors have changed)');
    }
    return true;
  }

  return false;
}

function filterCursors(props) {
  var cursors = {};

  for (var name in props) {
    var potentialCursor = props[name];

    if (isCursor(potentialCursor)) {
      cursors[name] = potentialCursor;
    }
  }

  return cursors;
}

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

function haveDifferentCursors(cursors1, cursors2) {
  for (var name in cursors1) {
    if (!cursors1[name].equals(cursors2[name])) {
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
