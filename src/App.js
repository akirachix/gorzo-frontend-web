import './App.css';
import { Outlet } from 'react-router-dom';

   import SplashScreen from './OnBoarding/SplashScreen';
   import Welcome from './OnBoarding/WelcomeScreen';
   import OrderManagement from './OnBoarding/OrderManagement';
   import InventoryManagement from './OnBoarding/InventoryManagement';
   import SalesTracking from './OnBoarding/SalesTracking';
   import GetStarted from './OnBoarding/GetStarted';
   import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
   import '@fontsource/manrope';
  import Home from './Home';
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
                  <Outlet />
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