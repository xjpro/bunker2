// Include SASS styling
require('./style/base.scss');

import React from 'react';
import ReactDOM  from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
	React.createElement(App, null),
	document.getElementById('bunker')
);