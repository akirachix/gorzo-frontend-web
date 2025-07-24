import React from "react";
import './index.css';
import GroupChart from "./Components/GroupChart";
import CustomerProgressionChart from "./Components/UserProgressionChart";
import VendorPerformance from "./Components/VendorPerformance";
import DashboardStats from "./Components/DashboardStats";





function Home() {
    const handleSearch = (query) =>{
      console.log("Search query",query)
    }


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