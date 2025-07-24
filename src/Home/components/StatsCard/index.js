import React from "react";
import './index.css';



function StatsCard({title,value,icon}){
    return(
        <div className="statisticsCard">

            <div className="card">
                <div className="userIcon">
                <h3 id="cardTitle">{title}</h3>
                <p id="value">{value}</p>

                </div>

                
            </div>


        </div>
    )
};
export default StatsCard;