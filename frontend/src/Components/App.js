import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Message from './Message';
import Timeline from './Timeline';

const socket = io('http://localhost:5000');

let initStatusArr = [
    {
        title: 'Type',
        desc: 'BUY',
        completed: false,
        event: 'STEP_1'
    },
    {
        title: 'ISIN',
        desc: '123',
        completed: false,
        event: 'STEP_2'
    },
    {
        title: 'Quantity',
        desc: '100',
        completed: false,
        event: 'STEP_3'
    },
    {
        title: 'Price',
        desc: '10.96',
        completed: false,
        event: 'STEP_4'
    },
    {
        title: 'Status',
        desc: 'Ticket #A123 has been Booked',
        completed: false,
        event: 'END'
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'START',
            message: '',
            chats: [],
            statusArr: initStatusArr
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

        this.setState({
            action: obj.nextAction,
            chats: [...this.state.chats, payload]
        });

        if (obj.completed) {
            let newArr = [...this.state.statusArr];
            let foundItem = newArr.find((el) => el.event === obj.completed);
            foundItem.completed = true;
            this.setState({statusArr: newArr});
        }

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
        const { chats, statusArr } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <br />
                        <div className="App">
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
                        </div>
                    </div>
                    <div className="col">
                        <br />
                        <h3>Ticket</h3>
                        <Timeline items={statusArr} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;