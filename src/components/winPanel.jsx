import React, { useContext } from "react";
import { RESET } from "../states/wordsReducer";
import { Link } from "react-router-dom";
import { SutomContext } from "../states/sutomProvider";

const WinPanel = () => {
  const [state, dispatch] = useContext(SutomContext);
  createhintsarray(state.hints);
  return (
    <div className="panel">
      <h1>V I C T O R Y</h1>
      <h1 className="tries">{
        createhintsarray(state.hints).map(e => <p>{e}</p>)
      }</h1>
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


function createhintsarray(hints) {
  let hintsarray = []
  for (const hint of hints) {
    let show = ""
    for (const value of hint) {
      if (value == "well-placed") {
        show += "🟥"
      } else if (value == "misplaced") {
        show += "🟠"
      } else {
        show += "⚫"
      }
    }
    hintsarray.push(show)
  }
  return hintsarray
}

export default WinPanel;
