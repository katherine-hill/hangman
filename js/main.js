(function() {
    "use strict";

    const HangManModule = function() {

        let i = 0; //user entries
        let turns = 10;
        let currentWord = " ";
        let currentWordSplit = '';
        let sepLetters = [];
        let prevGuess = [];
        let checkAgainst = [];
        let correctGuessedLetters = [];
        let turnDisplay = document.querySelector('.turns');
        let playerInput = document.getElementById('letter');
        let userGuess = document.getElementById('hangman');
        let currentWordCount = Object.keys(currentWord).length;
        let restart = document.getElementById('restart');
        let resultsContainer = document.createElement('span');
        let results = document.querySelector('.win-lose');
        let turnCount = document.createElement('span');
        let prevLet = document.querySelector('.alreadyguessed');
        let prevLetDisplay = document.createElement('span');
        let wordContainer = document.querySelector('.letters-list');
        const wordInput = document.getElementById('letter');
        const submitBtn = document.getElementById('guess');
        const wordDisplay = document.querySelector('.word');

        function chooseWord(exWordCatcher) {
            let randomGen = Math.floor(Math.random() * exWordCatcher.length);
            if (exWordCatcher[randomGen].content.length >= 3) {
                currentWord = exWordCatcher[randomGen].content;
                console.log(currentWord);
                return currentWord;
            } else {
                console.log(exWordCatcher[randomGen].content);
            }
        }

        function letterSplit(exCurrentWord) {
            let currentWordSplit = currentWord.split("");
            sepLetters.push(currentWordSplit);
            return currentWordSplit;
        }
        userGuess.addEventListener('submit', (event) => {
            event.preventDefault();
            let chosenLetter = playerInput.value.toLowerCase();
            userDisplayLetter(chosenLetter);
        });
        restart.addEventListener('click', (event) => {
            location.reload();
        });

        function userDisplayLetter(guessedLetter) {

            const character = document.querySelectorAll('.letters');
            userGuess.reset();
            prevGuess.push(guessedLetter);

            for (var i = 0; i < character.length; i++) {
                if (currentWord.charAt(i) === guessedLetter) {
                    character[i].innerHTML = guessedLetter;
                    correctGuessedLetters.push(guessedLetter);
                    checkAgainst.push(character[i]);
                }
            }
            console.log(checkAgainst);
            incorrectDisplay();
            userResults(character);
        }

        function incorrectDisplay(character) {

            if (checkAgainst.length > 0) {
                checkAgainst = [];
            } else if (checkAgainst.length === 0) {

                turns--;
                turnCount.innerHTML = `Turn: ${turns}`;
            }
        }

        function userResults(character) {
            for (var i = 0; i < currentWord.length; i++) {
                if (correctGuessedLetters.length == sepLetters[0].length) {
                    results.innerHTML = 'You won, wow!';
                    wordInput.className = 'is-hidden';
                    submitBtn.className = 'is-hidden';
                } else if (turns === 0 && correctGuessedLetters.length !== sepLetters[0].length) {
                    wordInput.className = 'is-hidden';
                    submitBtn.className = 'is-hidden';
                    results.innerHTML = `You lost, the correct word was ${currentWord}!`;
                }
            }
        }

        function displayUnderscores() {
            console.log(sepLetters);
            turnCount.className = 'turncount';
            turnCount.innerHTML = `Turn: ${turns}`;
            turnDisplay.appendChild(turnCount);
            for (let index = 0; index < currentWord.length; index++) {

                let char = document.createElement('li');
                char.className = 'letters';
                char.innerHTML = '_';
                wordContainer.appendChild(char);
            }
        }

        function getWords() {
            let http = new XMLHttpRequest();

            http.onreadystatechange = function() {
                if (http.readyState === 4 && http.status === 200) {
                    let wordCatcher = JSON.parse(http.response);
                    chooseWord(wordCatcher);
                    letterSplit();
                    displayUnderscores();
                }
            };

            http.open('GET', './data/words.json', true);
            http.send();
        }
        return {
            getWords: getWords,
        };
    };
    const hangmanApp = HangManModule();
    hangmanApp.getWords();
}());
