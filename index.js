/*** @jsx React.DOM */

'use strict';

var master = require('./stylesheets/master.less');

var React = require('react/addons');
var Routes = require('react-router/Routes');
var Route = require('react-router/Route');
var Prototype = require('./components/Prototype');
var CountClicks = require('./components/CountClicks');
var CombineStreams = require('./components/CombineStreams');
var TransformStreams = require('./components/TransformStreams');
var TripleClicks = require('./components/TripleClicks');
var AsyncOperation = require('./components/AsyncOperation');

React.renderComponent((
  <Routes>
    <Route handler={Prototype}>
      <Route name="count-clicks" handler={CountClicks} />
      <Route name="combine-streams" handler={CombineStreams} />
      <Route name="transform-streams" handler={TransformStreams} />
      <Route name="triple-clicks" handler={TripleClicks} />
      <Route name="async-op" handler={AsyncOperation} />
    </Route>
  </Routes>
), document.body);