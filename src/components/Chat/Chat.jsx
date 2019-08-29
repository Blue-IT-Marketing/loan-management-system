import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

import './styles.css';

const Chat = () => {
  const addResponse = () => {
    addResponseMessage("Welcome to this awesome chat!");
  };

  const handleNewUserMessage = newMessage => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        profileAvatar={'avatart'}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      />
    </div>
  );
};


export default Chat;

