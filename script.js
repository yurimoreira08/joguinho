const questions = [
    {
        question: 'O que significa HTML?',
        answers: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'HyperText Markdown Language', correct: false },
            { text: 'HyperText Machine Language', correct: false },
            { text: 'HyperTool Markup Language', correct: false }
        ]
    },
    {
        question: 'Qual é a sintaxe correta para criar uma função em JavaScript?',
        answers: [
            { text: 'function myFunction()', correct: true },
            { text: 'def myFunction()', correct: false },
            { text: 'func myFunction()', correct: false },
            { text: 'function:myFunction()', correct: false }
        ]
    },
    {
        question: 'Como você declara uma variável em JavaScript?',
        answers: [
            { text: 'var myVariable', correct: true },
            { text: 'let myVariable', correct: true },
            { text: 'const myVariable', correct: true },
            { text: 'variable myVariable', correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;

function startGame() {
    currentQuestionIndex = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Recomeçar';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        startGame();
    }
});

startGame();
