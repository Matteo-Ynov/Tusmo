import React, { useContext } from "react";
import { RESET } from "../states/wordsReducer";
import { Link } from "react-router-dom";
import { SutomContext } from "../states/sutomProvider";

const WinPanel = () => {
  const [state, dispatch] = useContext(SutomContext);
  console.log(state.hints);
  return (
    <div className="panel">
      <h1>V I C T O R Y</h1>
      <Link
        class="btn btn-white btn-big"
        onClick={() => window.location.reload()}
        to="/game"
      >
        Play Again
      </Link>
    </div>
  );
};

export default WinPanel;
