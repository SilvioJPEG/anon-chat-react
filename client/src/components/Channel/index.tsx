import styles from "./Channel.module.scss";
import axios from "axios";
import {MessageType} from "../../types"
type channelProps = {
    _id: string;
    name: string
    imgUrl: string
    setMessages: (data: MessageType[]) => void;
    setCurrentChannel: (data: Array<string>) => void;
    currentChannel: Array<string>

}
const Channel: React.FC<channelProps> = ({ _id, name, imgUrl, setMessages, setCurrentChannel, currentChannel}) => {
    const setChannelHistory = () => {
        setCurrentChannel([_id, name]);
        axios.get(`/messages/${_id}`).then((res) => {
            setMessages(res.data);
        });
    }

    return(
        <div className={styles.channel} id={currentChannel[0]===_id?styles.selected:''} onClick={currentChannel[0]!==_id ? setChannelHistory : undefined}>
            <div className={styles.channelPhoto}>
                <img className="channelImg" src={require("../../assets/"+imgUrl).default} alt="channel" style={document.body.className === "theme-dark"? {filter:"invert(1)"}:{}} />
            </div>
            <div className={styles.channelDescription}>
                <div className={styles.channelName}>
                    <span>{name}</span>
                </div>
                <div className={styles.preview}>
                    new channel
                </div> 
            </div>
        </div>
    );
}
export default Channel;
