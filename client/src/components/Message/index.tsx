import { MessageType } from '../../types';
import styles from './Message.module.scss';
import emoteListJson from "../../data/emotesData/CustomEmotes.json";
import {emoteObject, emoteObjectExt, textFragmentObject, emoteFragmentObject} from "../../types";
import replyIcon from "../../assets/reply-icon.svg";
import { useDispatch } from 'react-redux';
const basePublicURI = 'http://localhost:3001/public/';

const putEmoteInText = (textBody:string) => {
    let emotes: Array<emoteObject> = emoteListJson.emoteList;
    let newTextBody: Array<textFragmentObject | emoteFragmentObject> = [];
    let FirstEmote: emoteObjectExt | null = null;
    
    while (textBody.length) {
        let iOfFirstEmote = -2;
        for (let i=0; i < emotes.length; i++) {
            let indexOfEmote = textBody.indexOf(emotes[i].emoteName);
            if (iOfFirstEmote === -2 && indexOfEmote !== -1) {
                iOfFirstEmote = indexOfEmote;
                FirstEmote = {
                    emoteName: emotes[i].emoteName,
                    emoteURI: emotes[i].emoteURI,
                    indexOfEmote: iOfFirstEmote
                };
            }
            if (indexOfEmote < iOfFirstEmote && indexOfEmote !== -1) {
                iOfFirstEmote = indexOfEmote;
                FirstEmote = {
                    emoteName: emotes[i].emoteName,
                    emoteURI: emotes[i].emoteURI,
                    indexOfEmote: iOfFirstEmote
                };
            }
        }
        if (iOfFirstEmote !== -2 && FirstEmote !== null) {
            let subTextBefore = textBody.substring(0, iOfFirstEmote);
            if (subTextBefore.length) {
                newTextBody.push({type:"text", data: subTextBefore});
            }
            newTextBody.push({type:"emote", data: FirstEmote});
            textBody = textBody.substring(iOfFirstEmote + FirstEmote.emoteName.length);
        } else {
            newTextBody.push({type:"text", data: textBody});
            textBody = ''; 
        }
    }
    return newTextBody;
}
interface MessageProps extends MessageType {
    messages: Array<MessageType>
}
const Message: React.FC<MessageProps> = ({_id, author, text, date, attachments, replyTo_id, messages}) => {
    const dispatch = useDispatch();
    let msgDate = new Date(date);
    const formatDate = (datestamp: Date) => {
        var dd = String(datestamp.getDate()).padStart(2, '0');
        var mm = datestamp.toLocaleString('default', { month: 'short' });
        let hour = String(datestamp.getHours()).padStart(2, '0');
        let min = String(datestamp.getMinutes()).padStart(2, '0');
        let res = hour +':'+ min +'  ' + dd+' '+ mm; 
        return(res);
    }

    return(
    <div className={styles.messageBody}>
        <div className={styles.info}>
            <span className={styles.messagerName}>{author}</span>
            <span className={styles.dateInfo}>{formatDate(msgDate)}</span>
            <div className={styles.reply} onClick={() => {dispatch({type:"MESSAGES:SET_REPLY", payload: _id})}}>
                <img src={replyIcon} alt="reply"></img>
            </div>
        </div>
        {replyTo_id && <div className={styles.replyContainer}>
        {messages.filter((msg:MessageType) => msg._id === replyTo_id).map((msg:MessageType)=>(
                <div key={msg._id} className={styles.replyToInfo}>
                    <span className={styles.replyToAuthor}>{msg.author}</span>
                    <span className={styles.replyToText}>{msg.text}</span>
                </div> 
                ))}
        </div>}
        <span className={styles.textBody}>
            {putEmoteInText(text).map((obj) => (obj.type === 'text' ? 
                <span key={obj.data} className={styles.textFragment}>{obj.data}</span> : 
                <span key={obj.data.indexOfEmote} className={styles.emoteFragment} data-text={obj.data.emoteName}> 
                    <img src={basePublicURI+"emotes/"+obj.data.emoteURI} alt={(obj.data.emoteName)} />
                </span>
                ))}
        </span>
        {attachments.length !== 0 && <div className={styles.imageHolder}>
             <img src={basePublicURI+"uploads/"+attachments[0]} alt={attachments[0]}/>
        </div>}
    </div> 
    );
}
export default Message;