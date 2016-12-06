// Include SASS styling
require('./style/base.scss');

import React from 'react';
import ReactDOM  from 'react-dom';
import Chat from './components/Chat.jsx';

ReactDOM.render(
	React.createElement(Chat, null),
	document.getElementById('bunker')
);