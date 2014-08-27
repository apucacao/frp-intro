/*** @jsx React.DOM */

'use strict';

var master = require('./stylesheets/master.less');

var React = require('react/addons');
var Routes = require('react-router/Routes');
var Route = require('react-router/Route');
var Prototype = require('./components/Prototype');
var CountClicks = require('./components/CountClicks');
var TripleClicks = require('./components/TripleClicks');
var AsyncOperation = require('./components/AsyncOperation');

React.renderComponent((
  <Routes>
    <Route handler={Prototype}>
      <Route name="example-1" handler={CountClicks} />
      <Route name="example-2" handler={TripleClicks} />
      <Route name="example-3" handler={AsyncOperation} />
    </Route>
  </Routes>
), document.body);