import React, { Component } from 'react';
import ChatRoom from './ChatRoom';

const styles = { border: '1px solid #ccc', borderTop: 0, borderBottom: 0 };

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href="">Velocity 2.0</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col" style={styles}>
              <br />
              <div className="App">
                <ChatRoom />
              </div>
            </div>
            <div className="col" style={styles}>
              <br />
              <h3>Ticket</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
