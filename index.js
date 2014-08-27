/*** @jsx React.DOM */

'use strict';

var master = require('./stylesheets/master.less');

var React = require('react/addons');
var Routes = require('react-router/Routes');
var Route = require('react-router/Route');
var Prototype = require('./components/Prototype');
var Example1 = require('./components/Example1');

React.renderComponent((
  <Routes>
    <Route handler={Prototype}>
      <Route name="example-1" handler={Example1} />
    </Route>
  </Routes>
), document.body);