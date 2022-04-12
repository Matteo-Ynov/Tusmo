import React from "react";
import { Link } from "react-router-dom";
import { SutomContext } from "../states/sutomProvider";

const LosePanel = () => {
  return (
    <div className="panel">
      <h1>G A M E   O V E R</h1>
      <Link class="btn btn-white btn-big" onClick={() => window.location.reload()} to="/game">Play Again</Link>
    </div>
  );
};

export default LosePanel;
