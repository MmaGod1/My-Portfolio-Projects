const questions = [
  {
    question: "Why did the developer quit their job?",
    answers: [
      { text: "They didn't get arrays", correct: true },
      { text: "Too many bugs", correct: false },
      { text: "Low salary", correct: false },
      { text: "Manager kept saying 'it's simple'", correct: false },
    ],
  },
  {
    question: "What's a developer's favourite place to hang out?",
    answers: [
      { text: "Stack Overflow", correct: false },
      { text: "The loop", correct: true },
      { text: "The cloud", correct: false },
      { text: "Git blame history", correct: false },
    ],
  },
  {
    question: "Why do programmers prefer dark mode?",
    answers: [
      { text: "It looks cooler", correct: false },
      { text: "Saves battery", correct: false },
      { text: "Because light attracts bugs", correct: true },
      { text: "VS Code told them to", correct: false },
    ],
  },
  {
    question: "How many programmers does it take to change a light bulb?",
    answers: [
      { text: "Just one, but it takes 3 weeks", correct: false },
      { text: "undefined", correct: false },
      { text: "None, that's a hardware problem", correct: true },
      { text: "Two, one to code one to review", correct: false },
    ],
  },
  {
    question: "What did the JavaScript developer say at the restaurant?",
    answers: [
      { text: "Can I get a callback with that?", correct: false },
      { text: "I'll have the null, with undefined on the side", correct: true },
      { text: "Is the soup async?", correct: false },
      { text: "I only eat JSON", correct: false },
    ],
  },
];

// Start Screen
const startBtn = document.getElementById("start-btn");
const startQuiz = document.getElementById("start-screen");

// Quizes Screen
const quizScreen = document.getElementById("quiz-screen");
const quizQuestion = document.getElementById("question");
const currentQuestion = document.getElementById("current-question");
const currentScore = document.getElementById("score");
const totalQuestion = document.getElementById("total-question");
const answerBtns = document.querySelectorAll(".answer-option");
const progressFill = document.getElementById("progress-fill");

// Result Screen
const resultScreen = document.getElementById("result-screen");
const totalScore = document.getElementById("total-score");
const comment = document.getElementById("comment");
const restartBtn = document.getElementById("restart-quiz");

// Game state
totalQuestion.textContent = questions.length;
let index = 0;
let score = 0;

// Show current question
function showQuestions() {
  const quiz = questions[index];
  currentQuestion.textContent = index + 1;
  quizQuestion.textContent = quiz.question;

  quiz.answers.forEach((answer, i) => {
    answerBtns[i].textContent = answer.text;
    answerBtns[i].disabled = false;
    answerBtns[i].classList.remove("correct", "wrong");
  });

  const progress = (index / questions.length) * 100;
  progressFill.style.width = progress + "%";
}

// Restart Quiz
function restartQuiz() {
  index = 0;
  score = 0;
  currentScore.textContent = 0;
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestions();
}

// Handle answer clicks
answerBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const answers = questions[index].answers;
    const selectedButton = e.target;
    const percentage = (score / questions.length) * 100;

    // Update Score
    answers.forEach((answer) => {
      if (selectedButton.textContent === answer.text && answer.correct) {
        score++;
        currentScore.textContent = score;
      }
    });

    // Update Styling
    answerBtns.forEach((btn, i) => {
      if (answers[i].correct) {
        btn.classList.add("correct"); // always show correct
      } else if (btn === selectedButton) {
        btn.classList.add("wrong"); // only mark clicked wrong button
      }
    });

    answerBtns.forEach((b) => (b.disabled = true));

    // Auto advance after 1.5 seconds
    setTimeout(() => {
      index++;

      if (index < questions.length) {
        showQuestions();
      } else {
        // Game over
        quizScreen.classList.remove("active");
        resultScreen.classList.add("active");
        totalScore.textContent = score;

        if (percentage <= 40) {
          comment.textContent = "Okay, try again!";
        } else if (percentage <= 70) {
          comment.textContent = "Good job – pun intended!";
        } else {
          comment.textContent = "Excellent, you got the joke!";
        }
      }
    }, 1500);
  });
});

// Start button
startBtn.addEventListener("click", () => {
  startQuiz.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestions();
});

restartBtn.addEventListener("click", restartQuiz);
