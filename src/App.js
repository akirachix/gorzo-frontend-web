
import './App.css';
import SplashScreen from './OnBoarding/SplashScreen';
import Welcome from './OnBoarding/WelcomeScreen';
import OrderManagement from './OnBoarding/OrderManagement';
import InventoryManagement from './OnBoarding/InventoryManagement';
import SalesTracking from './OnBoarding/SalesTracking';
import GetStarted from './OnBoarding/GetStarted';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './SharedComponent/SideBar';
import '@fontsource/manrope';
 

function App() {
  return(
<Router>
  <Routes>
    <Route path="/" element={<SplashScreen/>}/>
    <Route path ="/welcome" element ={<Welcome/>}/>
    <Route path = "/inventory" element = {<InventoryManagement/>}/>
<Route path = "/order" element = {<OrderManagement/>}/>
<Route path="/sales" element = {<SalesTracking/>}/>
<Route path="/getStarted" element = {<GetStarted/>}/>
<Route path="/sidebar" element = {<Sidebar/>}/>


  </Routes>
</Router>
  );
};

export default App;