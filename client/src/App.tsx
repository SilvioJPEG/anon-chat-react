import React from "react";
import { 
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import _ from "./themes"
import Chat from "./pages/Chat";
import Info from "./pages/Info"
import Footer from "./components/Footer";

function App() {
    const [FooterVisible, SetFooterVisible] = React.useState<boolean>(false); //makes footer visible by button click

    React.useEffect(() => {
        _.keepTheme();
    })
    
    return (
    <Router>
    <div className="chatApp">
        <Switch>
            <Route path="/about">
                <Info />   
            </Route>
            <Route path="/">
                <Chat />    
            </Route>
        </Switch>
        <div className="footerButton" onClick={()=>SetFooterVisible(!FooterVisible)}> 
            ^
        </div>
        <Footer 
            isFooterVisible ={FooterVisible}
        />
    </div>
    </Router>
  );
}

export default App;
