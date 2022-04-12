import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SutomContext } from "../states/sutomProvider";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {createhintsarray} from '../engine'

const WinPanel = () => {
  const [state] = useContext(SutomContext);
  let hintsarray = createhintsarray(state.hints);
  return (
    <div className="panel">
      <h1 className="end-game-state">V I C T O I R E</h1>
      <CopyToClipboard text={hintsarray.join("\n")}>
          <button class="btn btn-white btn-small">Copier dans le presse-papier</button>
        </CopyToClipboard>
      <h1 className="tries">{
        hintsarray.map(e => <p className="try">{e}</p>)
      }</h1>
      <Link
        class="btn btn-white btn-big"
        onClick={() => window.location.reload()}
        to="/game"
      >
        Rejouer
      </Link>
    </div>
  );
};

export default WinPanel;
