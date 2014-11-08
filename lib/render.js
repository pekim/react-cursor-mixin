var debugEnabled = false;

function enableDebug (enable) {
  debugEnabled = enable === undefined ? true : enable;
}

function render(element, container) {
  if (debugEnabled) {
    (console.debug || console.trace)('render');
  }
}

render.enableDebug = enableDebug;

module.exports = render;
