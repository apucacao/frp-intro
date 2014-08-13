/*** @jsx React.DOM */

'use strict';

var React = require('react/addons');
var Link = require('react-router/Link');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li><Link to="example">Example</Link></li>
        </ul>
        <this.props.activeRouteHandler />
      </div>
    );
  }
});