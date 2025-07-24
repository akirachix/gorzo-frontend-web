
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';




function App() {
  return (

    <Router>

      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>

  );
}
export default App;







