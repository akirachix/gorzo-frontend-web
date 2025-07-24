import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import '@fontsource/manrope';

import './App.css';

import SignIn from './SignIn';
import Home from './Home';
import Sidebar from './SharedComponent/SideBar';
import Users from './FetchUsers';


const Orders = () => <div></div>;
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
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
