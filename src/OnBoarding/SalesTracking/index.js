import './style.css';
// import welcomeimage from "../Assets/Images/salesPage.jpg";
import ProgressDot from '../../SharedComponent/ProgressDots';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../SharedComponent/Button';
   function SalesTracking(){
     const navigate = useNavigate();
   return(
   <div className="welcome-container">
        <div className="welcome-image">
         <img src="/Images/salesPage.jpg" alt ="Welcome Page"className="welcomeimg"/>
        </div>
        <div className="welcome-text">
        <h1 className='yellowText'>
              Sales Tracking
        </h1>
         <p>Provides vendors with sales and income tracking all customer orders.</p>
        </div>
          <ProgressDot current={2}/>
        <Button text={'Continue'} variant={'primary'} onClick = {()=>navigate("/getstarted")}/>
        </div>
)
    }
export default SalesTracking;
   