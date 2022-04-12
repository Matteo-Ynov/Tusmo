import { Row } from "./row";
import React, { useContext, useEffect, useState } from "react";

import { SutomContext } from "../states/sutomProvider";
import { TYPE } from "../states/wordsReducer";

import WinPanel from "../components/winPanel";
import LosePanel from "../components/losePanel";

import { checkIfWordExist } from "../engine";

export const Grid = () => {
  const [pressed, setPressed] = useState(0);
  const [state, dispatch] = useContext(SutomContext);

  const keyDown = (event) => {
    if (state.won === undefined) {
      setPressed(pressed + 1);
      dispatch({
        type: TYPE,
        payload: event.key.toLowerCase(),
      });
    }
    console.log(checkIfWordExist(state.currentTry, state.currentTry));
  };
  console.log(state.wordToFind);

  useEffect(() => {
    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  });

  if (state.won) {
    return <WinPanel />;
  } else if (state.won === false) {
    return <LosePanel />;
  } else {
    return (
      <div className="grid">
        {Array(6)
          .fill(1)
          .map((_, i) => {
            return (
              <Row
                word={
                  state.tries[i]
                    ? state.tries[i]
                    : " ".repeat(state.wordToFind.length)
                }
                key={i}
                id={i}
              />
            );
          })}
      </div>
    );
  }
};
