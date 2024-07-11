const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const restartBtn = document.getElementById('restart-btn');
const levelSelection = document.getElementById('level-selection');
const levelButtons = document.querySelectorAll('.level-btn');

const questions = {
    1: [
        { question: '¿Cuánto es 5 + 7?', answer: 12 },
        { question: '¿Qué es 15 - 9?', answer: 6 },
        { question: '¿Cuánto es 12 / 3?', answer: 4 },
        { question: '¿Cuál es el cuadrado de 3?', answer: 9 }
    ],
    2: [
        { question: '¿Cuál es el resultado de 8 * 6?', answer: 48 },
        { question: '¿Cuánto es 7 * 9?', answer: 63 },
        { question: '¿Cuánto es 144 / 12?', answer: 12 },
        { question: '¿Cuál es el resultado de 3^3?', answer: 27 }
    ],
    3: [
        { question: '¿Cuál es el cuadrado de 9?', answer: 81 },
        { question: '¿Cuánto es la raíz cuadrada de 64?', answer: 8 },
        { question: '¿Cuánto es 18 + 24?', answer: 42 },
        { question: '¿Cuánto es 25 * 4?', answer: 100 }
    ]
};

let currentLevel = 0;
let currentQuestionIndex = 0;
let shuffledQuestions = [];

sendBtn.addEventListener('click', sendMessage);
restartBtn.addEventListener('click', restartGame);
levelButtons.forEach(button => button.addEventListener('click', startGame));

function startGame(event) {
    currentLevel = parseInt(event.target.getAttribute('data-level'));
    shuffledQuestions = shuffleArray([...questions[currentLevel]]);
    currentQuestionIndex = 0;
    levelSelection.style.display = 'none';
    userInput.style.display = 'block';
    sendBtn.style.display = 'block';
    restartBtn.style.display = 'block';
    chatbox.innerHTML = '';
    botMessage('¡Nivel ' + currentLevel + ' seleccionado! Aquí va tu primera pregunta:');
    botMessage(shuffledQuestions[currentQuestionIndex].question);
}

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    displayMessage(userMessage, 'user-message');
    userInput.value = '';

    checkAnswer(parseInt(userMessage));
}

function displayMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(className);
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function botMessage(message) {
    displayMessage(message, 'bot-message');
}

function checkAnswer(userAnswer) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (userAnswer === currentQuestion.answer) {
        botMessage('¡Correcto! ' + currentQuestion.question + ' = ' + currentQuestion.answer);
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setTimeout(() => {
                botMessage(shuffledQuestions[currentQuestionIndex].question);
            }, 1000);
        } else {
            setTimeout(() => {
                botMessage('¡Felicidades! Has respondido todas las preguntas del Nivel ' + currentLevel + ' correctamente.');
            }, 1000);
        }
    } else {
        botMessage('Incorrecto. Inténtalo de nuevo. ' + currentQuestion.question);
    }
}

function restartGame() {
    currentLevel = 0;
    currentQuestionIndex = 0;
    levelSelection.style.display = 'flex';
    userInput.style.display = 'none';
    sendBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    chatbox.innerHTML = '';
    botMessage('¡Hola! Soy tu asistente de matemáticas. Selecciona un nivel para empezar:');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Iniciar con la selección de nivel
botMessage('¡Hola! Soy tu asistente de matemáticas. Selecciona un nivel para empezar:');
