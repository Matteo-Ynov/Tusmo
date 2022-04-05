import { SutomContext } from "../states/sutomProvider";
import React, { useContext, useState } from "react";

export const Row = ({ word, id }) => {
  const [state] = useContext(SutomContext);
  if (id >= state.tries.length) {
    word =
      id === state.tries.length
        ? state.currentTry === ""
          ? state.letterPlacement
          : state.currentTry
        : " ".repeat(state.wordLength);
  }

  // const [hints, setHints] = useState(state.hints[id] ? state.hints[id] : [""]);
  const currentHints = state.hints[id] ? state.hints[id] : [""];

  // const updateHints = (i = 0) => {
  //   setTimeout(() => {
  //     if (id == 0) {
  //       console.log(currentHints, hints, i);
  //     }
  //     if (i < currentHints.length) {
  //       setHints([...hints, currentHints[i]]);
  //       updateHints(i + 1);
  //     }
  //   }, 500);
  // };

  // updateHints();

  const fillSpaces = (word) => {
    return word + " ".repeat(state.wordLength - word.length);
  };

  return (
    <div className="row">
      {[...fillSpaces(word)].map((l, i) => {
        return (
          <div className={"case " + currentHints[i]} key={i}>
            {l}
          </div>
        );
      })}
    </div>
  );
};
