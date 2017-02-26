(function() {
    "use strict";
    /////////
    //construct
    ////////
    const HangManModule = function() {

        ////globals///////
        let currentWord = " "; //random word pulled from string

        let playerInput = document.getElementById('letter');
        let currentWordCount = Object.keys(currentWord).length;
        let userGuess = document.getElementById('hangman');
        let restart = document.getElementById('restart');
        let i = 0; //user entries
        let turns = 10;
        let turnDisplay = document.querySelector('.turns');
        let sepLetters = [];
        let resultsContainer = document.createElement('span');
        let results = document.querySelector('.win-lose');
        let turnCount = document.createElement('span');
        let correctGuessedLetters = [];
        let currentWordSplit = '';
        let guessedLettersContainer = document.querySelector('.alreadyguessed');
        let guessedLettersDisplay = document.createElement('span');
        let wordContainer = document.querySelector('.letters-list');
        const wordInput = document.getElementById('letter');
        const submitBtn = document.getElementById('guess');
        const wordDisplay = document.querySelector('.word');

        //////
        ///fxn choose a word
        /////


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
        ////
        //Letter  Split
        //////

        function letterSplit(exCurrentWord) {
            let currentWordSplit = currentWord.split("");
            sepLetters.push(currentWordSplit);
            return currentWordSplit;

        }

        /////
        //fxn user guess
        /////

        userGuess.addEventListener('submit', (event) => {
            //
            event.preventDefault();
            let chosenLetter = playerInput.value.toLowerCase();

            turns--;
            userDisplayLetter(chosenLetter);


        });
        restart.addEventListener('click', (event) => {
            location.reload();

        });

        function userDisplayLetter(guessedLetter) {

            turnCount.className = 'turncount';
            turnCount.innerHTML = `Turn: ${turns}`;
            turnDisplay.appendChild(turnCount);

            const character = document.querySelectorAll('.letters');
            userGuess.reset();
            for (var i = 0; i < character.length; i++) {
                if (currentWord.charAt(i) === guessedLetter) {
                    character[i].innerHTML = guessedLetter;
                    correctGuessedLetters.push(guessedLetter);
                }
            }
            userResults(character);
            return character;



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
                    results.innerHTML = 'You lost, try again!';

                }

                // } else if (wordContainer !== currentWordSplit) {
                //     console.log('you win!');
                // }
            }
        }


        /////////////
        //DISPLAY WERDS
        ///////
        function displayUnderscores() {
            console.log(sepLetters);
            for (let index = 0; index < currentWord.length; index++) {

                let char = document.createElement('li');
                char.className = 'letters';
                char.innerHTML = '_';
                wordContainer.appendChild(char);





            }

        }
        ///////////
        //AJAX Request
        /////////
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
        ////return for construct/////////
        return {
            getWords: getWords,

        };

    }; /////construct end///////

    //rename and grab return
    const hangmanApp = HangManModule();
    hangmanApp.getWords();

}());
