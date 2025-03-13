const API_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.querySelector(".quiz-container"); 


async function fetchQuestions() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        questions = data.results;
        loadQuestion();
    } catch (error) {
        console.error("Error fetching questions:", error);
        questionText.textContent = "Failed to load questions.";
    }
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];

    questionText.innerHTML = question.question;

    let answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort(() => Math.random() - 0.5); 
    const optionLetters = ["A", "B", "C", "D"]; 
    optionsContainer.innerHTML = ""; 

    answers.forEach((answer, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.innerHTML = `<span class="option-letter">${optionLetters[index]}</span> ${answer}`;
        
        optionDiv.onclick = () => selectAnswer(optionDiv, answer, question.correct_answer);
        optionsContainer.appendChild(optionDiv);
    });

    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Finish";
    } else {
        nextBtn.textContent = "Next Question";
    }
}

function selectAnswer(selectedOption, selectedAnswer, correctAnswer) {
    if (selectedOption.classList.contains("selected")) return;
    
    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected", "correct", "wrong"));

    selectedOption.classList.add("selected");

    if (selectedAnswer === correctAnswer) {
        selectedOption.classList.add("correct");
        score += 10;
    } else {
        selectedOption.classList.add("wrong");
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <br>
        <p>Your final score: <strong>${score}</strong> points</p>
        <br>
        <button class="btn" onclick="restartQuiz()">Thanks for playing.</button>
    `;
}

fetchQuestions();
