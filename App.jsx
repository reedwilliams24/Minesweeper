var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./components/Game');

var App = React.createClass({
  render: function() {
    return (
      <Game/>
    );
  }
});

window.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<App/>, document.getElementById('mount'));
});
