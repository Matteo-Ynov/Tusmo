import wordList from "../assets/words.json";

export const SET_WORD_TO_FIND = "SET_WORD_TO_FIND";
export const TYPE = "TYPE";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

var lengthWord = 6;
var words = wordList[lengthWord];

var choosenWord = words[Math.floor(Math.random() * words.length)]
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

export const initialState = {
    wordToFind: choosenWord,
    tries: [],
    currentTry: "",
    letterPlacement: choosenWord[0] + ".".repeat(choosenWord.length - 1),
    wordLength: choosenWord.length,
};

export const wordsReducer = (state, action) => {
    switch (action.type) {
        case SET_WORD_TO_FIND:
            return {
                ...state,
                wordToFind: action.payload,
            };
        case TYPE:
            console.log(state.currentTry);
            if (
                ALPHABET.includes(action.payload) &&
                state.currentTry.length < state.wordLength
            ) {
                if (
                    state.currentTry.length === 0 &&
                    action.payload.toUpperCase() !== state.wordToFind[0]
                ) {
                    state.currentTry += state.wordToFind[0];
                    state.currentTry += action.payload.toUpperCase();
                } else {
                    state.currentTry += action.payload.toUpperCase();
                }
            } else if (
                action.payload === "backspace" &&
                state.currentTry.length > 0
            ) {
                state.currentTry = state.currentTry.slice(0, -1);
            }
            return {
                ...state,
            };

        default:
            return state;
    }
};