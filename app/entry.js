require('./style/base.scss');

var React = require('react');
var ReactDOM = require('react-dom');
var Chat = require('./components/Chat.jsx');

ReactDOM.render(React.createElement(Chat, null), document.getElementById('bunker'));