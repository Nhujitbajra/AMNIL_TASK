import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileManagement from "./Components/Profile";
import LoginPage from "./Components/Login";

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/profile" element={<ProfileManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
