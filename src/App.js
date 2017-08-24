import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Park from './Park'


class App extends Component {
  renderParking() {
    return <Park />
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Park Park assignment</h2>
        </div>
        <p className="App-intro">
          {this.renderParking()}
        </p>
      </div>

    );
  }
}

export default App;
