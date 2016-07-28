var React = require('react');
var ReactDOM = require('react-dom');

var Game = React.createClass({
  render: function() {
    return (
      <div>
        Hello world
      </div>
    );
  }
});

window.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Game/>, document.getElementById('mount'));
});
