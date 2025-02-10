import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faPaperclip,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

import { Avatar, Flex } from "antd";

import "./Chat.less";
import { UserOutlined } from "@ant-design/icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { Input } from "../../components";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Message, createMessage } from "../../redux/message";

import { io } from "socket.io-client";

const Chat = () => {
  const socket = io("http://localhost:5000");

  const dispatch: AppDispatch = useDispatch();
  const { messages } = useSelector(
    (state: RootState) => state.messages
  );

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim()) {
        let newMess: Message = {
          ...messages,
          id: Date.now(),
          content: {
            body: {
              text: newMessage,
              type: "TEXT",
            },
          },
          sender: "bot",
          destinations: {
            to: "user",
          },
          replace: function (arg0: RegExp, arg1: string): string {
            throw new Error("Function not implemented.");
          }
        };
        dispatch(createMessage(newMess))
        .unwrap()
        .then((message) => {
          console.log("Message sent successfully:", message);
        })
        .catch((error) => {
          console.error("Failed to send message:", error);
        });
      }

      // socket.on('messageFromServer', (data) => {
      //   console.log("message", data)
  
      //   // setReceivedMsg(data)
      //   // setMessage('')
      //   // socket.off('messageFromServer');
      // });
    
      return () => {
        socket.disconnect();
      };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDialogStorage = () => {
    setIsExpanded(!isExpanded);
  };

  console.log("message", messages);

  const arrayOfObjects = messages.map((mess) =>
    JSON.parse(mess?.replace(/'/g, '"'))
  );

  return (
    <div className="specific-chat">
      <Flex
        className="chat-body"
        gap="middle"
        style={{ width: "100%", height: 700 }}
      >
        <Flex vertical style={{ width: !isExpanded ? "80%" : "100%" }}>
          <Flex
            align="center"
            justify="space-between"
            className="chat-box-header"
          >
            <Flex align="center" gap="middle">
              <Avatar size={35} icon={<UserOutlined />} />
              <Flex vertical gap="small">
                <div className="bot-name">Team Imiri Soma</div>
                <div>We typical reply in a few minues</div>
              </Flex>
            </Flex>

            <FontAwesomeIcon
              onClick={toggleDialogStorage}
              icon={faTableColumns}
              className="icon-columns"
            />
          </Flex>
          <div className="chat-box">
            <div className="chat-messages">
              {arrayOfObjects.map((mess) => (
                <div
                  className={`chat-message ${mess.content} ${mess?.sender === "user" ? "user" : "bot"}`}
                >
                  <Avatar size={35} icon={<UserOutlined />} />
                  <div key={mess?.id}>{mess?.content?.body?.text}</div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <Input
                placeholder="Write a message"
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                value={newMessage}
                size="large"
                suffix={
                  <Flex gap="small">
                    <FontAwesomeIcon icon={faImage} />
                    <FontAwesomeIcon icon={faPaperclip} />
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      onClick={handleSendMessage}
                    />
                  </Flex>
                }
              />
            </div>
          </div>
        </Flex>
        {!isExpanded && (
          <Flex
            vertical
            gap="middle"
            className="storage-dialog"
            style={{ width: "20%" }}
          >
            <div className="storage-dialog-title">
              <div className="main">Dialog Storage Item</div>
              <div className="sub">Document Sharing</div>
            </div>

            <Flex vertical gap="small" style={{ padding: 10, width: 120 }}>
              <Flex className="document" align="center" justify="center">
                <FontAwesomeIcon icon={faFile} fontSize="35px" />
              </Flex>
              <span style={{ textAlign: "center" }}>Invoice.pdf</span>
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Chat;
