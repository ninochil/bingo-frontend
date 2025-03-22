import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import './App.css'
import StandbyPage from './pages/StandbyPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/standby" element={<StandbyPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
