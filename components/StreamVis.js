/*** @jsx React.DOM */

'use strict';

require('../stylesheets/stream-vis.less');

var _ = require('lodash');
var React = require('react/addons');
var Bacon = require('baconjs');
var d3 = require('d3');
var TimerMixin = require('./mixins/Timer');

var width = 600;
var lifetime = 10000; // 10s

function prop(name) {
  return function(d) {
    return _.result(d, name);
  };
}

module.exports = React.createClass({
  mixins: [TimerMixin],

  componentDidMount: function() {
    var now = new Date().valueOf();
    var scale = d3.scale.linear().range([0, width]).domain([now - lifetime, now]);
    var chart = d3.select(this.refs.chart.getDOMNode());

    var events = [];

    var stream = this.props.stream.map(function(e) {
      return {
        time: new Date().valueOf(),
        value: e
      };
    });

    stream.onValue(function(e) {
      setTimeout(function() {
        events.shift();
      }, lifetime);

      return events.push(e);
    });

    chart.append('svg:line').attr({
      x1: 0,
      x2: width,
      y1: 35,
      y2: 35
    });

    this.timer.onValue(function(time) {
      var circles, labels;

      scale.domain([time - lifetime, time])

      // circles 

      circles = chart.selectAll('circle').data(events, prop('time'));

      circles.enter()
        .append('circle')
        .attr({
          cy: 35,
          r: 6
        });

      circles.attr('cx', function(d) {
        return scale(d.time);
      });

      circles.exit().remove();

      // labels
      
      labels = chart.selectAll('text').data(events, prop('time'));

      labels.enter()
        .append('text')
        .attr('y', 60)
        .attr('text-anchor', 'middle')
        .text(function(d) {
          return d.value;
        });

      labels.attr('x', function(d) {
        return scale(d.time);
      });

      labels.exit().remove();
    });
  },

  render: function() {
    return (
      <div className="row stream-vis">
        <h2>{this.props.label}</h2>
        <svg ref="chart"></svg>
      </div>
    );
  }
});