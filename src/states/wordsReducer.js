import wordList from "../assets/words.json";
import { getHints } from "../engine.js";

export const SET_WORD_TO_FIND = "SET_WORD_TO_FIND";
export const TYPE = "TYPE";
export const RESET = "RESET";
export const CONFIRM = "CONFIRM";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

var lengthWord = randomNum(5, 10);
var words = wordList[lengthWord];

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generateNewState = () => {
    var choosenWord = words[Math.floor(Math.random() * words.length)]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
    console.log(choosenWord);
    return {
        wordToFind: choosenWord,
        tries: [],
        hints: [],
        currentTry: "",
        letterPlacement: choosenWord[0] + ".".repeat(choosenWord.length - 1),
        wordLength: choosenWord.length,
        wellPlacedLetters: new Set([choosenWord[0]]),
        misplacedLetters: new Set([]),
        missingLetters: new Set([]),
        won: undefined,
    };
};

export const initialState = generateNewState();

export const wordsReducer = (state, action) => {
    switch (action.type) {
        case RESET:
            return generateNewState();
        case SET_WORD_TO_FIND:
            return {
                ...state,
                wordToFind: action.payload,
            };
        case TYPE:
            if (ALPHABET.includes(action.payload) && state.currentTry.length < state.wordLength) {
                if (state.currentTry.length === 0 && action.payload.toUpperCase() !== state.wordToFind[0]) {
                    state.currentTry += state.wordToFind[0];
                    state.currentTry += action.payload.toUpperCase();
                } else {
                    state.currentTry += action.payload.toUpperCase();
                }
            } else if (action.payload === "backspace" && state.currentTry.length > 0) {
                state.currentTry = state.currentTry.slice(0, -1);
            }
            return {
                ...state,
            };

        case CONFIRM:
            state.tries.push(state.currentTry);
            var currentHints = getHints(state.wordToFind, state.currentTry);
            for (var i = 0; i < currentHints.length; i++) {
                if (currentHints[i] === "well-placed") {
                    state.wellPlacedLetters.add(state.currentTry[i]);
                } else if (currentHints[i] === "misplaced") {
                    state.misplacedLetters.add(state.currentTry[i]);
                } else if (currentHints[i] === "") {
                    state.missingLetters.add(state.currentTry[i]);
                }
            }
            state.hints.push(currentHints);
            for (let i = 0; i < state.hints[state.hints.length - 1].length; i++) {
                if (state.hints[state.hints.length - 1][i] === "well-placed") {
                    state.letterPlacement = state.letterPlacement.split("");
                    state.letterPlacement[i] = state.wordToFind[i];
                    state.letterPlacement = state.letterPlacement.join("");
                }
            }
            if (state.currentTry === state.wordToFind) {
                state.won = true;
                update_local_storage(state.won, state.tries.length);
            } else if (state.tries.length === 6) {
                state.won = false;
                update_local_storage(state.won, state.tries.length);
            }
            state.currentTry = "";
            return {
                ...state,
            };
        default:
            return state;
    }
};

function update_local_storage(won, length_tried) {
    console.log(won);
    if (won === true) {
        localStorage.setItem(
            "streak",
            parseInt(localStorage.getItem("streak")) + 1
        );
        localStorage.setItem("found", parseInt(localStorage.getItem("found")) + 1);
    }
    localStorage.setItem("tried", parseInt(localStorage.getItem("tried")) + 1);
    localStorage.setItem(
        "word_tried",
        parseInt(localStorage.getItem("word_tried")) + length_tried
    );
    localStorage.setItem(
        "average",
        (
            parseInt(localStorage.getItem("word_tried")) /
            parseInt(localStorage.getItem("tried"))
        ).toFixed(1)
    );
}