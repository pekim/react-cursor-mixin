var chai = require('chai');
chai.should();

var shouldComponentUpdate = require('../').shouldComponentUpdate;
var immstruct = require('immstruct');

// shouldComponentUpdate.enableDebug();

var data = immstruct({
  foo: {v: 'bar'},
  bar: [1, 2, 3],
  zod: [42, 'qwerty']
}).cursor();

describe('shouldComponentUpdate', function () {
  describe('should update', function () {
    it('when state has changed', function () {
      shouldUpdate(
        null, { foo: 'hello' },
        null, { foo: 'bar'   }
      );
    });

    it('when deep state has changed', function () {
      shouldUpdate(
        null, { foo: { bar : 'hello' } },
        null, { foo: { bar : 'bye'   } }
      );
    });

    it('when number of cursors is different', function () {
      shouldUpdate(
        {cursor1: data.get('foo')}, null,
        {cursor1: data.get('foo'), cursor2: data.get('foo')}, null
      );
    });

    it('when cursor names are different', function () {
      shouldUpdate(
        {cursor1: data.get('foo')}, null,
        {cursor2: data.get('foo')}, null
      );
    });

    it('when cursors are different', function () {
      shouldUpdate(
        {cursor: data.get('foo')}, null,
        {cursor: data.get('bar')}, null
      );
    });

    it('when one of multiple cursors is different', function () {
      shouldUpdate(
        {cursor: data.get('foo'), cursor2: data.get('bar')}, null,
        {cursor: data.get('foo'), cursor2: data.get('zod')}, null
      );
    });

    it('when cursors are same, with other props are diffent', function () {
      shouldUpdate(
        {cursor: data.get('foo'), prop: 42}, null,
        {cursor: data.get('foo'), prop: 43, prop2: 'qaz'}, null
      );
    });
  });

  describe('should not update', function () {
    it('when no data is passed to component', function () {
      shouldNotUpdate(null, null, null, null);
    });

    it('when deep state is same', function () {
      shouldNotUpdate(null, { foo: { bar : 'hello' } },
                      null, { foo: { bar : 'hello' } });
    });

    it('when cursors are same', function () {
      shouldNotUpdate(
        {cursor: data.get('foo')}, null,
        {cursor: data.get('foo')}, null
      );
    });

    it('when multiple cursors are same', function () {
      shouldNotUpdate(
        {cursor: data.get('foo'), cursor2: data.get('bar')}, null,
        {cursor2: data.get('bar'), cursor: data.get('foo')}, null
      );
    });

    it('when cursors are same, other props are same', function () {
      shouldNotUpdate(
        {cursor: data.get('foo'), prop: 42}, null,
        {cursor: data.get('foo'), prop: 42}, null
      );
    });
  });
});

function shouldNotUpdate () {
  callShouldUpdate.apply(null, arguments).should.equal(false);
}

function shouldUpdate () {
  callShouldUpdate.apply(null, arguments).should.equal(true);
}

function callShouldUpdate (props, state, nextProps, nextState) {
  props = props || {};
  state = state || {};
  nextProps = nextProps || {};
  nextState = nextState || {};

  return shouldComponentUpdate.call({
    props: props,
    state: state
  }, nextProps, nextState);
}
