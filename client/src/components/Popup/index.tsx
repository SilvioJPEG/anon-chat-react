import styles from './Popup.module.scss'
import axios from 'axios';
import React from 'react';
import { useTypedSelector } from '../../redux/reducers';
import { useDispatch } from 'react-redux';

type popupProps = {
    setCurrentChannel: (data: Array<string>) => void;
}

const Popup: React.FC<popupProps> = ({setCurrentChannel}) => {
    const dispatch = useDispatch();
    const channels = useTypedSelector(state => state.channelReducer.channelList);
    const textInput = React.useRef<HTMLInputElement>(null);
    const [fadeOut, SetFadeOut] = React.useState<boolean>(false);

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
                dispatch({type:"CHANNELS:SET_CHANNELS", payload: [response.data]});
                setCurrentChannel([response.data._id, response.data.name]);
            }
        } catch (error) {
            alert("Не удалось создать канал")
        }
        ClosePopup();
    }
    const ClosePopup = () => {
        SetFadeOut(!fadeOut);
        setTimeout(()=>{
            SetFadeOut(!fadeOut);
            dispatch({type:"POPUP:SET_VISIBLE"});
        }, 300);
    }
    return(
    <div className={styles.overlay}>
        <div className={styles.popup} id={fadeOut? styles.slideDown : ''}>
            <div className={styles.closeButton} onClick={ClosePopup}>X</div>
            <div className={styles.newChannelInfo}>
                <div className={styles.popupForm}>
                    <div className={styles.channelNameField}>
                        <input ref={textInput} type="text" placeholder="Channel name" required={true}/> 
                    </div>
                    <button onClick={addChannel}>Создать</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Popup;