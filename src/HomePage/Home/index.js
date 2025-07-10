import React from "react";
import './index.css';
import Sidebar from "../../SharedComponent/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUsers, faArrowTrendUp, faCartShopping, faCircleCheck, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import GroupChart from "../GroupChart";
import SalesChart from "../SalesChart";





function home() {
  return (
    <div className="adminDashboard">
      <Sidebar />

      <div className="userData">

        <div className="activeUsers">
          <h3 id="userName">Total Vendors</h3>
          <div className="vendorTitles">
            <p>1000</p>
            <FontAwesomeIcon icon={faCircleUser} id="userIcon" />
          </div>
        </div>

        <div className="activeUsers">
          <h3 id="userName">Total Customers</h3>
          <div className="vendorTitles">
            <p>4000</p>
            <FontAwesomeIcon icon={faUsers} id="userIcon" />
          </div>
        </div>

        <div className="activeUsers">
          <h3 id="userName">Total Sales</h3>
          <div className="vendorTitles">
            <p>4000</p>
            <FontAwesomeIcon icon={faArrowTrendUp} id="userIcon" />
          </div>
        </div>

      </div>
      <div className="userData">
        <div className="activeUsers">
          <h3 id="userName">Active Group Buys</h3>
          <div className="vendorTitles">
            <p>40</p>
            <FontAwesomeIcon icon={faCartShopping} id="userIcon" />
          </div>
        </div>
        <div className="activeUsers">
          <h3 id="userName">Completed Group Buys</h3>
          <div className="vendorTitles">
            <p>70</p>
            <FontAwesomeIcon icon={faCircleCheck} id="userIcon" />
          </div>
        </div>
        <div className="activeUsers">
          <h3 id="userName">Top Selling Product</h3>
          <div className="vendorTitles">
            <p>Apples</p>
            <FontAwesomeIcon icon={faBasketShopping} id="userIcon" />
          </div>
        </div>
      </div>

      <div className="ordersOverview">
        <div className="ordersContainer">
          <h2 id="ordersHeading">Sales Trend</h2>
          <div className="pieContainer">
            <SalesChart />

          </div>

        </div>

        <div>
          <h2 id="ordersHeading">Group Buys Created vs Completed</h2>
          <GroupChart />
        </div>
      </div>
      
      <div className="performance">
        <div className="vendorPerformance">


        </div>
        <div className="productPerformance"></div>

      </div>




    </div>



  )



}



export default home;