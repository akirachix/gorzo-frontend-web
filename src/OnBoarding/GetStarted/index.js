import './style.css';
// import welcomeimage  from "../public/buildduka (1).jpg";
import { Button } from '../../SharedComponent/Button';
import { useNavigate } from 'react-router-dom';

function GetStarted(){
    const navigate = useNavigate()
    return (
 <div className="welcome-container">
        <div className="welcome-image">
            <img src="/Images/buildduka.jpg" alt ="Welcome Page"className="dukaimg"/>
        </div>
        <div className="welcome-text">
        <h1 className='yellowText duka'>
            Let's  build your digital duka together
        </h1>
        <p >Ready to sell online?</p>
        <Button text="Sign Up" variant={"primary"} onClick={()=>navigate("/")} />
        </div>
        </div>

 )
}

export default GetStarted;


