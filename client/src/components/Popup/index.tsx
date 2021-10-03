import styles from './Popup.module.scss'
import axios from 'axios';
import React from 'react';
import {ChannelType} from "../../types"

type popupProps = {
    PopupVisible:boolean
    onClose: (PopupVisible:boolean) => void
    channels: Array<ChannelType>
    setChannels: (data: ChannelType[]) => void;
    setCurrentChannel: (data: Array<string>) => void;
}

const Popup: React.FC<popupProps> = ({PopupVisible, onClose, channels, setChannels, setCurrentChannel}) => {
    
    const textInput = React.useRef<HTMLInputElement>(null);

    const addChannel = async () => {
        let channelName = ''
        if (textInput && null !== textInput.current) { 
            channelName = textInput.current.value;
        }
        if (channelName === "" || !channelName.replace(/\s/g, '').length) { //checks if channelName is empty or contains only spaces
            return alert("Поле 'имя канала' должно быть заполнено");
        }
        if (channels.length >= 5) {
            return  alert("Одновременно не может существовать больше 5 каналов. Присоединитесь к существующему или подождите пока один из них не будет удален.");
        }
        const randomPicNumber = Math.floor(Math.random() * 3) + 1;
        const channel = {"author": "admin",
                         "name": channelName, 
                         "imgUrl": "dg"+ randomPicNumber +".png" };
        try {
            const response = await axios.post<any>('/channels', channel);
            if (response.status === 200) {

                setChannels([...channels, response.data]);
                setCurrentChannel([response.data._id, response.data.name]);
            }
        } catch (error) {
            alert("Не удалось создать канал")
        }
        onClose(!PopupVisible);
    }

    return(
    <div className={styles.overlay}>
        <div className={styles.popup}>
            <div className={styles.closeButton} onClick={() => onClose(!PopupVisible)}>X</div>
            <div className={styles.newChannelInfo}>
                {/* <div className={styles.channelPhoto}>
                    <img src='' alt="channel" />
                </div> */}
                <div className={styles.popupForm}>
                    <div className={styles.channelNameField}>
                        <input ref={textInput} type="text" placeholder="Название канала" required={true}/> 
                    </div>
                    <button onClick={addChannel}>Создать</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Popup;