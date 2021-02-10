import React, { useState, useEffect } from "react";
import Nav from "../Header/Header";
import { Container } from "react-bootstrap";
//socket
//timeago
import { socket } from "../../socketService";
import TimeAgo from "react-timeago";
import { convertDate } from "./../../utils/functions";
import "./Chat.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import Axios from "axios";

import { baseUrl, baseFileUrl } from "./../../baseUrl";
let chatSender = null;
let chatReciever = null;
let activeChat = null;
const Chat = (props) => {
  const [myChats, setmyChats] = useState([]);
  const [userChat, setuserChat] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isChats, setIsChats] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [reciever, setreciever] = useState("");
  const [messages, setMessages] = useState([]);
  const [isReciever, setIsReciever] = useState(false);
  const [sender, setSender] = useState("");

  useEffect(() => {
    socket.on("message", (result) => {
      if (result.reciever == chatSender && result.sender == chatReciever) {
        setMessages((messages) => [...messages, result]);
        // $(".msg_history")
        //   .stop()
        //   .animate({ scrollTop: $(".msg_history")[0].scrollHeight }, 1000);
      } else if (result.sender == chatSender) {
        setMessages((messages) => [...messages, result]);
        // $(".msg_history")
        //   .stop()
        //   .animate({ scrollTop: $(".msg_history")[0].scrollHeight }, 1000);
      } else {
      }
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      const data = {
        sender: sender,
        reciever: reciever,
        message: message,
      };

      socket.emit("sendMessage", data);
      setMessage("");
      Axios.post(baseUrl + "/chats/sendMessage", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {})
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  const getSingleChat = (senders, reciever) => {
    Axios.get(baseUrl + "/chats/getUserChat", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      params: {
        sender: senders,
        reciever: reciever,
      },
    })
      .then((response) => {
        setuserChat(response.data.data);
        setMessages(response.data.data[0].messages);
        // $(".msg_history")
        //   .stop()
        //   .animate({ scrollTop: $(".msg_history")[0].scrollHeight }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let recieverId = props.match.params.id;
    let reciverdisplayName = props.match.params.displayName;
    activeChat = reciverdisplayName;
    setSender(localStorage.getItem("id"));

    chatSender = localStorage.getItem("id");
    chatReciever = recieverId;
    setreciever(recieverId);

    if (recieverId) {
      getSingleChat(localStorage.getItem("id"), recieverId);
      setIsReciever(true);
    } else {
      setIsReciever(false);
    }
    Axios.get(baseUrl + "/chats/getAllChats", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setmyChats(response.data.data);
      })
      .catch((error) => {});
  }, []);
  const getSearchedUsers = (searchedKeyword) => {
    console.log("searched", searchedKeyword);
    Axios.get(baseUrl + `/auth/searchUsers?displayName=${searchedKeyword}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("response from search", response);
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
  return (
    <div>
      <Nav></Nav>
      <Container fluid>
        <div class='container-fluid h-100'>
          <div class='row justify-content-center h-100'>
            <div class='col-md-4 col-xl-3 chat'>
              <div class='card mb-sm-3 mb-md-0 contacts_card'>
                <div class='card-header'>
                  <div class='input-group'>
                    <input
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setIsChats(false);
                          getSearchedUsers(e.target.value);
                          setSearch(e.target.value);
                        } else {
                          setIsChats(true);
                          setSearch(e.target.value);
                        }
                      }}
                      value={search}
                      type='text'
                      placeholder='Search...'
                      name=''
                      class='form-control search'
                    />
                    <div class='input-group-prepend'>
                      <span class='input-group-text search_btn'>
                        <i class='fas fa-search'></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class='card-body contacts_body'>
                  <ui class='contacts'>
                    {isChats ? (
                      myChats.length > 0 ? (
                        myChats.map((chat) => {
                          return (
                            <li
                              key={chat._id}
                              onClick={(e) => getUserChat(chat)}
                            >
                              <div class='d-flex bd-highlight'>
                                <div class='img_cont'>
                                  <img
                                    src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
                                    class='rounded-circle user_img'
                                  />
                                </div>
                                <div class='user_info'>
                                  <span>
                                    {" "}
                                    {chat.sender.id === sender
                                      ? chat.reciever.displayName
                                      : chat.sender.displayName}
                                  </span>
                                  <p>{chat.lastMessageText}</p>
                                  <span className='chat_date'>
                                    <TimeAgo date={chat.lastMessageTime} />{" "}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          <div class='d-flex bd-highlight'>
                            <div class='user_info'>
                              <span>Empty Chat</span>
                              <p>Search Users And Chat</p>
                            </div>
                          </div>
                        </li>
                      )
                    ) : searchedUsers.length > 0 ? (
                      searchedUsers.map((user) => {
                        return (
                          <a
                            href={`/chat/${user._id}/${user.displayName}`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            <li key={user._id}>
                              <div class='d-flex bd-highlight'>
                                <div class='img_cont'>
                                  <img
                                    src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
                                    class='rounded-circle user_img'
                                  />
                                </div>
                                <div class='user_info'>
                                  <span> {user.displayName}</span>
                                  <p>{user.email}</p>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      })
                    ) : (
                      <li>
                        <div class='d-flex bd-highlight'>
                          <div class='user_info'>
                            <span>Searching</span>
                            <p>No User Found...</p>
                          </div>
                        </div>
                      </li>
                    )}
                  </ui>
                </div>
                <div class='card-footer'></div>
              </div>
            </div>
            <div class='col-md-8 col-xl-6 chat'>
              <div class='card'>
                <div class='card-header msg_head'>
                  <div class='d-flex bd-highlight'>
                    <div class='img_cont'>
                      <img
                        src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
                        class='rounded-circle user_img'
                      />
                      <span class='online_icon'></span>
                    </div>
                    <div class='user_info'>
                      {activeChat == null ? (
                        <span>Select Chat</span>
                      ) : (
                        <span>Chat with {activeChat}</span>
                      )}

                      <p>{messages.length} Messages</p>
                    </div>
                  </div>
                  <span id='action_menu_btn'>
                    <i class='fas fa-ellipsis-v'></i>
                  </span>
                </div>
                <div class='card-body msg_card_body'>
                  {messages.length > 0 ? (
                    messages.map((message) => {
                      return message.sender === sender ? (
                        <div
                          key={message._id}
                          class='d-flex justify-content-end mb-4'
                        >
                          <div class='msg_cotainer_send'>
                            {message.text}
                            <span class='msg_time_send'>
                              {convertDate(message.createdAt)}
                            </span>
                          </div>
                          <div class='img_cont_msg'>
                            <img
                              src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
                              class='rounded-circle user_img_msg'
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          key={message._id}
                          class='d-flex justify-content-start mb-4'
                        >
                          <div class='img_cont_msg'>
                            <img
                              src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
                              class='rounded-circle user_img_msg'
                            />
                          </div>
                          <div class='msg_cotainer'>
                            {message.text}
                            <span class='msg_time'>
                              {convertDate(message.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class='d-flex justify-content-start mb-4'>
                      <div class='img_cont_msg'>
                        <img
                          src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
                          class='rounded-circle user_img_msg'
                        />
                      </div>
                      <div class='msg_cotainer'>
                        Empty Inbox
                        <span class='msg_time'>Now</span>
                      </div>
                    </div>
                  )}
                </div>
                <div class='card-footer'>
                  <div class='input-group'>
                    {/* <div class='input-group-append'>
                      <span class='input-group-text attach_btn'>
                        <i class='fas fa-paperclip'></i>
                      </span>
                    </div> */}
                    <textarea
                      name=''
                      class='form-control type_msg'
                      placeholder='Type your message...'
                      value={message}
                      onChange={({ target: { value } }) => setMessage(value)}
                      onKeyPress={(event) =>
                        event.key === "Enter" ? sendMessage(event) : null
                      }
                    ></textarea>
                    <div class='input-group-append'>
                      <span class='input-group-text send_btn'>
                        <i class='fas fa-location-arrow'></i>
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
