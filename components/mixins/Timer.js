/*** @jsx React.DOM */

'use strict';

var Bacon = require('baconjs');

var time = Bacon.fromPoll(1000 / 30, function() {
  return new Bacon.Next(new Date().valueOf());
});

module.exports = {
  componentDidMount: function() {
    this.timer = time;
  }
};