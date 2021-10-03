import React from "react";
import axios from "axios";
import Channel from "../components/Channel";
import Message from "../components/Message";
import Popup from "../components/Popup";
import {ChannelType, MessageType} from "../types"


function Chat() {
    const [PopupVisible, SetPopupVisible] = React.useState<boolean>(false); //makes popup visible by clicking on "add new channel"
    const [channels, setChannels] = React.useState<ChannelType[]>([]); //list of channels that shows in side bar
    const [searchValue, setSearchValue] = React.useState<string>(''); //Handles search values for channel list
    const [messages, setMessages] = React.useState<MessageType[]>([]); //list of messages that currently displays at messageHistory
    const [currentChannel, setCurrentChannel] = React.useState<Array<string>>(['', '']); // current channel that user choose
    const [usernameValue, setUsernameValue] = React.useState<string>('Anonymous');

    React.useEffect(() => {
        axios.get('/channels').then((res) => {
            setChannels(res.data);
        });
    }, [])

    const onChangeSearchInput = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchValue(event.target.value);
    }

    const onChangeUsernameUnput = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsernameValue(event.target.value);
    }

    React.useEffect(() => {
        let chatHistory = document.getElementById('chatHistory');
        if (chatHistory) {
            chatHistory.scrollTo(0, 99999);
        }
    }, [messages])

    const GetNewMessages = () => {
        axios.get(`/messages/${currentChannel[0]}`).then((res) => {
            setMessages(res.data);
        });
    }

    const SendMessage = () => {
        if (!usernameValue.replace(/\s/g, '').length) {
            alert('введите имя пользователя');
            return;
        } 
        let inputField =  document.getElementById('inputField');
        let msgText = ''
        if (inputField) {
            msgText =  inputField.innerHTML;
            if (msgText.replace(/\s/g, '').length) {
                const new_msg = {"chat_id": currentChannel[0], "author": usernameValue, "text": msgText};
                try {
                    axios.post("/messages", new_msg).then(() => {
                        GetNewMessages();
                    });
                    inputField.innerHTML='';
                } catch (error) {
                    alert('не удалось отправить сообщение')
                }
            }
        }
    }

    return(
    <div className="wrapper">
        {PopupVisible && <Popup  key={1}
            PopupVisible={PopupVisible}
            onClose={SetPopupVisible}
            channels={channels}
            setChannels={setChannels}
            setCurrentChannel={setCurrentChannel}
        />}
        <div className="sideWrapper">
            <div className="searchBar">
                <input type="text" name="search" id="searchChannel" autoCapitalize="off" autoComplete="off" spellCheck="false"  onChange={onChangeSearchInput} value={searchValue}  placeholder="Поиск" />
            </div>
            <div className="channelList">
                {channels.filter((obj: ChannelType) => obj.name.toUpperCase().includes(searchValue.toUpperCase())).map((obj: ChannelType) => (
                    <Channel 
                        key={obj._id}
                        setCurrentChannel={setCurrentChannel}
                        setMessages={setMessages}
                        {... obj}
                    />))}
                <div className="channelAdder" onClick={()=>SetPopupVisible(!PopupVisible)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 52 52"><path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"  fill="var(--textColor)"/><path d="M38.5 25H27V14c0-.553-.448-1-1-1s-1 .447-1 1v11H13.5c-.552 0-1 .447-1 1s.448 1 1 1H25v12c0 .553.448 1 1 1s1-.447 1-1V27h11.5c.552 0 1-.447 1-1s-.448-1-1-1z" fill="var(--textColor)"/></svg>
                    <span>Добавить новый канал</span>
                </div>
            </div>
        </div>
        <div className="chatBody">
        {currentChannel[0] && 
            <div className="chatHeader">
                <b>{currentChannel[1]}</b>
                <div className="chatStat">
                    <span>{messages.length} messages</span>
                </div>
            </div>}
            <div id="chatHistory">
                {messages.map((obj: MessageType) => (
                    <Message 
                    key = {obj._id}
                    {... obj}
                    />
                ))}
            </div>
            {currentChannel[0] &&
            <div className="chatInputForm">
                <input className="userNameField" onChange={onChangeUsernameUnput} value={usernameValue} placeholder="Username"/>
                <div className="updateButton" onClick={GetNewMessages}>get new messages</div>
                <div className="textField">
                    <div id="inputField" contentEditable={true} suppressContentEditableWarning={true}></div>
                    <button className="msgSendButton" onClick={SendMessage} />
                </div>
            </div>}
        </div>
    </div>
    );
}

export default Chat;