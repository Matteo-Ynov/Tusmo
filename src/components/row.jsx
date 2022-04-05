import { SutomContext } from "../states/sutomProvider";
import React, { useContext } from "react";

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

  const hints = state.hints[id] ? state.hints[id] : ["None"];

  const fillSpaces = (word) => {
    return word + " ".repeat(state.wordLength - word.length);
  };

  return (
    <div className="row">
      {[...fillSpaces(word)].map((l, i) => {
        return (
          <div className="case" key={i}>
            {l}
          </div>
        );
      })}
    </div>
  );
};
