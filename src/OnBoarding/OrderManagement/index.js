import './style.css';
// import welcomeimage from "../Assets/Images/order management.jpg";
import ProgressDot from '../../SharedComponent/ProgressDots';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../SharedComponent/Button';

function OrderManagement(){
     const navigate = useNavigate();
return(
    
      <div className="welcome-container">
         <div className="welcome-image">
             <img src="/Images/order management.jpg" alt ="Welcome Page"className="welcomeimg"/>
         </div>
        <div className="welcome-text">
        <h1 className='yellowText'>
              Order Management 
        </h1>
         <p> Provides vendors with a centralized platform to view, track, and manage all customer orders.</p>
         </div>

           <ProgressDot current={1}/>
         
              <Button text={'Continue'} variant={'primary'} onClick = {()=>navigate("/sales")}/>
           
         </div>
)
}

export default OrderManagement;