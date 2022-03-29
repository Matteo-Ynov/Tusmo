const word_len = 6
const prompt = require('prompt-sync')({ sigint: true });
const fetch = require('node-fetch');

function getRandomWord(word_len) {
    if (5 <= word_len && word_len <= 10) {
        const jsonData = require('../assets/words.json')
        word_list = jsonData[word_len]
        return word_list[Math.floor(Math.random() * word_list.length)];
    } else {
        return "Longueur non valide"
    }
}

function checkInputLength(input) {
    return input.length == word_len ? true : false
}

function checkCorrectLetters(word, input) {
    word = word.split("")
    input = input.split("")
    let correct_letters = []
    for (let i = 0; i < word.length; i++) {
        if (input[i] == word[i]) {
            correct_letters.push(true)
            word[i] = "#"
        } else {
            correct_letters.push(false)
        }
    }
    return [correct_letters, word.join()]
}

function checkMisplacedLetters(word, input) {
    word = word.split("")
    input = input.split("")
    let misplaced_letters = []
    for (let i = 0; i < word.length; i++) {
        if (word.includes(input[i])) {
            misplaced_letters.push(true)
            var index = word.indexOf(input[i])
            word.splice(index, 1);
        } else {
            misplaced_letters.push(false)
        }
    }
    return misplaced_letters
}

function joinCorrectAndMisplacedLetters(input, correct_letters, misplaced_letters) {
    let list = [];
    input = input.split("")
    for (let i = 0; i < input.length; i++) {
        if (correct_letters[i] == true) {
            list.push((input[i], "Well placed"))
        } else if (misplaced_letters[i] == true) {
            list.push((input[i], "Misplaced"))
        } else {
            list.push((input[i], "None"))
        }
    }
    console.log(list)
    return list
}

const checkIfWordExist = (input) => {
    return new Promise((resolve, reject) => {
        fetch(`https://frenchwordsapi.herokuapp.com/api/Word?idOrName=${input}`)
            .then(response => {
                const status = response["status"];
                status == 200 ? resolve(true) : resolve(false)
            }
            )
    }
    )

}

let random_word = getRandomWord(word_len)

function game() {
    var input = prompt('Votre mot ? ').toLowerCase()
    if (checkInputLength(input)) {
        checkIfWordExist(input).then(data => {
            if (data) {
                let [correct_letters, changed_word] = checkCorrectLetters(random_word, input)
                let misplaced_letters = checkMisplacedLetters(changed_word, input)
                let final = joinCorrectAndMisplacedLetters(input, correct_letters, misplaced_letters)
                show = ""
                for (const [key, value] of Object.entries(final)) {
                    if (value == "Well placed") {
                        show += "🟢"
                    } else if (value == "Misplaced") {
                        show += "🟠"
                    } else {
                        show += "⚫"
                    }
                }
                console.log(show)
                console.log(input.split('').join(' '))
                game()
            } else {
                console.log("Ce mot n'existe pas")
                game()
            }
        });
    } else {
        console.log("Longueur non valide")
        game()
    }
}


game()