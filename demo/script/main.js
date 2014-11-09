var React = require('react');
var immstruct = require('immstruct');
var Component = require('./component');

var data = immstruct({
  name: 'root',
  value: 1,

  children: [
    {
      name: 'c-1',
      value: 1
    }, {
      name: 'c-2',
      value: 1,

      children: [
        {
          name: 'c-2-1',
          value: 1
        }, {
          name: 'c-2-2',
          value: 1
        }, {
          name: 'c-2-3',
          value: 1
        }
      ]
    }
  ]
});

data.on('swap', render);

function render() {
  React.render(
    <Component cursor={data.cursor()} />,
    document.body
  );
}

render();
