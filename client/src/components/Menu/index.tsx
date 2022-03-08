import styles from "./Menu.module.scss";
import defaultPhoto from "../../assets/userDefaultPhoto.jpg";
import {
  SettingOutlined,
  UserAddOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/reducers";

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const usernameValue = useTypedSelector((state) => state.userReducer.username);
  const [fadeOut, SetFadeOut] = React.useState<boolean>(false);
  const menuRef = React.useRef(null);

  const onChangeUsernameInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    dispatch({ type: "USERS:SET_USERNAME", payload: event.target.value });
    localStorage.setItem("name", event.target.value.toString());
  };
  const HandleChannelAdderClick = () => {
    dispatch({ type: "MENU:SET_VISIBLE" });
    dispatch({ type: "POPUP:SET_VISIBLE" });
  };

  function setTheme(themeName: string): void {
    localStorage.setItem("theme", themeName);
    document.body.className = themeName;
    const allChannelImgs = Array.from(
      document.getElementsByClassName(
        "channelImg"
      ) as HTMLCollectionOf<HTMLElement>
    );
    for (let i = 0; i < allChannelImgs.length; i++) {
      if (themeName === "theme-dark") {
        allChannelImgs[i].style.filter = "invert(1)";
      } else {
        allChannelImgs[i].style.filter = "";
      }
    }
  }

  const handleChangeThemeClick = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else {
      setTheme("theme-dark");
    }
  };

  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    React.useEffect(() => {
      /*Alert if clicked on outside of element*/
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          SetFadeOut(!fadeOut);
          setTimeout(() => {
            SetFadeOut(!fadeOut);
            dispatch({ type: "MENU:SET_VISIBLE" });
          }, 300);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(menuRef);

  return (
    <div className={styles.overlay}>
      <div
        className={styles.menu}
        id={fadeOut ? styles.slideOut : ""}
        ref={menuRef}
      >
        <div className={styles.userInfo}>
          <div className={styles.userPic}>
            <img src={defaultPhoto} alt="defaultPhoto" />
          </div>
          <input
            className={styles.userNameField}
            placeholder="Username"
            value={usernameValue}
            onChange={onChangeUsernameInput}
          />
        </div>
        <div className={styles.menuItem} onClick={HandleChannelAdderClick}>
          <UserAddOutlined />
          <span>Add new channel</span>
        </div>
        <div className={styles.menuItem}>
          <SettingOutlined />
          <span>Settings</span>
        </div>
        <div className={styles.menuItem} onClick={handleChangeThemeClick}>
          <BulbOutlined />
          <span>Change theme</span>
        </div>
        <div className={styles.copyright}>
          <span>prod by </span>
          <a href="https://github.com/SilvioJPEG/">ClockworkSilvio</a>
          <span>, 2021</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
