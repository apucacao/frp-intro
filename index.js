/*** @jsx React.DOM */

'use strict';

var master = require('./stylesheets/master.less');

var React = require('react/addons');
var Routes = require('react-router/Routes');
var Route = require('react-router/Route');
var Prototype = require('./components/Prototype');
var Example = require('./components/Example');
var EventStream = require('./components/EventStream');

React.renderComponent((
  <Routes>
    <Route handler={Prototype}>
      <Route name="example" handler={Example} />
      <Route name="stream" handler={EventStream} />
    </Route>
  </Routes>
), document.body);