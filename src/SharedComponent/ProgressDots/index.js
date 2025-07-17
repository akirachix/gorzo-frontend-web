import './style.css';
import React from 'react';

const ProgressDot = ({current})=>{
    return(
    <div className = "progress-dots">
<div className={`dot ${current === 0 ? "active-dot" :""}`} ></div>
     <div className= {`dot ${current ===1 ? "active-dot" : ""}`}></div>
<div className={`dot ${current ===2 ? "active-dot" : ""}`}></div>
    </div>
    )
}

export default ProgressDot;