import { Row } from "./row";
import React, { useContext, useEffect, useState } from "react";

import { SutomContext } from "../states/sutomProvider";
import { TYPE } from "../states/wordsReducer";

export const Grid = () => {
  const [pressed, setPressed] = useState(0);
  const [state, dispatch] = useContext(SutomContext);

  const keyDown = (event) => {
    setPressed(pressed + 1);
    // console.log(event.key.toLowerCase());
    dispatch({
      type: TYPE,
      payload: event.key.toLowerCase(),
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  });
  return (
    <div className="grid">
      {Array(6)
        .fill(1)
        .map((_, i) => {
          return (
            <Row
              word={state.tries[i] ?? " ".repeat(state.wordToFind.length)}
              key={i}
              id={i}
            />
          );
        })}
    </div>
  );
};
