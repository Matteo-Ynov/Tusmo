import React, { useContext } from "react";
import { SutomContext } from "../states/sutomProvider";
import { TYPE } from "../states/wordsReducer";
import { useEffect } from "react";

const Keyboard = () => {
  const ALPHABET = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["W", "X", "C", "V", "B", "N", "M"],
  ];
  const [state, dispatch] = useContext(SutomContext);
  useEffect(() => {
    let key = document.getElementsByClassName("key")
    for (var i = 0; i < key.length; i++) {
      key[i].onclick = function (event) { dispatch({ type: TYPE, payload: event.target.innerHTML.toLowerCase(), click: true }); }
    }
  });
  return (
    <div className="keyboard">
      {ALPHABET.map((l) => {
        return (
          <div className="key-row" key={l}>
            {l.map((c) => {
              return (
                <button className="key"><div
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
                </div></button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};


export default Keyboard;
