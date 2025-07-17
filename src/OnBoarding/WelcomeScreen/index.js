
import './style.css';
// import welcomeimage from "./home.jpg";
import { useNavigate } from 'react-router-dom';


import { Button } from '../../SharedComponent/Button';
function Welcome(){
    const navigate = useNavigate();
    return(
        <div className="welcome-container">
        <div className="welcome-image">
            <img src="/Images/home.jpg" alt ="Welcome Page"className="welcomeimg"/>
        </div>
        <div className="welcome-text">
        <h1 className="yellowText">
             Welcome
        </h1>
        <p>You're about to take your market stall online  fast, simple, and hustle free.</p>
        <Button text={'Get Started'} variant={'primary'} onClick = {()=>navigate("/inventory")
        }/>
        </div>
        
        </div>
     
        
       
    )
     
}
export default Welcome;