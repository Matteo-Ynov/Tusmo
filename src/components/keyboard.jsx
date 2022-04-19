import React, { useContext } from "react";
import { SutomContext } from "../states/sutomProvider";

const Keyboard = () => {
  const ALPHABET = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["W", "X", "C", "V", "B", "N", "M"],
  ];
  const [state, dispatch] = useContext(SutomContext);

  //   console.log(state.wellPlacedLetters);
  return (
    <div className="keyboard">
      {ALPHABET.map((l) => {
        return (
          <div className="key-row" key={l}>
            {l.map((c) => {
              return (
                <div
                  className={
                    state.missingLetters.has(c)
                      ? "missing"
                      : state.misplacedLetters.has(c)
                      ? "misplaced-keyboard"
                      : state.wellPlacedLetters.has(c)
                      ? "well-placed"
                      : ""
                  }
                  key={c}
                >
                  {c}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
