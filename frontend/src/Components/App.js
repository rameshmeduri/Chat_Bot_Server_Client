import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Message from './Message';
import Timeline from './Timeline';

const socket = io('http://localhost:5000');

const initTimeline = () => {
    return [
        {
            event: 'STEP_1',
            completed: false,
            title: 'Type',
            desc: ''
        },
        {
            event: 'STEP_2',
            completed: false,
            title: 'ISIN',
            desc: ''
        },
        {
            event: 'STEP_3',
            completed: false,
            title: 'Quantity',
            desc: ''
        },
        {
            event: 'STEP_4',
            completed: false,
            title: 'Price',
            desc: ''
        },
        {
            event: 'STEP_5',
            completed: false,
            title: 'Book Trade',
            desc: ''
        },
        {
            event: 'END',
            completed: false,
            title: 'Status',
            desc: ''
        }
    ];
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTimeline: false,
            action: 'START',
            message: '',
            chatHistory: [],            
            timelineEvents: initTimeline()
        };
        socket.on('SERVER_ACTION', (obj) => {
            console.log('recieve << SERVER_ACTION', obj);
            this.addServerMsg(obj);
        });
    }

    addServerMsg = (obj) => {
        const payload = {
            author: obj.author,
            message: obj.nextMsg
        };

        this.setState({
            action: obj.nextAction,
            chatHistory: [...this.state.chatHistory, payload]
        });

        // Update Timeline Current Step Info
        const step = obj.timelineStep;
        if (step) {
            let newArr = [...this.state.timelineEvents];
            let foundItem = newArr.find((el) => el.event === step);
            foundItem.completed = true;
            foundItem.desc = obj.timelineMsg;

            if (obj.nextAction === 'END') {
                let lastItem = newArr[newArr.length - 1];
                lastItem.completed = true;
                lastItem.desc = obj.nextMsg;
                this.setState({ action: 'START' });
            }

            this.setState({
                showTimeline: true,
                timelineEvents: newArr
            });
        }
    }

    onChange = (e) => {
        this.setState({ message: e.target.value });
    }

    addClientMsg = (e) => {
        e.preventDefault();
        const action = this.state.action;
        const msg = this.state.message;
        if (action === 'STEP_1' || msg === 'CLEAR') {            
            this.setState({
                showTimeline: false,
                timelineEvents: initTimeline()
            });
        }
        const obj = {
            author: 'USER',
            action: this.state.action,
            message: msg
        };
        console.log('emit >> CLIENT_ACTION', obj);
        socket.emit('CLIENT_ACTION', obj);
        this.setState({ message: '', chatHistory: [...this.state.chatHistory, obj] });
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
        const { chatHistory, showTimeline, timelineEvents } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <br />
                        <div className="App">
                            <div className="chatroom">
                                <h3>V2</h3>
                                <ul className="chats" ref="chats">
                                    {
                                        chatHistory.map((obj, index) => (
                                            <Message key={index} author={obj.author} message={obj.message} />
                                        ))
                                    }
                                </ul>
                                <form className="input" onSubmit={this.addClientMsg}>
                                    <div className="input-group mb-3">
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.message}
                                            onChange={this.onChange} />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="submit">
                                                <i className="fas fa-paper-plane"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <br />
                        <Timeline events={timelineEvents} show={showTimeline} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;