import React, { useContext } from "react";
import { RESET } from "../states/wordsReducer";

const WinPanel = ({ dispatch }) => {
  return (
    <div className="panel">
      <h1>V I C T O R Y</h1>
      <button>Play again</button>
    </div>
  );
};

export default WinPanel;
