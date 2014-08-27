/*** @jsx React.DOM */

'use strict';

require('../stylesheets/stream-vis.less');

var React = require('react/addons');
var Bacon = require('baconjs');
var d3 = require('d3');

var now = new Date().valueOf();
var scale = d3.scale.linear().range([0, 600]).domain([now - 10000, now]);

var time = Bacon.fromPoll(1000 / 30, function() {
  return new Bacon.Next(new Date().valueOf());
});

time.map(function(t) {
  return [t - 10000, t];
}).onValue(function(extent) {
  return scale.domain(extent);
});

module.exports = React.createClass({
  componentDidMount: function() {
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
      }, 10000);

      return events.push(e);
    });

    chart.append('svg:line').attr({
      x1: 0,
      x2: 600,
      y1: 35,
      y2: 35
    });

    time.onValue(function() {
      var circles, labels;

      // circles 

      circles = chart.selectAll('circle').data(events, function(d) {
        return d.time;
      });

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
      
      labels = chart.selectAll('text').data(events, function(d) {
        return d.time;
      });

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