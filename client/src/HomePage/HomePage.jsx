
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import Messages from './Messages';
import ChatInput from './ChatInput';
import './ChatApp.css';
import './App.css';

function compare(a, b) {
  if (a.createdAt < b.createdAt) { return -1; }
  if (a.createdAt > b.createdAt) { return 1; }
  return 0;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: localStorage.getItem('email'),
    };
    this.socket = openSocket('http://localhost:8000');
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      const { accessToken } = this.props.user.data;
      this.socket.emit('init', { accessToken });
    });

    this.socket.on('init', this.initialize.bind(this));
    this.socket.on('send:message', this.messageRecieve.bind(this));
    // this.socket.on('user:join', this.userJoined.bind(this));
    // this.socket.on('user:left', this.userLeft.bind(this));

    fetch('http://localhost:7777/message')
      .then(response => response.json())
      .then((data) => {
        const result = data.data;
        result.sort(compare);
        this.setState({ messages: result });
      });
  }

  onSendMessage(message) {
    const { username } = this.state;
    this.socket.emit('send:message', { text: message, author: username });
    this.addMessage({ author: username, body: message, fromMe: username, createdAt: new Date() });
  }

  addMessage(msg) {
    console.log('adding new message:', msg);
    const { messages } = this.state;
    this.setState({ messages: [...messages, msg] });
  }
  messageRecieve(message) {
    this.addMessage(message);
  }

  initialize(data) {
    const { users, name } = data;
    this.setState({ users, user: name });
  }

  render() {
    return (
      <div className="">
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.onSendMessage.bind(this)} />
        {/* <p><Link to="/login">Logout</Link></p> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication: { user } } = state;
  return { user };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
