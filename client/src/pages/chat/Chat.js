import React, { useState, useEffect } from 'react';
import Nav from '../Header/Header';
import { Container } from 'react-bootstrap';
//socket
//timeago
import io from 'socket.io-client';
import TimeAgo from 'react-timeago';
import { convertDate } from './../../utils/functions';
import './Chat.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Axios from 'axios';

import { baseUrl, baseFileUrl } from './../../baseUrl';
let chatSender = null;
let chatReciever = null;
let activeChat = null;
const socket = io('http://localhost:5000');
// const socket = io('https://dmcerp.herokuapp.com');
const Chat = (props) => {
  const [myChats, setmyChats] = useState([]);
  const [userChat, setuserChat] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isChats, setIsChats] = useState(true);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [reciever, setreciever] = useState('');
  const [messages, setMessages] = useState([]);
  const [isReciever, setIsReciever] = useState(false);
  const [sender, setSender] = useState('');
  const [chatRefresh, setChatRefresh] = useState(false);

  useEffect(() => {
    getSearchedUsers();
  }, []);

  useEffect(() => {
    socket.on('send_back_message', (result) => {
      setMessages((messages) => [...messages, result]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      const data = {
        sender: sender,
        reciever: reciever,
        message: message
      };

      socket.emit('sendMessage', data);
      setMessage('');
      Axios.post(baseUrl + '/chats/sendMessage', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
        .then((response) => {})
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  const getSingleChat = (senders, reciever) => {
    Axios.get(baseUrl + '/chats/getUserChat', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      },
      params: {
        sender: senders,
        reciever: reciever
      }
    })
      .then((response) => {
        setuserChat(response.data.data);
        setMessages(response.data.data[0].messages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSingleChatWithResult = (senders, reciever, result) => {
    Axios.get(baseUrl + '/chats/getUserChat', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      },
      params: {
        sender: senders,
        reciever: reciever
      }
    })
      .then((response) => {
        setuserChat(response.data.data);
        setMessages((messages) => [...response.data.data[0].messages, result]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let recieverId = props.match.params.id;
    let reciverdisplayName = props.match.params.displayName;
    activeChat = reciverdisplayName;
    setSender(localStorage.getItem('id'));

    chatSender = localStorage.getItem('id');
    chatReciever = recieverId;
    setreciever(recieverId);

    if (recieverId) {
      getSingleChat(localStorage.getItem('id'), recieverId);
      setIsReciever(true);
    } else {
      setIsReciever(false);
    }
    Axios.get(baseUrl + '/chats/getAllChats', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    })
      .then((response) => {
        setmyChats(response.data.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {}, [messages]);

  function getChat() {
    Axios.get(baseUrl + '/chats/getAllChats', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    })
      .then((response) => {
        setmyChats(response.data.data);
        getUserChat(response.data.data[0]);
        setChatRefresh(true);
      })
      .catch((error) => {});
  }
  const getSearchedUsers = () => {
    Axios.get(baseUrl + `/auth/searchUsers`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    })
      .then((response) => {
        console.log('response from search', response);
        setSearchedUsers(response.data.data);
      })
      .catch((error) => {});
  };
  const getUserChat = (chat) => {
    if (chat.sender.id === sender) {
      setreciever(chat.reciever.id);
      activeChat = chat.reciever.displayName;
      chatReciever = chat.reciever.id;
    } else {
      setreciever(chat.sender.id);
      chatReciever = chat.sender.id;
      activeChat = chat.sender.displayName;
    }
    getSingleChat(chat.sender.id, chat.reciever.id);
  };
  let count = 0;

  return (
    <div>
      <Nav></Nav>
      <Container fluid>
        <div className="container-fluid h-100 chat_root">
          <div className="row justify-content-center h-100">
            <div className="col-md-4 col-xl-3 chat">
              <div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                  <div className="input-group"></div>
                </div>
                <div className="card-body contacts_body">
                  <ui className="contacts">
                    {isChats ? (
                      myChats.length > 0 ? (
                        myChats.map((chat) => {
                          return (
                            <li
                              key={chat._id}
                              onClick={(e) => getUserChat(chat)}>
                              <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                  <img
                                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                    className="rounded-circle user_img"
                                  />
                                </div>
                                <div className="user_info">
                                  <span>
                                    {' '}
                                    {chat.sender.id === sender
                                      ? chat.reciever.displayName
                                      : chat.sender.displayName}
                                  </span>
                                  <p>{chat.lastMessageText}</p>
                                  <span className="chat_date">
                                    <TimeAgo date={chat.lastMessageTime} />{' '}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          <div className="d-flex bd-highlight">
                            <div className="user_info">
                              <span>User List</span>
                            </div>
                          </div>
                        </li>
                      )
                    ) : (
                      ''
                    )}
                    {searchedUsers.map((user) => {
                      if (user.id != localStorage.getItem('id')) {
                        return (
                          <a
                            href={`/chat/${user._id}/${user.displayName}`}
                            style={{ textDecoration: 'none', color: 'white' }}>
                            <li key={user._id}>
                              <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                  <img
                                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                    className="rounded-circle user_img"
                                  />
                                </div>
                                <div className="user_info">
                                  <span> {user.displayName}</span>
                                  <p>{user.email}</p>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      }
                    })}
                  </ui>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
            <div className="col-md-8 col-xl-6 chat">
              <div className="card">
                <div className="card-header msg_head">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img
                        src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                        className="rounded-circle user_img"
                      />
                      <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                      {activeChat == null ? (
                        <span>Select Chat</span>
                      ) : (
                        <span>Chat with {activeChat}</span>
                      )}

                      <p>{messages.length} Messages</p>
                    </div>
                  </div>
                </div>
                <div className="card-body msg_card_body">
                  {messages.length > 0 ? (
                    messages.map((message) => {
                      return message.sender === sender ? (
                        <div
                          key={message._id}
                          className="d-flex justify-content-end mb-4">
                          <div className="msg_cotainer_send">
                            {message.text}
                            <span className="msg_time_send">
                              {convertDate(message.createdAt)}
                            </span>
                          </div>
                          <div className="img_cont_msg">
                            <img
                              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                              className="rounded-circle user_img_msg"
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          key={message._id}
                          className="d-flex justify-content-start mb-4">
                          <div className="img_cont_msg">
                            <img
                              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                              className="rounded-circle user_img_msg"
                            />
                          </div>
                          <div className="msg_cotainer">
                            {message.text}
                            <span className="msg_time">
                              {convertDate(message.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img
                          src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                          className="rounded-circle user_img_msg"
                        />
                      </div>
                      <div className="msg_cotainer">
                        Empty Inbox
                        <span className="msg_time">Now</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <div className="input-group">
                    {/* <div className='input-group-append'>
                      <span className='input-group-text attach_btn'>
                        <i className='fas fa-paperclip'></i>
                      </span>
                    </div> */}
                    <textarea
                      name=""
                      className="form-control type_msg"
                      placeholder="Type your message..."
                      value={message}
                      onChange={({ target: { value } }) => setMessage(value)}
                      onKeyPress={(event) =>
                        event.key === 'Enter' ? sendMessage(event) : null
                      }></textarea>
                    <div className="input-group-append">
                      <span className="input-group-text send_btn">
                        <i className="fas fa-location-arrow"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Chat;
