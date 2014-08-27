/*** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Bacon = require('baconjs');
var StreamVis = require('./StreamVis');

module.exports = React.createClass({
  getInitialState: function() {
    var clicks = new Bacon.Bus();

    var values = clicks.map(function(event) {
      return _.random(0, 500);
    });

    var asyncOperation = values.flatMapLatest(function(value) {
      return Bacon.fromCallback(function(callback) {
        setTimeout(function() {
          callback(value);
        }, _.random(0, 5000));
      });
    });

    var waiting = values.awaiting(asyncOperation);

    return {
      clicks: clicks,
      values: values,
      asyncOperation: asyncOperation,
      waiting: waiting
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
        <StreamVis label="values" stream={this.state.values} />
        <StreamVis label="async op" stream={this.state.asyncOperation} />
        <StreamVis label="waiting?" stream={this.state.waiting} />
      </div>
    );
  }
});