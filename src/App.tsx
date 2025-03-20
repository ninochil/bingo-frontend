import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
