import React from 'react';

import Message from './Message';
import DateLine from './DateLine';

class Messages extends React.Component {
  componentDidUpdate() {
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    let myEmail = localStorage.getItem('email');

    let groupMessages = [];
    var today = new Date();
    const {messages} = this.props;
    for (let i = 0; i < messages.length; i++) {
      var date = new Date(messages[i].createdAt);
      var timeDiff = Math.abs(today - date.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      if (groupMessages[diffDays] == null) {
        groupMessages[diffDays] = [];
      }
      groupMessages[diffDays].push(messages[i]);
    }
    groupMessages.reverse();
    groupMessages = groupMessages.map((messgesDate, index) => {
      const messages = messgesDate.map((message, i) => {
        return (
            <Message
              key={i}
              username={message.author}
              message={message.body}
              fromMe={message.author === myEmail} />
          );
      });
      return (<div key={index}>
        {/* <DateLine date={messgesDate[0].createdAt} /> */}
        {messages}
      </div>)
    })
    return (
      <div className='messages' id='messageList'>
        {groupMessages}
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
