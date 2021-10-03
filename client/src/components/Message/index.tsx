import styles from './Message.module.scss'
// import replyIcon from '../../img/reply-icon.svg'
type MessageProps = {
    author: string
    text: string
    date: string
}

const Message: React.FC<MessageProps> = ({author, text, date}) => {
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
        <div className={styles.reply}>
            {/* <img src={replyIcon} alt="reply"></img> */}
        </div>
        <div className={styles.info}>
            <span className={styles.messagerName}>{author}</span>
            <span className={styles.dateInfo}>{formatDate(msgDate)}</span>
        </div>

        <p>{text}</p>
    </div>
    );
}
export default Message;