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
          <li><Link to="count-clicks">Example 1: counting clicks</Link></li>
          <li><Link to="combine-streams">Example 2: combining streams</Link></li>
          <li><Link to="transform-streams">Example 3: transforming streams</Link></li>
          <li><Link to="triple-clicks">Example 4: triple clicks</Link></li>
          <li><Link to="async-op">Example 5: async operation</Link></li>
        </ul>
        <this.props.activeRouteHandler />
      </div>
    );
  }
});