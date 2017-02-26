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
        let answerArray = [];
        let guessedUnderscore = [];
        let resultsContainer = document.createElement('span');
        let results = document.querySelector('.win-lose');
        let turnCount = document.createElement('span');
        let guessedLettersArray = [];
        let guessedLettersContainer = document.querySelector('.alreadyguessed');
        let guessedLettersDisplay = document.createElement('span');
        let wordContainer = document.querySelector('.letters-list');
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
        //Letter Count and Split
        //////
        function letterCount(exCurrentWord) {
            let currentWordCount = currentWord.length;
            console.log(currentWordCount);
            let currentWordSplit = currentWord.split("");
            sepLetters.push(currentWordSplit);




        }

        /////
        //fxn user guess
        /////

        userGuess.addEventListener('submit', (event) => {
            //
            event.preventDefault();
            let chosenLetter = playerInput.value.toLowerCase();
            guessedLettersArray.push(chosenLetter);

            turns--;
            userGuessCheck(chosenLetter);


        });
        restart.addEventListener('click', (event) => {
            location.reload();

        });

        function userGuessCheck(guessedLetter, guessAgainst) {

            turnCount.className = 'turncount';
            turnCount.innerHTML = `Turn: ${turns}`;
            turnDisplay.appendChild(turnCount);
            for (var i = 0; i < wordContainer.length; i++) {
                if (wordContainer !== sepLetters) {
                    results.innerHTML('You lost, try again!');
                }
            }
            // const char = document.querySelectorAll('.letters');
            // for (var i = 0; i < char.length; i++) {
            //     if (currentWord.charAt(i) === letter) {
            //
            //     }
            // }



        }
        /////////////
        //DISPLAY WERDS
        ///////
        function displayWords() {
            console.log(sepLetters);
            for (let index = 0; index < currentWord.length; index++) {

                let char = document.createElement('li');
                char.className = 'letters';
                char.innerHTML = '_';
                wordContainer.appendChild(char);
                guessedUnderscore.push(char);




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
                    letterCount();
                    displayWords();
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
