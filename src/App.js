import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './component/Clock/index.jsx';
import Test from './component/Test';
import LoginControl from './component/LoginControl';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Clock />
          <Test name="khkjhkj" obj={{name: "test"}} />
          <LoginControl />
        </div>
      </div>
    );
  }
}
export default App;
