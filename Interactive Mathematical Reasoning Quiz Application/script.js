const questions = [
    {
        q: "What is the next number in the sequence: 2, 4, 8, 16, 32, ___?",
        options: ["48", "64", "52", "72"],
        answer: 1
    },
    {
        q: "If x+3=7, what is the value of x?",
        options: ["3", "5", "10", "4"],
        answer: 3
    },
    {
        q: "If the perimeter of a square is 20 cm, what is the length of one side?",
        options: ["10 cm", "5 cm", "4 cm", "8 cm"],
        answer: 1
    },
    {
        q: "A bag contains 5 red balls and 3 blue balls. What is the probability of randomly picking a red ball?",
        options: ["2/1", "8/5", "8/3", "3/2"],
        answer: 1
    },
    {
        q: "John is twice as old as Mary. If John is 24 years old, how old will Mary be in 5 years?",
        options: ["12", "17", "29", "14"],
        answer: 1
    },
    {
        q: "The length of a rectangle is 8 cm, and its width is 5 cm. What is its area?",
        options: ["13 cm²", "40 cm²", "18 cm²", "24 cm²"],
        answer: 1
    },
    {
        q: "A train travels 300 km in 5 hours. What is its average speed?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        answer: 1
    },
    {
        q: "What is the smallest prime number greater than 20?",
        options: ["21", "23", "25", "27"],
        answer: 1
    },
    {
        q: "What is the sum of the angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        answer: 1
    },
    {
        q: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?",
        options: ["10", "11", "13", "15"],
        answer: 2
    }
];

function renderQuiz() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = '';
    
    questions.forEach((question, questionIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<div><b>Q${questionIndex + 1}:</b> ${question.q}</div>`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        question.options.forEach((option, optionIndex) => {
            const optionId = `q${questionIndex}_opt${optionIndex}`;
            
            // Create container for each radio option
            const optionContainer = document.createElement('div');
            optionContainer.className = 'radio-option';
            
            // Create radio input
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `q${questionIndex}`;
            radioInput.id = optionId;
            radioInput.value = optionIndex;
            
            // Create label
            const label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = option;
            
            optionContainer.appendChild(label);
            optionContainer.appendChild(radioInput);
            
            optionsDiv.appendChild(optionContainer);
        });
        
        questionDiv.appendChild(optionsDiv);
        quizForm.appendChild(questionDiv);
    });
}

function showFeedback(score, total, userAnswers) {
    
    const feedback = document.getElementById('feedback');
    const percentage = Math.round((score / total) * 100);
        
     feedback.innerHTML = `
        <div class="feedback-container">
            <div class="score-display">
                <span class="score-number">${score}</span> out of <span class="score-total">${total}</span> correct
            </div>
            <div class="score-percentage">${percentage}%</div>
            <div class="feedback-message">${getFeedbackMessage(percentage)}</div>
        </div>
        `;
        


    questions.forEach((question, questionIndex) => {
        const questionDiv = document.getElementsByClassName('question')[questionIndex];
        const optionContainers = questionDiv.querySelectorAll('.radio-option');
        
        optionContainers.forEach((container, optionIndex) => {
            const label = container.querySelector('label');
            const radio = container.querySelector('input');
            
            container.classList.remove('correct', 'incorrect');
            label.classList.remove('correct', 'incorrect');
            
            if (optionIndex === question.answer) {
                container.classList.add('correct');
                label.classList.add('correct');
            }
            
            if (userAnswers[questionIndex] !== undefined) {
                if (parseInt(userAnswers[questionIndex]) === optionIndex) {
                    if (optionIndex !== question.answer) {
                        container.classList.add('incorrect');
                        label.classList.add('incorrect');
                    }
                }
            }
        });
    });
}

function getFeedbackMessage(percentage) {
    if (percentage >= 90) return "Excellent work! You're a math wizard! 🎉";
    if (percentage >= 70) return "Great job! You've got strong math skills! 👍";
    if (percentage >= 50) return "Good effort! Keep practicing! 💪";
    return "Keep trying! You'll improve with more practice! ✨";
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
    
    document.getElementById('submit-btn').addEventListener('click', function() {
        let score = 0;
        const userAnswers = [];
        
        questions.forEach((question, questionIndex) => {
            const radios = document.getElementsByName(`q${questionIndex}`);
            let answered = false;
            
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    userAnswers[questionIndex] = radios[i].value;
                    if (parseInt(radios[i].value) === question.answer) {
                        score++;
                    }
                    answered = true;
                }
            }
            
            if (!answered) {
                userAnswers[questionIndex] = undefined;
            }
        });
        
        showFeedback(score, questions.length, userAnswers);
    });
});