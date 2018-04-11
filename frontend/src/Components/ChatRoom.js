import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import SendIcon from './sendIcon';
import Message from './Message';

class ChatRoom extends Component {

  constructor(props) {
    super(props);
    this.socket = io('http://localhost:5000');
    this.state = {
      action: 'START',
      message: '',
      chatHistory: []
    };
    this.socket.on('SERVER_ACTION', (payload) => {
      console.log('recieve << SERVER_ACTION', payload);
      this.addMessage(payload);
    });
  }

  componentDidMount() {
    this.scrollToBot();
  }

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
  }

  addMessage = (obj) => {
    const payload = {
      author: obj.author,
      action: obj.nextAction,
      message: obj.message
    };
    this.setState({ chatHistory: [...this.state.chatHistory, payload] });
    console.log(this.state.chatHistory);
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
    this.setState({ message: '', chatHistory: [...this.state.chatHistory, payload] });
  }

  changeHandler = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    const chats = this.state.chatHistory;
    return (
      <div className="chatroom">
        <h3>Chilltime</h3>
        <ul className="chats" ref="chats">
          {
            chats.map((obj, index) => {
              console.log(obj);
              return(
              <Message key={index} message={obj.message} author={obj.author} align="right" />
              )
          })
          }
        </ul>
        <form className="input" onSubmit={this.sendMessage}>
          <input
            type="text"
            value={this.state.message}
            onChange={this.changeHandler} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ChatRoom;
