let timerInterval;
let lives;
let currentLevel = 1;
let gameDuration = 60;
let score = 0;
let gameResults = [];
let difficulty = 'normal';
let currentStage = 1; 



function updateScore(scoreElement, score) {
    scoreElement.textContent = "Счет: " + score;
}

function loadResultsFromLocalStorage() {
    const savedResults = localStorage.getItem('gameResults');
    if (savedResults) {
        gameResults = JSON.parse(savedResults);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("levelDescriptionModal");
    const modalText = modal.querySelector("p");
    const modalHeader = modal.querySelector("h2");
    const gameContainer = document.getElementById("colorGame");
    const startButton = document.getElementById("startLevelButton");
    const heartsContainer = document.querySelector(".hearts-container");
    const timerElement = document.getElementById("timer");
    const progressBar = document.getElementById("progressBar");
    const scoreElement = document.getElementById("score");
    const difficultyModal = document.getElementById("difficultyModal");
    const normalButton = document.getElementById("normalDifficulty");
    const hardButton = document.getElementById("hardDifficulty");

    lives = heartsContainer.children.length;

    normalButton.onclick = () => {
        difficulty = 'normal';
        startGameSetup();
    };

    hardButton.onclick = () => {
        difficulty = 'hard';
        startGameSetup();
    };

    function startGameSetup() {
        difficultyModal.style.display = 'none';
        startTotalTimer(totalGameDuration);
    }
    difficultyModal.style.display = 'flex';

    let timerActive = true;
    let timerInterval;

    function startTimer(duration, display, progressBar) {
        let timer = duration;
        progressBar.style.width = '100%'; 
        progressBar.style.backgroundColor = '#8b0000';
        display.textContent = timer;
    
        clearInterval(timerInterval); 
        timerInterval = setInterval(function () {
            if (!timerActive) return; 
    
            let percentage = (timer / duration) * 100;
            progressBar.style.width = percentage + '%';
            display.textContent = timer;
    
            if (--timer < 0) {
                clearInterval(timerInterval);
                display.textContent = 'Время вышло!';
                nextLevel(); 
            }
        }, 1000);
    }

    let totalGameDuration = 120; 
    let totalTimerActive = true; 
    let totalTimerInterval; 

    function startTotalTimer(duration) {
        const totalTimerElement = document.getElementById("totalTimer");
        clearInterval(totalTimerInterval); 
        totalTimerInterval = setInterval(() => {
            if (!totalTimerActive) {
                clearInterval(totalTimerInterval);
                return;
            }
    
            duration--;
            totalTimerElement.textContent = `Оставшееся время: ${duration}s`;
    
            if (duration <= 0) {
                clearInterval(totalTimerInterval);
                endGame();
            }
        }, 1000);
    }



    document.getElementById("startLevelButton1").onclick = function() {
        startGame();
    };
    document.getElementById("startLevelButton2").onclick = function() {
        startGame();
    };
    document.getElementById("startLevelButton3").onclick = function() {
        startGame();
    };

    function removeHeart(heartsContainer) {
        if (lives > 0) {
            lives--;
            heartsContainer.children[lives].style.visibility = 'hidden';
            if (lives === 0) {
                clearInterval(timerInterval); 
                endGame(); 
            }
        }
    }


const levelHeader = document.querySelector('#gameInfo h2');


function updateLevelHeader(level) {
    levelHeader.textContent = `Уровень: ${level}`;
}

    
    function showModal(title, text) {
        modalHeader.textContent = title;
        modalText.textContent = text;
        modal.style.display = "block";
        startButton.style.display = "block";
    }

    function hideModal() {
        modal.style.display = "none";
    }

    function getLevelDescription(level) {
        switch (level) {
            case 1: return "Выберите слова, которые соответствуют заданной теме.";
            case 2: return "Выясните к какой закономерности отностятся слова.";
            case 3: return "Упорядочьте слова по категориям.";
            case 4: return "Выберите все синонимы или антонимы для предложенного слова.";
            default: return "Игра завершена! Ваш счет: " + score;
        }
    }

    function setupGame() {
        const ghosts = document.querySelectorAll('.ghost');
        ghosts.forEach(ghost => {
            ghost.classList.remove('moving');
        });
        showModal(`Уровень ${currentLevel}`, getLevelDescription(currentLevel));
        updateScore(scoreElement, score);
        startButton.onclick = function() {
            startGame();
        };
    }

    function startGame() {
        hideModal();
        timerActive = true;

  
    const ghosts = document.querySelectorAll('.ghost');
    ghosts.forEach(ghost => {
        ghost.classList.add('moving');
    });

        updateLevelHeader(currentLevel); 
        startButton.style.display = "none";
        gameContainer.style.display = "block";
        switch (currentLevel) {
            case 1: startWordThemeSelectionGame(); break;
            case 2: startPatternGame(); break;
            case 3: startSortingGame(); break;
            case 4: startSynonymsAntonymsGame(); break;
            default: endGame();
        }
    }

    function nextLevel() {
        timerActive = false;
        if (currentLevel < 4) {
            currentLevel++;
            setupGame();
        } else {
            endGame();
        }
    }

    function saveResultsToLocalStorage() {
        localStorage.setItem('gameResults', JSON.stringify(gameResults));
    }

    function updateLeaderboardUI() {
        userList.innerHTML = ''; 
        gameResults.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = `${result.userName} - Уровень: ${result.level}, Счет: ${result.score}, Жизни: ${result.livesRemaining}`;
            userList.appendChild(listItem);
        });
    }
    
    function endGame() {

        showLeaderboard();
    

        submitButton.onclick = function() {
            const userName = userNameInput.value.trim();
            if (userName !== '') {

                gameResults.push({
                    userName: userName,
                    level: currentLevel,
                    score: score,
                    livesRemaining: lives
                });
    

                saveResultsToLocalStorage();

                updateLeaderboardUI();

                userNameInput.value = '';
                inputContainer.style.display = 'none';
            }
        };
    

        totalTimerActive = false;
        clearInterval(totalTimerInterval);
    }
    

    function startWordThemeSelectionGame() {
        const themes = [
            {
                theme: "овощи",
                words: ["морковь", "огурец", "помидор", "яблоко", "банан", "капуста", "перец"],
                validWords: ["морковь", "огурец", "помидор", "капуста", "перец"]
            },
            {
                theme: "животные",
                words: ["собака", "кошка", "тигр", "авокадо", "слон", "лошадь", "виноград"],
                validWords: ["собака", "кошка", "тигр", "слон", "лошадь"]
            },
            {
                theme: "фрукты",
                words: ["банан", "яблоко", "груша", "картофель", "виноград", "ананас", "томат"],
                validWords: ["банан", "яблоко", "груша", "виноград", "ананас"]
            }
        ];
    
        let randomThemes = shuffleArray(themes).slice(0, 2); 
        let currentTheme = randomThemes[currentStage - 1]; 
    
        gameContainer.innerHTML = `<p>Выберите слова, относящиеся к теме: <strong>${currentTheme.theme}</strong></p>`;
        const wordsContainer = document.createElement("div");
        wordsContainer.style.display = "flex";
        wordsContainer.style.flexWrap = "wrap";
    
        currentTheme.words.forEach(word => {
            const wordButton = document.createElement("button");
            wordButton.textContent = word;
            wordButton.classList.add("word-button");
            wordButton.onclick = () => handleWordSelection(wordButton, word);
            wordsContainer.appendChild(wordButton);
        });
    
        const submitButton = document.createElement("button");
        submitButton.textContent = "Проверить выбор";
        submitButton.onclick = validateSelection;
    
        gameContainer.appendChild(wordsContainer);
        gameContainer.appendChild(submitButton);
    
        startTimer(gameDuration, timerElement, progressBar);
    
        const selectedWords = [];
    
        function handleWordSelection(button, word) {
            if (button.classList.contains("selected")) return;
    
            if (currentTheme.validWords.includes(word)) {
                button.classList.add("correct");
                selectedWords.push(word);
                score += 5;
            } else {
                button.classList.add("incorrect");
                removeHeart(heartsContainer);
            }
            button.disabled = true;
            updateScore(scoreElement, score);
        }
    
        function validateSelection() {
            if (selectedWords.length === currentTheme.validWords.length) {
                if (difficulty === 'hard' && currentStage === 1) {
                    currentStage++;
                    startWordThemeSelectionGame();
                } else {
                    currentStage = 1;
                    nextLevel(); 
                }
            }
        }
    }

    function startPatternGame() {
    const patterns = [
        {
            rule1: "Содержат букву 'а'",
            rule2: "Не содержат букву 'а'",
            group1: word => word.includes("а"),
            group2: word => !word.includes("а")
        },
        {
            rule1: "Длина слова четная",
            rule2: "Длина слова нечетная",
            group1: word => word.length % 2 === 0,
            group2: word => word.length % 2 !== 0
        },
        {
            rule1: "Слово начинается с гласной",
            rule2: "Слово начинается с согласной",
            group1: word => /^[аеёиоуыэюя]/i.test(word),
            group2: word => !/^[аеёиоуыэюя]/i.test(word)
        }
    ];

    const words = ["арка", "дом", "береза", "заяц", "лиса", "автобус", "школа", "сыр"];
    const randomPattern = patterns[currentStage - 1]; 

    const remainingWords = [...words];
    let correctAnswers = 0;
    startTimer(gameDuration, timerElement, progressBar);

    gameContainer.innerHTML = `
        <p><strong>Закономерности:</strong></p>
        <p>1: ${randomPattern.rule1}</p>
        <p>2: ${randomPattern.rule2}</p>
        <div id="wordDisplay"></div>
        <div>
            <input type="text" id="categoryInput" placeholder="Введите 1 или 2">
            <button id="submitAnswer">Подтвердить</button>
        </div>
        <div id="feedback"></div>
    `;

    const wordDisplay = document.getElementById("wordDisplay");
    const categoryInput = document.getElementById("categoryInput");
    const submitAnswer = document.getElementById("submitAnswer");
    const feedback = document.getElementById("feedback");

    function nextWord() {
        if (remainingWords.length === 0) {
            if (difficulty === 'hard' && currentStage === 1) {
                currentStage++;
                startPatternGame();
            } else {
                currentStage = 1;
                nextLevel();
            }
            return;
        }

        const currentWord = remainingWords.shift();
        wordDisplay.textContent = `Слово: ${currentWord}`;

        submitAnswer.onclick = () => {
            const userInput = categoryInput.value.trim();
            categoryInput.value = "";

            if (userInput !== "1" && userInput !== "2") {
                feedback.textContent = "Введите 1 или 2!";
                return;
            }

            const isCorrect =
                (userInput === "1" && randomPattern.group1(currentWord)) ||
                (userInput === "2" && randomPattern.group2(currentWord));

            if (isCorrect) {
                correctAnswers++;
                score += 10;
                feedback.textContent = "Правильно!";
            } else {
                removeHeart(heartsContainer);
                feedback.textContent = "Неправильно!";
            }

            updateScore(scoreElement, score);
            nextWord();
        };
    }

    nextWord();
}
    
function startSortingGame() {
    const categories = [
        { name: "Существительные", words: ["стол", "стул", "яблоко", "собака", "машина", "река"] },
        { name: "Глаголы", words: ["бежать", "прыгать", "читать", "писать", "играть", "спать"] },
        { name: "Прилагательные", words: ["красивый", "высокий", "низкий", "быстрый", "сильный", "умный"] },
        { name: "Наречия", words: ["быстро", "тихо", "громко", "внимательно", "нежно", "усердно"] }
    ];


    const shuffledCategories = categories.sort(() => Math.random() - 0.5);
    const selectedCategories = shuffledCategories.slice((currentStage - 1) * 2, currentStage * 2);
    const [leftCategory, rightCategory] = selectedCategories;

    const allWords = [...leftCategory.words, ...rightCategory.words].sort(() => Math.random() - 0.5);


    gameContainer.innerHTML = `
        <div class="sorting-container">
            <div class="category-block droppable" id="leftCategoryBlock">
                <h3>${leftCategory.name}</h3>
            </div>
            <div class="words-block" id="centerWordsBlock"></div>
            <div class="category-block droppable" id="rightCategoryBlock">
                <h3>${rightCategory.name}</h3>
            </div>
        </div>
    `;

    const centerWordsBlock = document.getElementById("centerWordsBlock");
    const leftCategoryBlock = document.getElementById("leftCategoryBlock");
    const rightCategoryBlock = document.getElementById("rightCategoryBlock");

    setupDroppableBlock(leftCategoryBlock, leftCategory.words);
    setupDroppableBlock(rightCategoryBlock, rightCategory.words);

    allWords.forEach(word => {
        const wordElement = document.createElement("div");
        wordElement.textContent = word;
        wordElement.classList.add("draggable-word");
        wordElement.setAttribute("draggable", "true");
        wordElement.setAttribute("data-word", word);


        wordElement.style.left = `${Math.random() * (centerWordsBlock.clientWidth - 50)}px`;
        wordElement.style.top = `${Math.random() * (centerWordsBlock.clientHeight - 50)}px`;

        wordElement.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", word);
            clearInterval(wordElement.dataset.moveInterval); 
        });

        wordElement.addEventListener("dragend", () => {
            moveWordRandomly(wordElement); 
        });

        centerWordsBlock.appendChild(wordElement);
        moveWordRandomly(wordElement);
    });

    function setupDroppableBlock(block, validWords) {
        block.addEventListener("dragover", (event) => {
            event.preventDefault(); 
        });

        block.addEventListener("drop", (event) => {
            event.preventDefault();
            const word = event.dataTransfer.getData("text/plain");
            const draggedElement = document.querySelector(`[data-word="${word}"]`);

            if (draggedElement) {
                if (validWords.includes(word)) {
                    block.appendChild(draggedElement);
                    score += 10;
                    updateScore(scoreElement, score);
                    draggedElement.style.position = "static";
                } else {
                    removeHeart(heartsContainer);
                }

                if (centerWordsBlock.children.length === 0) {
                    if (difficulty === 'hard' && currentStage < 2) {
                        currentStage++;
                        startSortingGame();
                    } else {
                        currentStage = 1;
                        nextLevel();
                    }
                }
            }
        });
    }

    function moveWordRandomly(wordElement) {
        const moveRange = 10;

        function randomMove() {
            const parent = wordElement.parentElement;
            if (!parent || parent.clientWidth === 0 || parent.clientHeight === 0) return;

            const currentX = parseFloat(wordElement.style.left) || 0;
            const currentY = parseFloat(wordElement.style.top) || 0;

            const offsetX = Math.random() * moveRange * 2 - moveRange;
            const offsetY = Math.random() * moveRange * 2 - moveRange;

            const newX = Math.min(Math.max(currentX + offsetX, 0), parent.clientWidth - wordElement.offsetWidth);
            const newY = Math.min(Math.max(currentY + offsetY, 0), parent.clientHeight - wordElement.offsetHeight);

            wordElement.style.left = `${newX}px`;
            wordElement.style.top = `${newY}px`;
        }

        const interval = setInterval(randomMove, 1000);
        wordElement.dataset.moveInterval = interval;

        wordElement.addEventListener("dragstart", () => {
            clearInterval(interval);
        });

        wordElement.addEventListener("dragend", () => {
            clearInterval(wordElement.dataset.moveInterval);
            moveWordRandomly(wordElement);
        });
    }
}
    

    
    function startSynonymsAntonymsGame() {
        const words = [
            { word: "большой", synonym: "крупный", antonym: "маленький" },
            { word: "быстрый", synonym: "скорый", antonym: "медленный" },
            { word: "яркий", synonym: "светлый", antonym: "темный" },
            { word: "горячий", synonym: "жаркий", antonym: "холодный" },
            { word: "сильный", synonym: "мощный", antonym: "слабый" },
            { word: "умный", synonym: "смышленый", antonym: "глупый" }
        ];
    
        const wordsPerStage = Math.ceil(words.length / 2);
        const currentStageWords = difficulty === 'hard'
            ? words.slice((currentStage - 1) * wordsPerStage, currentStage * wordsPerStage)
            : words;
    
        shuffleArray(currentStageWords);
    
        let currentWordIndex = 0;
        startTimer(gameDuration, timerElement, progressBar);
    
        function displayWord() {
            if (currentWordIndex >= currentStageWords.length) {
                if (difficulty === 'hard' && currentStage === 1) {
                    currentStage++;
                    startSynonymsAntonymsGame();
                } else {
                    currentStage = 1;
                    nextLevel();
                }
                return;
            }
    
            const currentWord = currentStageWords[currentWordIndex];
            const { word, synonym, antonym } = currentWord;
            const isSynonym = Math.random() < 0.5;
            const correctOption = isSynonym ? 'synonym' : 'antonym';
            const correctAnswer = isSynonym ? synonym : antonym;
            const incorrectAnswer = isSynonym ? antonym : synonym;
    
            const optionDescription = isSynonym ? 'Выберите синоним для слова:' : 'Выберите антоним для слова:';
            gameContainer.innerHTML = `
                <div>${optionDescription} <strong>${word}</strong></div>
                <div>
                    <button class="option" data-option="${correctOption}">${correctAnswer}</button>
                    <button class="option" data-option="incorrect">${incorrectAnswer}</button>
                </div>
            `;
    
            const optionButtons = document.querySelectorAll('.option');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const selectedOption = button.getAttribute('data-option');
                    checkAnswer(selectedOption, correctOption);
                });
            });
        }
    
        function checkAnswer(selectedOption, correctOption) {
            if (selectedOption === correctOption) {
                score += 10;
                updateScore(scoreElement, score);
            } else {
                removeHeart(heartsContainer);
            }
    
            currentWordIndex++;
            displayWord();
        }
    
        displayWord();
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    
    
    
    const leaderboardModal = document.getElementById('leaderboard');
const inputContainer = document.getElementById('inputContainer');
const userNameInput = document.getElementById('userNameInput');
const submitButton = document.getElementById('submitButton');
const userList = document.getElementById('userList');


function showLeaderboard() {
    leaderboardModal.style.display = 'block';
    document.querySelector('.game-frame').style.display = 'none';
    document.querySelector('.header-inner').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    
    updateLeaderboardUI();
    inputContainer.style.display = 'block';
}

submitButton.addEventListener('click', function() {
    const userName = userNameInput.value;
    if (userName.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = userName + " - " + score;
        userList.appendChild(listItem);

        inputContainer.style.display = 'none';
    }
});

    setupGame();
    loadResultsFromLocalStorage();
});
