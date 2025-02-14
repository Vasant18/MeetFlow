import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { MeetingPage } from "./components/MeetingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/meeting/:roomId" element={<MeetingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
