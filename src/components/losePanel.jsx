import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SutomContext } from "../states/sutomProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createhintsarray } from "../engine";

const LosePanel = () => {
  localStorage.setItem("streak", 0);
  const [state] = useContext(SutomContext);
  let hintsarray = createhintsarray(state.hints);
  return (
    <div className="panel">
      <h1 className="end-game-state">G A M E   O V E R</h1>
      <h3>LE MOT A TROUVER ETAIT {state.wordToFind}</h3>
      <CopyToClipboard text={hintsarray.join("\n")}>
        <button className="btn btn-white btn-small">
          Copier dans le presse-papier
        </button>
      </CopyToClipboard>
      <h1 className="tries">
        {hintsarray.map((e) => (
          <p className="try">{e}</p>
        ))}
      </h1>
      <Link
        className="btn btn-white btn-big"
        onClick={() => window.location.reload()}
        to="/game"
      >
        Rejouer
      </Link>
    </div>
  );
};

export default LosePanel;
