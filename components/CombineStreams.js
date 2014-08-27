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

    return {
      plusOneClick: plusOneClick,
      minusOneClick: minusOneClick,
      plusOnes: plusOnes,
      minusOnes: minusOnes,
      ones: ones
    };
  },

  componentWillUnmount: function() {
    this.state.plusOneClick.end();
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
        <StreamVis label="both" stream={this.state.ones} />
      </div>
    );
  }
});