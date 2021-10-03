import styles from './Footer.module.scss'
import { Link } from "react-router-dom";
import Toggle from '../Toggle';

type footerProps = {
    isFooterVisible: boolean
}


const Footer: React.FC<footerProps> = (props) => {
    return(
    <footer className={props.isFooterVisible ? '' : styles.disappear}>
        <div className={styles.footerMenu}>
            <ul className={styles.footerLinks}>
                <li>
                    <Toggle />
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li><a href="https://t.me/ClockworkSilvio">contact me</a></li>
            </ul>
        </div>
        <div className={styles.copyright}>
            © prod by <a href="https://github.com/ClockworkSilvio">ClockworkSilvio</a>, 2021
        </div>
    </footer>
    );
}
export default Footer;