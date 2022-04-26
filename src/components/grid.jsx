import { Row } from "./row";
import React, { useContext, useEffect, useState } from "react";

import { SutomContext } from "../states/sutomProvider";
import { TYPE, CONFIRM } from "../states/wordsReducer";

import WinPanel from "../components/winPanel";
import LosePanel from "../components/losePanel";
import Keyboard from "./keyboard";

import { checkIfWordExist } from "../engine";

export const Grid = () => {
  const [pressed, setPressed] = useState(0);
  const [state, dispatch] = useContext(SutomContext);
  const [errorMessage, setErrorMessage] = useState(false);

  const keyDown = (event) => {
    if (state.won === undefined) {
      setPressed(pressed + 1);
      if (
        event.key.toLowerCase() === "enter" &&
        state.currentTry.length === state.wordLength
      ) {
        checkIfWordExist(state.currentTry).then((res) => {
          if (res) {
            setErrorMessage(false)
            dispatch({
              type: CONFIRM,
            });
          } else {
            setErrorMessage(true)
          }
        });
      } else {
        dispatch({
          type: TYPE,
          payload: event.key.toLowerCase(),
        });
      }
    }
  };

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
    return (<>
      <h2 className={`error ${errorMessage?"":"hide"}`}>MOT NON RECONNU</h2>
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
      <Keyboard />
      </>
    );
  }
};