/*** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Bacon = require('baconjs');
var StreamVis = require('./StreamVis');

module.exports = React.createClass({
  getInitialState: function() {
    var clicks = new Bacon.Bus()

    var values = clicks.map(1);

    var counter = values.scan(0, function(total, a) {
      return total + a;
    });

    return {
      clicks: clicks,
      values: values,
      counter: counter
    };
  },

  componentWillUnmount: function() {
    this.state.clicks.end();
  },

  handleClick: function(event) {
    this.state.clicks.push(event);
  },

  render: function() {
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
        <StreamVis label="clicks" stream={this.state.clicks} />
        <StreamVis label=".map(1)" stream={this.state.values} />
        <StreamVis label=".scan(0, sum)" stream={this.state.counter} />
      </div>
    );
  }
});