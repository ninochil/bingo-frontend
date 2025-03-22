import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import './App.css'
import PlayerJoinPage from './pages/player/PlayerJoinPage'; // 待機ページ
import PlayerStandbyPage from './pages/player/PlayerStandbyPage'; // 待機ページ
import PlayerBingoPage from './pages/player/PlayerBingoPage'; // ビンゴページ

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/PlayerJoinPage" element={<PlayerJoinPage />} />  {/* 待機ページ */}
          <Route path="/PlayerStandbyPage" element={<PlayerStandbyPage />} />  {/* 待機ページ */}
          <Route path="/PlayerBingoPage" element={<PlayerBingoPage />} />  {/* ビンゴページ */}
        </Routes>
      </Router>
    </>
  )
}

export default App
