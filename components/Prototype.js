/*** @jsx React.DOM */

'use strict';

var React = require('react/addons');
var Link = require('react-router/Link');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>FRP Intro</h1>
        <ul>
          <li><Link to="example-1">Example 1: counting clicks</Link></li>
          <li><Link to="example-2">Example 2: combining streams</Link></li>
          <li><Link to="example-3">Example 3: transforming streams</Link></li>
          <li><Link to="example-4">Example 4: triple clicks</Link></li>
          <li><Link to="example-5">Example 5: async operation</Link></li>
        </ul>
        <this.props.activeRouteHandler />
      </div>
    );
  }
});