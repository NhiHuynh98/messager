import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPaperPlane,
  faPaperclip,
  faTableColumns
} from "@fortawesome/free-solid-svg-icons";

import {
  Avatar,
  Button,
  Flex,
  Radio,
  RadioChangeEvent,
  Select,
  Spin,
  Switch,
  Typography
} from "antd";

import "./Chat.less";
import { UserOutlined } from "@ant-design/icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { Input } from "../../components";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Message, changeMode, createMessage, changeKeyLengthDH, changeKeyLengthECC, changeKeyLengthRSA } from "../../redux/message";

import { io } from "socket.io-client";
const { Title } = Typography;

const Chat = () => {
  const socket = io("http://localhost:5000");

  const dispatch: AppDispatch = useDispatch();
  const { messages, keyLengthDH, keyLengthECC, loading } = useSelector((state: RootState) => state.messages);

  const [newMessage, setNewMessage] = useState("");
  const [msg, setMsg] = useState<Message[]>([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      let newMess: any = {
        id: Date.now(),
        content: {
          body: {
            text: newMessage,
            type: "TEXT"
          }
        },
        sender: "bot",
        destinations: {
          to: "user"
        },
        replace: function (arg0: RegExp, arg1: string): string {
          throw new Error("Function not implemented.");
        }
      };
      console.log("newMess", newMess);
      setNewMessage('');
      dispatch(createMessage(newMess))
        .unwrap()
        .then((message) => {
          setMsg(message);
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

  const [DH, setDH] = useState(false);

  const onChangeDH = (checked: boolean) => {
    setDH(checked);
    dispatch(changeMode(checked ? "addDH" : "rmDH"))
      .unwrap()
      .then((mode) => {
        console.log("Mode changed successfully:", mode);
      })
      .catch((error) => {
        console.error("Failed to change mode:", error);
      });
  };

  const [RSA, setRSA] = useState(false);

  const onChangeRSA = (checked: boolean) => {
    setRSA(checked);
    dispatch(changeMode(checked ? "addRSA" : "rmRSA"))
      .unwrap()
      .then((mode) => {
        console.log("Mode changed successfully:", mode);
      })
      .catch((error) => {
        console.error("Failed to change mode:", error);
      });
  };

  const [ECC, setECC] = useState(false);

  const onChangeECC = (checked: boolean) => {
    setECC(checked);
    dispatch(changeMode(checked ? "addECC" : "rmECC"))
      .unwrap()
      .then((mode) => {
        console.log("Mode changed successfully:", mode);
      })
      .catch((error) => {
        console.error("Failed to change mode:", error);
      });
  };

  const [valueAutoDelete, setAutoDelete] = useState("Off");
  const onAutoDelete = (e: RadioChangeEvent) => {
    setAutoDelete(e.target.value);
  };

  const hdKeyLengthDH = (value) => {
    dispatch(changeKeyLengthDH(value))
      .unwrap()
      .then((keyLength) => {
        console.log("Key length changed successfully:", keyLength);
      })
      .catch((error) => {
        console.error("Failed to change key length:", error);
      });
  };

  const hdKeyLengthECC = (value) => {
    dispatch(changeKeyLengthECC(value))
    .unwrap()
    .then((keyLength) => {
      console.log("Key length changed successfully:", keyLength);
    })
    .catch((error) => {
      console.error("Failed to change key length:", error);
    });
  }

  const hdKeyLengthRSA = (value) => {
    dispatch(changeKeyLengthRSA(value))
    .unwrap()
    .then((keyLength) => {
      console.log("Key length changed successfully:", keyLength);
    })
    .catch((error) => {
      console.error("Failed to change key length:", error);
    });
  }

  console.log("message", messages);
  return (
    <div className="specific-chat">
      <Spin spinning={loading} percent="auto" fullscreen />

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
              {msg.map((mess) => (
                <div
                  key={mess.id}
                  className={`chat-message ${mess.sender === "user" ? "user" : "bot"}`}
                  data-id={mess.id}
                >
                  <Avatar size={35} icon={<UserOutlined />} />
                  <div>{mess?.content?.body?.text}</div>
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
            <Flex vertical gap="middle" style={{ padding: 15 }}>
              <Flex vertical gap="small">
                <Title level={5}>End to end encryption</Title>
                <Flex vertical gap="middle" style={{ padding: 10 }}>
                  <Flex justify="space-between">
                    <Typography>Use DH:</Typography>
                    <Switch value={DH} onChange={onChangeDH} />
                  </Flex>
                  {DH && (
                    <Flex gap="small" align="center" justify="space-between">
                      <Typography>Key Length: </Typography>
                      <Select
                        defaultValue="1024"
                        style={{ width: 120 }}
                        onChange={hdKeyLengthDH}
                        value={keyLengthDH}
                        options={[
                          { value: "1024", label: "1024" },
                          { value: "2048", label: "2048" },
                          { value: "3072", label: "3072" },
                          { value: "4096", label: "4096" },
                          { value: "8192", label: "8192" }
                        ]}
                      />
                    </Flex>
                  )}

                  <Flex justify="space-between">
                    <Typography>Use RSA:</Typography>
                    <Switch value={RSA} onChange={onChangeRSA} />
                  </Flex>

                  {RSA && (
                    <Flex gap="small" align="center" justify="space-between">
                      <Typography>Key Length: </Typography>
                      <Select
                        defaultValue="1024"
                        style={{ width: 120 }}
                        onChange={hdKeyLengthRSA}
                        options={[
                          { value: "1024", label: "1024" },
                          { value: "2048", label: "2048" },
                          { value: "3072", label: "3072" },
                          { value: "4096", label: "4096" },
                          { value: "8192", label: "8192" }
                        ]}
                      />
                    </Flex>
                  )}

                  <Flex justify="space-between">
                    <Typography>Use ECC:</Typography>
                    <Switch value={ECC} onChange={onChangeECC} />
                  </Flex>

                  {ECC && (
                    <Flex gap="small" align="center" justify="space-between">
                      <Typography>Key Length: </Typography>
                      <Select
                        defaultValue="P-256"
                        value={keyLengthECC}
                        style={{ width: 120 }}
                        onChange={hdKeyLengthECC}
                        options={[
                          { value: "P-192", label: "P-192" },
                          { value: "P-233", label: "P-233" },
                          { value: "P-224", label: "P-224" },
                          { value: "P-256", label: "P-256" }
                        ]}
                      />
                    </Flex>
                  )}
                </Flex>

                <Button color="danger" variant="outlined">
                  Analytic
                </Button>
              </Flex>

              <Flex vertical gap="middle">
                <Title level={5}> Auto Delete </Title>
                <Radio.Group
                  onChange={onAutoDelete}
                  value={valueAutoDelete}
                  options={[
                    {
                      label: "Off",
                      value: "Off"
                    },
                    {
                      label: "After 1 week",
                      value: "After 1 week"
                    },
                    {
                      label: "After 1 month",
                      value: "After 1 month"
                    }
                  ]}
                ></Radio.Group>
                <Typography> Set custom time</Typography>
              </Flex>

              {/* <Flex vertical gap="small" style={{ padding: 10, width: 120 }}>
              <Flex className="document" align="center" justify="center">
                <FontAwesomeIcon icon={faFile} fontSize="35px" />
              </Flex>
              <span style={{ textAlign: "center" }}>Invoice.pdf</span>
            </Flex> */}
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Chat;
