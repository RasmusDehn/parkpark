import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Park from './Park';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Park />, document.getElementById('root'));

registerServiceWorker();
