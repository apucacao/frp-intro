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
          <li><Link to="example">Example</Link></li>
          <li><Link to="stream">Event stream</Link></li>
        </ul>
        <this.props.activeRouteHandler />
      </div>
    );
  }
});