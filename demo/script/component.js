var React = require('react');
var mixin = require('../../');

mixin.shouldComponentUpdate.enableDebug();

var Component = React.createClass({
  mixins: [mixin],

  increment: function() {
    this.props.cursor.update('value', function(value) {
      return value + 1;
    });
  },

  renderChildren: function(child, index) {
    return (
      <Component cursor={child} key={index} />
    );
  },

  render: function() {
    var cursor = this.props.cursor;
    var children = cursor.get('children') ?
      cursor.get('children').toArray().map(this.renderChildren)
    :
      '';

    console.log('render', cursor.get('name'));

    return (
      <div className='component'>
        <strong>
          {cursor.get('name')}
        </strong>
        {' = '}
        {cursor.get('value')}
        {' '}
        <button onClick={this.increment}>Increment</button>
        {' '}
        {children}
      </div>
    );
  }
});

module.exports = Component;
