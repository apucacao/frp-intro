/*** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Bacon = require('baconjs');
var StreamVis = require('./StreamVis');

var delay = 300;

module.exports = React.createClass({
  getInitialState: function() {
    var clicks = new Bacon.Bus();

    var buffered = clicks
      .bufferWithTime(delay)
      .map('.length');

    var triples = buffered
      .filter(function(size) {
        return size >= 3;
      });

    return {
      clicks: clicks,
      buffered: buffered,
      triples: triples
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
        <StreamVis label={`last ${delay}ms`} stream={this.state.buffered} />
        <StreamVis label="triple clicks" stream={this.state.triples} />
      </div>
    );
  }
});