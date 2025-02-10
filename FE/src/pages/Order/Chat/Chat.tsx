import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faImage,
  faPaperPlane,
  faPaperclip,
  faPlus,
  faTableColumns
} from "@fortawesome/free-solid-svg-icons";

import { Avatar, Flex } from "antd";

import { Breadcrumb, Input } from "../../../components";
import "./Chat.less";
import { UserOutlined } from "@ant-design/icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";

const Chat = () => {
  const location = useLocation();
  const { order_id } = location.state || {};
  const navigate = useNavigate();

  const backPreviousPage = () => {
    navigate(-1);
  };

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: "user" }
      ]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDialogStorage = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Flex vertical gap="middle" className="specific-chat">
      <div className="chat-header">
        <Breadcrumb
          items={[
            {
              title: (
                <Flex align="center">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={backPreviousPage}
                  />
                  <span className="divider">|</span>
                  Order Categories
                </Flex>
              )
            },
            {
              title: `Order ID: ${order_id}`
            },
            {
              title: "Order-Specific Chat"
            }
          ]}
          className="custom-breadcrumb"
        />
      </div>

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
              {messages.map((message) => (
                <div
                  className={`chat-message ${message.sender === "user" ? "user" : "bot"}`}
                >
                  <Avatar size={35} icon={<UserOutlined />} />
                  <div key={message.id}>{message.text}</div>
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
    </Flex>
  );
};

export default Chat;
