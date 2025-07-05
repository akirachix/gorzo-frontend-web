import './style.css';
// import welcomeimage from "../Assets/Images/inventory.jpg";
import ProgressDot from '../../SharedComponent/ProgressDots';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../SharedComponent/Button';

function InventoryManagement(){
    const navigate = useNavigate();
    return (
         <div className="welcome-container">
         <div className="welcome-image">
           <img src="/Images/inventory.jpg" alt ="Welcome Page"className="welcomeimg"/>
         </div>
         <div className="welcome-text">
        <h1 className="yellowText">
         Inventory Management
        </h1>
         <p>Allows to efficiently track, organize, and update stock of products.</p>
    
        </div>
          <ProgressDot current={0}/>
          <Button text={'Continue'} variant={'primary'} onClick = {()=>navigate("/order")}/>
         </div>
    )
}

export default InventoryManagement;
