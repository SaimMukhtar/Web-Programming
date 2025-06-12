const questions = [
    { question: "What is the capital of France?", answers: { a: "Berlin", b: "Madrid", c: "Paris" }, correct: "c" },
    { question: "What is the main color of the sun?", answers: { a: "Yellow", b: "Blue", c: "Red" }, correct: "a" },
    { question: "What is 5 + 3?", answers: { a: "6", b: "8", c: "9" }, correct: "b" },
    { question: "Which fashion brand is known for its iconic check pattern?", answers: { a: "Gucci", b: "Burberry", c: "Prada" }, correct: "b" },
    { question: "What do you call the study of fashion trends and styles?", answers: { a: "Fashionology", b: "Fashion Design", c: "Fashion Marketing" }, correct: "a" },
    { question: "Which accessory is commonly worn to enhance an outfit?", answers: { a: "Socks", b: "Scarf", c: "Hats" }, correct: "b" },
    { question: "What is 10 - 6?", answers: { a: "2", b: "4", c: "6" }, correct: "b" },
    { question: "What is 12 divided by 4?", answers: { a: "2", b: "3", c: "4" }, correct: "b" },
    { question: "What is 7 times 3?", answers: { a: "21", b: "20", c: "19" }, correct: "a" },
    { question: "What is the largest ocean on Earth?", answers: { a: "Atlantic Ocean", b: "Indian Ocean", c: "Pacific Ocean" }, correct: "c" },
    { question: "Who was the first president of the United States?", answers: { a: "Abraham Lincoln", b: "George Washington", c: "Thomas Jefferson" }, correct: "b" },
    { question: "Which planet is known as the Blue Planet?", answers: { a: "Earth", b: "Mars", c: "Neptune" }, correct: "a" },
    { question: "What is the currency used in Japan?", answers: { a: "Yen", b: "Won", c: "Dollar" }, correct: "a" },
    { question: "What is the process of cooking food in water or broth called?", answers: { a: "Baking", b: "Boiling", c: "Frying" }, correct: "b" },
    { question: "What is the capital city of the United Kingdom?", answers: { a: "London", b: "Edinburgh", c: "Cardiff" }, correct: "a" },
    { question: "What is the basic unit of life?", answers: { a: "Atom", b: "Cell", c: "Molecule" }, correct: "b" },
];

let quizContainer = document.getElementById('quiz');
let score = 0;

function startQuiz() {
    let numQuestions = prompt("How many questions would you like to answer?", 10);
    numQuestions = Math.min(numQuestions, questions.length);
    
    let selectedQuestions = [];
    while (selectedQuestions.length < numQuestions) {
        let randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(randomIndex)) {
            selectedQuestions.push(randomIndex);
        }
    }

    quizContainer.innerHTML = '';
    selectedQuestions.forEach(index => {
        let q = questions[index];
        quizContainer.innerHTML += `
            <p>${q.question}</p>
            <p>A) ${q.answers.a}</p>
            <p>B) ${q.answers.b}</p>
            <p>C) ${q.answers.c}</p>
            <input type="text" id="answer-${index}" placeholder="Enter A, B, or C"><br>
        `;
    });

    quizContainer.innerHTML += '<button onclick="submitQuiz()">Submit</button>';
}

function submitQuiz() {
    let correctAnswers = 0;
    selectedQuestions.forEach(index => {
        let q = questions[index];
        let userAnswer = document.getElementById(`answer-${index}`).value.toLowerCase();
        if (userAnswer === q.correct) {
            correctAnswers++;
        }
    });

    quizContainer.innerHTML += `<p>You got ${correctAnswers} out of ${selectedQuestions.length} correct (${(correctAnswers / selectedQuestions.length * 100).toFixed(2)}%)</p>`;
}

document.addEventListener('DOMContentLoaded', startQuiz);
