import React, { createContext, useReducer } from "react";
import { wordsReducer, initialState } from "./wordsReducer";

export const SutomContext = createContext(null);

const SutomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wordsReducer, initialState);

  return (
    <SutomContext.Provider value={[state, dispatch]}>
      {children}
    </SutomContext.Provider>
  );
};

export default SutomProvider;
