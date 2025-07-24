import React from "react";
import './index.css';
import GroupChart from "./components/GroupChart";
import CustomerProgressionChart from "./components/UserProgressionChart";
import VendorPerformance from "./components/VendorPerformance";
import DashboardStats from "./components/DashboardStats";





function Home() {
   

  return (
    <div className="adminDashboard">
      <div className="homeDashboard">

          <h2 id="adminTitle">Admin Dashboard</h2>
         
          <DashboardStats/>
      <div className="ordersOverview">
        <div className="ordersContainer">
          <h2 id="ordersHeading">Customer Progression</h2>
          <div className="pieContainer">
            <CustomerProgressionChart />

          </div>

        </div>

        <div id="groupPerformance">
          <h2 id="ordersHeading">Group Buys Created vs Completed</h2>
          <GroupChart />
        </div>
      </div>
      
      <div className="performance">
        <div className="vendorPerformance">


        </div>
        <div className="vendorPerformance">
          <VendorPerformance/>
        </div>

      </div>



     </div>

    </div>




  )



}



export default Home;