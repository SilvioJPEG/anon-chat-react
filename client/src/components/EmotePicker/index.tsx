import styles from "./EmotePicker.module.scss";
import emoteListJson from "../../data/emotesData/CustomEmotes.json";
import { emoteObject } from "../../types";
const baseEmotesURI = 'http://localhost:3001/public/emotes/';

type EmoteProps = {
    inputFieldRef: React.RefObject<HTMLDivElement>
}

const EmotePicker: React.FC<EmoteProps> = (props) => {
    const emotes: Array<emoteObject> = emoteListJson.emoteList; 
    const printToChatInput = (text: string) => {
        if (props.inputFieldRef.current) {
            props.inputFieldRef.current.innerHTML=props.inputFieldRef.current.innerHTML + " " + text + " ";
        }
    }
    
    return(
        <div className={styles.emotePicker}>
            {emotes.map((obj)=>(
                <div className={styles.emoteItem} title={obj.emoteName} onClick={()=>printToChatInput(obj.emoteName)}>
                    <img src={baseEmotesURI+obj.emoteURI} alt={obj.emoteName} />
                </div>
            ))}
        </div>
    );
}

export default EmotePicker;