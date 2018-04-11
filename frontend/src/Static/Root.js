import React, { Component } from 'react';
import './App.css';

import Chatroom from './Chatroom.js';

class Root extends Component {
  render() {
    return (
      <div className="App">
        <Chatroom />
      </div>
    );
  }
}

export default Root;
