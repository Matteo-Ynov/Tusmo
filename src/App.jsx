import React from "react";
import { Grid } from "./components/grid";
import { Home } from "./components/home";
import { Stats } from "./components/stats";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/grid.css";
import "./styles/home.css";
import "./styles/stats.css";
import "./styles/keyboard.css";
import SutomProvider from "./states/sutomProvider.jsx";

function App() {
  return (
    <SutomProvider>
      <a href="/" style={{ textDecoration: "none" }}>
        <div className="nav">T U S M O</div>
      </a>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Grid />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </SutomProvider>
  );
}

export default App;
