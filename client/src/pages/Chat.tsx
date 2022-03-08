import React from "react";
import axios from "axios";
import Channel from "../components/Channel";
import Message from "../components/Message";
import Popup from "../components/Popup";
import Menu from "../components/Menu";
import ChatInput from "../components/ChatInput";
import { ChannelType, MessageType } from "../types";
import { io } from "socket.io-client";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../redux/reducers";

const socket = io();

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const channels = useTypedSelector(
    (state) => state.channelReducer.channelList
  );
  const [socketReadyStatus, setReadyStatus] = React.useState<
    "pending" | "ready"
  >("pending");
  const PopupVisible = useTypedSelector(
    (state) => state.componentsReducer.popupVisible
  );
  const MenuVisible = useTypedSelector(
    (state) => state.componentsReducer.menuVisible
  );
  const [typingUsers, setTypingUsers] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>(""); //Handles search values for channel list
  const [messages, setMessages] = React.useState<MessageType[]>([]); //list of messages that currently displays at messageHistory
  const [currentChannel, setCurrentChannel] = React.useState<Array<string>>([
    "",
    "",
  ]); // current channel that user choose

  React.useEffect(() => {
    axios.get("/channels").then((res) => {
      dispatch({ type: "CHANNELS:SET_CHANNELS", payload: res.data });
    });
  }, [dispatch]);

  const onChangeSearchInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchValue(event.target.value);
  };

  React.useEffect(() => {
    let chatHistory = document.getElementById("chatHistory");
    if (chatHistory) {
      chatHistory.scrollTo(0, 99999);
    }
  }, [messages]);

  React.useEffect(() => {
    socket.on("connect", () => {
      setReadyStatus("ready");
    });
    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
      setReadyStatus("pending");
    });
    socket.on("message", (channel, msg) => {
      if (currentChannel[0] === channel) {
        setMessages([...messages, msg]);
      }
    });
    socket.on("typing", (channel, username) => {
      if (currentChannel[0] === channel) {
        setTypingUsers([...typingUsers, username]);
      }
    });
    socket.on("notTyping", (channel, username) => {
      if (currentChannel[0] === channel) {
        setTypingUsers(typingUsers.filter((item) => item !== username));
      }
    });

  });

  const ChangeCurrentChannel = (newCurrentChannel: Array<string>) => {
    setCurrentChannel(newCurrentChannel);
    setTypingUsers([]);
  };
  const ReturnPlaceholder = (): string => {
    if (currentChannel[0] && socketReadyStatus === "pending") {
      return "Произошла ошибка и websocket отключился. Перезагрузите страницу.";
    } else if (!currentChannel[0] && socketReadyStatus === "ready") {
      return "Выберите канал из списка каналов слева.";
    }
    return "";
  };
  return (
    <div className="wrapper">
      {PopupVisible && <Popup setCurrentChannel={ChangeCurrentChannel} />}
      <div className="sideWrapper">
        {MenuVisible && <Menu />}
        <div className="sideWrapperMenu">
          <MenuOutlined
            className="menuButton"
            onClick={() => dispatch({ type: "MENU:SET_VISIBLE" })}
          />
          <input
            type="text"
            name="search"
            id="searchChannel"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck="false"
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search"
          />
        </div>
        <div className="channelList">
          {channels
            .filter((obj: ChannelType) =>
              obj.name.toUpperCase().includes(searchValue.toUpperCase())
            )
            .map((obj: ChannelType) => (
              <Channel
                key={obj._id}
                setCurrentChannel={ChangeCurrentChannel}
                setMessages={setMessages}
                currentChannel={currentChannel}
                {...obj}
              />
            ))}
        </div>
      </div>
      {currentChannel[0] && socketReadyStatus === "ready" && (
        <div className="chatBody">
          <div className="chatHeader">
            <b>{currentChannel[1]}</b>
            <div className="chatStat">
              <span>{messages.length} messages</span>
            </div>
          </div>
          <div className="chatWrapper">
            <div id="chatHistory">
              {messages.map((obj: MessageType) => (
                <Message key={obj._id} messages={messages} {...obj} />
              ))}
              <div id="nowTyping">
                {typingUsers.length !== 0 && (
                  <span>{typingUsers.toString() + " пишет сообщение..."}</span>
                )}
              </div>
            </div>
          </div>
          <ChatInput
            messages={messages}
            currentChannelId={currentChannel[0]}
            socket={socket}
          />
        </div>
      )}

      {(!currentChannel[0] || socketReadyStatus === "pending") && (
        <div className="noChatPlaceholder">
          <p>{ReturnPlaceholder()}</p>
        </div>
      )}
    </div>
  );
};
/* TODO:
    подгрузка последнего сообщения в блоке каналов.
*/
export default Chat;
