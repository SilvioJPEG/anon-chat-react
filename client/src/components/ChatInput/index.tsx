import styles from "./ChatInput.module.scss"
import React from "react";
import axios from "axios";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Socket } from "socket.io-client";
import { SendOutlined, FileAddOutlined, SmileOutlined } from '@ant-design/icons';
import { useTypedSelector } from "../../redux/reducers";
import EmotePicker from "../EmotePicker";
import { useDispatch } from "react-redux";
import { MessageType } from "../../types";

type chatInputProps = {
    messages: Array<MessageType>
    currentChannelId: string
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}


const ChatInput: React.FC<chatInputProps> = ({messages, currentChannelId, socket}) => {
    const dispatch = useDispatch();
    const usernameValue = useTypedSelector(state => state.userReducer.username);
    const EmotesVisible = useTypedSelector(state => state.componentsReducer.emotesVisible); 
    const replyMsg_id = useTypedSelector(state => state.MessagesReducer.reply_id);
    const [isTyping, SetIsTyping] = React.useState<boolean>(false);
    const [filePreview, setFilePreview] = React.useState<string>('');
    const [files, setFiles] = React.useState<[File] | null>(null);

    let inputFieldRef =  React.useRef<HTMLDivElement>(null);
    let inputFileRef = React.useRef<HTMLInputElement>(null);
    
    const onIncludeImagesClick = () => {
        inputFileRef.current?.click(); 
    }

    const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
        if (event.target.files) {
            const file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result == "string") {
                    setFiles([file]);
                    setFilePreview(reader.result);
                    event.target.value = '';
                }
            }
            reader.readAsDataURL(file);
            if (inputFieldRef.current) {
                inputFieldRef.current.focus();
            }
        }
    }
    const setEmotePickerVisible = () => {
        dispatch({type:"EMOTES:SET_VISIBLE"});
    }
    const removeImg = () => {
        setFilePreview('');
        setFiles(null);
    }


    const SendMessage = async () => {
        if (inputFieldRef.current) {
            let msgText =  inputFieldRef.current.innerHTML;
            if (msgText.replace(/\s/g, '').length) {
                msgText = msgText.replace("<div><br></div>","");
                let formData = new FormData();
                formData.append("chat_id", currentChannelId);
                formData.append("author", usernameValue);
                formData.append("text", msgText);
                formData.append("date", String(Date.now()));
                formData.append("attachments", (files!==null) ? files[0]:'');
                formData.append("replyTo_id", replyMsg_id);
                try {
                    const response = await axios.post("/messages", formData, {headers: {'Content-Type': 'multipart/form-data'}});
                    if (response.status === 200) {
                        removeImg();
                        inputFieldRef.current.innerHTML='';
                        socket.emit('MESSAGE:SEND', currentChannelId, response.data);
                        dispatch({type: "MESSAGES:SET_REPLY", payload: ''});
                    }
                } catch (error) {
                    alert('не удалось отправить сообщение')
                }
            }
        }
    }
    let timeout: NodeJS.Timeout;
    const handleSendMessage = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          SendMessage();
        }
        if (isTyping === false) {
            SetIsTyping(true);
            socket.emit('MESSAGE:TYPING', currentChannelId, usernameValue);
            timeout = setTimeout(()=>{
                SetIsTyping(false);
                socket.emit("MESSAGE:NOT_TYPING", currentChannelId, usernameValue);
            }, 2000);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                SetIsTyping(false);
                socket.emit("MESSAGE:NOT_TYPING", currentChannelId, usernameValue);
            }, 2000)
        }

    };
    return(
        <div className={styles.chatInputContainer}>
            {replyMsg_id && 
            <div className={styles.replyContainer}>
                {messages.filter((msg:MessageType) => msg._id === replyMsg_id).map((msg:MessageType)=>(
                    <div className={styles.replyToInfo}>
                        <span className={styles.replyToAuthor}>{msg.author}</span>
                        <span className={styles.replyToText}>{msg.text}</span>
                    </div> 
                ))}
                <div className={styles.replyToClose} onClick={() => {dispatch({type:"MESSAGES:SET_REPLY", payload:''})}}>X</div>
            </div>
            }

            <div className={styles.chatInputForm}>
                <div className={styles.textField}>
                    <FileAddOutlined id={styles.includeImagesBtn} onClick={onIncludeImagesClick} title="Add file"/>
                    {EmotesVisible && <EmotePicker 
                    inputFieldRef = {inputFieldRef}
                    />}
                    <div>
                        <SmileOutlined id={styles.emoteMenuBtn} className={EmotesVisible ? styles.emoteMenuBtnActive : ''}title="Emotes" onClick={setEmotePickerVisible}/>
                    </div>
                    <div id={styles.inputField} contentEditable={true} suppressContentEditableWarning={true} onKeyDown={handleSendMessage} ref={inputFieldRef}></div>
                    <SendOutlined className={styles.msgSendButton} onClick={SendMessage} title="send message"/>
                </div>
                <input id={styles.file} type="file" name="attachments" ref={inputFileRef} onChange={fileSelectedHandler}/>
                {filePreview && <div className={styles.imgHolder}>
                    <img src={filePreview} alt="" className="UploadedImg" />
                    <div className={styles.deleteImg} onClick={removeImg}>x</div>
                </div>}
            </div>
        </div>

    );
}

export default ChatInput;