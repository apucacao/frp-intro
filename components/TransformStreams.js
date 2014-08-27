/*** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Bacon = require('baconjs');
var StreamVis = require('./StreamVis');

function reverse(s) {
  return s.split('').reverse().join('');
}

module.exports = React.createClass({
  getInitialState: function() {
    var words = new Bacon.Bus();
    var reversedWords = words.map(reverse);

    return {
      words: words,
      reversedWords: reversedWords
    };
  },

  handleClick: function(event) {
    this.state.words.push(event.target.innerHTML);
  },

  render: function() {
    return (
      <div>
        <button onClick={this.handleClick}>hello</button>
        <button onClick={this.handleClick}>goodbye</button>
        <StreamVis label="words" stream={this.state.words} />
        <StreamVis label="reversed" stream={this.state.reversedWords} />
      </div>
    );
  }
});