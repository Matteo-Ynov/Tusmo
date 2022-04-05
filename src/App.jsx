import React from "react";
import { Grid } from "./components/grid";
import "./App.css";
import "./styles/grid.css";
import SutomProvider from "./states/sutomProvider.jsx";

function App() {
  return (
    <SutomProvider>
      <div className="nav">T U S M O</div>
      <Grid />;
    </SutomProvider>
  );
}

export default App;
