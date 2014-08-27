/*** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Bacon = require('baconjs');
var StreamVis = require('./StreamVis');

module.exports = React.createClass({
  getInitialState: function() {
    var plusOneClick = new Bacon.Bus();
    var minusOneClick = new Bacon.Bus();

    var plusOnes = plusOneClick.map(1);
    var minusOnes = minusOneClick.map(-1);

    var ones = plusOnes.merge(minusOnes);

    var value = ones.scan(0, function(total, a) {
      return total + a;
    });

    return {
      plusOneClick: plusOneClick,
      minusOneClick: minusOneClick,
      plusOnes: plusOnes,
      minusOnes: minusOnes,
      ones: ones,
      value: value
    };
  },

  componentWillUnmount: function() {
    this.state.plusOneClick.end();
    this.state.minusOneClick.end();
  },

  handlePlusOneClick: function(event) {
    this.state.plusOneClick.push(event);
  },

  handleMinusOneClick: function(event) {
    this.state.minusOneClick.push(event);
  },

  render: function() {
    return (
      <div>
        <button onClick={this.handleMinusOneClick}>-1</button>
        <button onClick={this.handlePlusOneClick}>+1</button>
        <StreamVis label="-1" stream={this.state.minusOnes} />
        <StreamVis label="+1" stream={this.state.plusOnes} />
        <StreamVis label="merged" stream={this.state.ones} />
        <StreamVis label="sum" stream={this.state.value} />
      </div>
    );
  }
});