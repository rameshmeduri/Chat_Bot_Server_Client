import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.js';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            action: 'START',
            message: ''
        };
        socket.on('SERVER_ACTION', (obj) => {
            console.log('recieve << SERVER_ACTION', obj);
            this.addMessage(obj);
        });
    }

    addMessage = (obj) => {
        const payload = {
            author: obj.author,
            message: obj.message
        };
        this.setState({ action: obj.nextAction, chats: [...this.state.chats, payload] });
    }

    onChange = (e) => {
        this.setState({ message: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            author: 'USER',
            action: this.state.action,
            message: this.state.message
        };
        console.log('emit >> CLIENT_ACTION', payload);
        socket.emit('CLIENT_ACTION', payload);
        this.setState({ message: '', chats: [...this.state.chats, payload] });
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

    render() {
        const { chats } = this.state;
        return (
            <div className="chatroom">
                <h3>v2</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((obj, index) => (
                            <Message key={index} author={obj.author} message={obj.message} />
                        ))
                    }
                </ul>
                <form className="input" onSubmit={this.onSubmit}>
                    <div className="input-group mb-3">
                        <input type="text"
                            className="form-control"
                            value={this.state.message}
                            onChange={this.onChange} />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="submit">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

export default ChatRoom;