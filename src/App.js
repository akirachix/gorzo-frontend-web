
import React from 'react';
import './App.css';
import Orders from './orders/index'

function App() {
  return (
    <div className="App">
     <Orders/>
    </div>
  );
}

import './App.css';
   import SplashScreen from './OnBoarding/SplashScreen';
   import Welcome from './OnBoarding/WelcomeScreen';
   import OrderManagement from './OnBoarding/OrderManagement';
   import InventoryManagement from './OnBoarding/InventoryManagement';
   import SalesTracking from './OnBoarding/SalesTracking';
   import GetStarted from './OnBoarding/GetStarted';
   import Sidebar from './SharedComponent/SideBar';
   import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
   import '@fontsource/manrope';

   const Home = () => <div></div>;
   const Orders = () => <div></div>;
   const Users = () => <div></div>;
   const Sales = () => <div></div>;
   const Settings = () => <div></div>;


   const MainLayout = ({ children }) => {
     return (
       <div style={{ display: 'flex' }}>
         <Sidebar />
         <div style={{ flex: 1 }}>
           {children}
         </div>
       </div>
     );
   };

   function App() {
     return (
       <Router>
         <Routes>
           <Route path="/" element={<SplashScreen />} />
           <Route path="/welcome" element={<Welcome />} />
           <Route path="/inventory" element={<InventoryManagement />} />
           <Route path="/order" element={<OrderManagement />} />
           <Route path="/getStarted" element={<GetStarted />} />
           <Route path="/sales" element={<SalesTracking />} />
           
           <Route element={<MainLayout />}>
             <Route path="/home" element={<Home />} />
             <Route path="/orders" element={<Orders />} />
             <Route path="/users" element={<Users />} />
             <Route path="/salestracking" element={<Sales />} />
             <Route path="/settings" element={<Settings />} />
           </Route>
         </Routes>
       </Router>
     );
   }

   export default App;