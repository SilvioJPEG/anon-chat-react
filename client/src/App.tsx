import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Chat from "./pages/Chat";
import Info from "./pages/Info";

function App() {
  const dispatch = useDispatch();
  function setTheme(themeName: string): void {
    localStorage.setItem("theme", themeName);
    document.body.className = themeName;
  }
  const setUsername = () => {
    dispatch({
      type: "USERS:SET_USERNAME",
      payload: localStorage.getItem("name"),
    });
  };
  React.useEffect(() => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-dark");
      } else if (localStorage.getItem("theme") === "theme-light") {
        setTheme("theme-light");
      }
    } else {
      setTheme("theme-light");
    }
    setUsername();
  });

  return (
    <Router>
      <div className="chatApp">
        <Switch>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/">
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
