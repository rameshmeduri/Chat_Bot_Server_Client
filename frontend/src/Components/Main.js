import React, { Component } from 'react';
import io from 'socket.io-client';

import SendIcon from './sendIcon';

class Main extends Component {

  constructor(props) {
    super(props);
    this.socket = io('http://localhost:5000');
    this.state = {      
      action: 'START',
      message: '',
      items: []
    };
    this.socket.on('SERVER_ACTION', (payload) => {
      console.log('recieve << SERVER_ACTION', payload);
      this.addMessage(payload);
    });
  }

  addMessage = (obj) => {
    const payload = {
      author: obj.author,
      action: obj.nextAction,
      message: obj.message
    };
    this.setState({ items: [...this.state.items, payload] });
    console.log(this.state.items);
  }

  sendMessage = (e) => {
    e.preventDefault();
    const payload = {
      author: 'USER',
      action: this.state.action,
      message: this.state.message
    };
    console.log('emit >> CLIENT_ACTION', payload);
    this.socket.emit('CLIENT_ACTION', payload);
    //this.setState({ message: '' });
    this.setState({ message: '', items: [...this.state.items, payload] });
  }

  changeHandler = (e) => {
    console.log(e.target.value);
    this.setState({ message: e.target.value });
  }

  render() {

    const list = this.state.items.reverse();

    return (
      <main className="container-fluid">
        <br />
        <div className="row">
          <div className="col">
            <h3>V2</h3>
            <div className="card">
              <div className="card-body">
                <div className="messages">
                  {
                    list.map((obj, index) => (
                      <div key={index}>{obj.author}: {obj.message}</div>
                    ))
                  }
                </div>
              </div>
              <form className="input-group mb-3" onSubmit={this.sendMessage}>
                <input type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.message}
                  onChange={this.changeHandler} />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="input-group-text sendBtn">
                    <SendIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col">
            <h3>Ticket</h3>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;
