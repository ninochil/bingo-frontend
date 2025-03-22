import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopPage from "./pages/TopPage";
import "./App.css";
import PlayerJoinPage from "./pages/player/PlayerJoinPage"; // 待機ページ
import PlayerStandbyPage from "./pages/player/PlayerStandbyPage"; // 待機ページ
import PlayerBingoPage from "./pages/player/PlayerBingoPage"; // ビンゴページ
import BingoRoom from "./pages/BingoRoom";
import StandbyRoom from "./pages/StandbyRoom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/PlayerJoinPage" element={<PlayerJoinPage />} />
          <Route path="/PlayerStandbyPage" element={<PlayerStandbyPage />} />
          <Route path="/PlayerBingoPage" element={<PlayerBingoPage />} />
          <Route path="/BingoRoom" element={<BingoRoom />} />
          <Route path="/StandbyRoom" element={<StandbyRoom />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
