import correctWords from "../src/assets/correctWords.txt";

export function getHints(word, input) {
    let [correct_letters, changed_word] = checkCorrectLetters(word, input);
    let misplaced_letters = checkMisplacedLetters(changed_word, input);
    return joinCorrectAndMisplacedLetters(
        input,
        correct_letters,
        misplaced_letters
    );
}

function checkCorrectLetters(word, input) {
    word = word.split("");
    input = input.split("");
    let correct_letters = [];
    for (let i = 0; i < word.length; i++) {
        if (input[i] === word[i]) {
            correct_letters.push(true);
            word[i] = "#";
        } else {
            correct_letters.push(false);
        }
    }
    return [correct_letters, word.join()];
}

function checkMisplacedLetters(word, input) {
    word = word.split("");
    input = input.split("");
    let misplaced_letters = [];
    for (let i = 0; i < word.length; i++) {
        if (word.includes(input[i])) {
            misplaced_letters.push(true);
            var index = word.indexOf(input[i]);
            word.splice(index, 1);
        } else {
            misplaced_letters.push(false);
        }
    }
    return misplaced_letters;
}

function joinCorrectAndMisplacedLetters(
    input,
    correct_letters,
    misplaced_letters
) {
    let list = [];
    input = input.split("");
    for (let i = 0; i < input.length; i++) {
        if (correct_letters[i] === true) {
            list.push((input[i], "well-placed"));
        } else if (misplaced_letters[i] === true) {
            list.push((input[i], "misplaced"));
        } else {
            list.push((input[i], ""));
        }
    }
    return list;
}

export const checkIfWordExist = (input) => {
    return new Promise((resolve, reject) => {
        fetch(correctWords)
            .then((r) => r.text())
            .then((text) => {
                resolve(
                    text
                        .split("\n")
                        .map((word) =>
                            word
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toUpperCase()
                        )
                        .includes(input.toUpperCase())
                );
            });
    });
};

export function createhintsarray(hints) {
    let hintsarray = [];
    for (const hint of hints) {
        let show = ""
        for (const value of hint) {
            if (value === "well-placed") {
                show += "🟥"
            } else if (value === "misplaced") {
                show += "🟠"
            } else {
                show += "⚫"
            }
            hintsarray.push(show);
        }
        return hintsarray;
    }
}