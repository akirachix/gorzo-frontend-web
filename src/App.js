

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';




import './App.css';
import { Outlet } from 'react-router-dom';
  import Users from './FetchUsers';
   import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
   import '@fontsource/manrope';
   import Sidebar from './SharedComponent/SideBar';
   const Orders = () => <div></div>;
   const Sales = () => <div></div>;
   const Settings = () => <div></div>;
   const MainLayout = () => {
     return (
       <div style={{ display: 'flex' }}>
         <Sidebar />
         <div style={{ flex: 1 }}>
                  <Outlet />
         </div>
       </div>
     );
   };
   function App() {
     return (
       <Router>
         <Routes>
         
           <Route element={<MainLayout />}>
   <Route path="/SignIn" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
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

