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
            list.push((input[i], "Well placed"));
        } else if (misplaced_letters[i] === true) {
            list.push((input[i], "Misplaced"));
        } else {
            list.push((input[i], "None"));
        }
    }
    console.log(list);
    return list;
}

export const checkIfWordExist = (input) => {
    return new Promise((resolve, reject) => {
        fetch(
            `https://frenchwordsapi.herokuapp.com/api/Word?idOrName=${input}`
        ).then((response) => {
            const status = response["status"];
            status === 200 ? resolve(true) : resolve(false);
        });
    });
};