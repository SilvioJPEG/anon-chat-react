import { useHistory } from "react-router-dom";
function About() {
    let history = useHistory();
    return(
        <div className="wrapper">
            <span className="goBackButton" onClick={() => history.goBack()}>⮨</span>
            <div className="info">
                <div>
                    <h2>What is it?</h2>
                    <span>
                        Anonymous chat that resembles imageboard a lot. You don't need to have an account. 
                        You can create channels and talk there but all channels will eventially be deleted. 
                        Although it's just a test version and you can't send images right now, it will be possible in futute.
                    </span>
                </div>
            </div>

        </div>
    );
}
export default About;