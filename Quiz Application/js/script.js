// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Variables for quiz state
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let startTime, endTime; // Variables to calculate total quiz duration

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Start Quiz button click
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Show info box
}

// Exit Quiz button click
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
}

// Continue Quiz button click
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    startTimer(timeValue); // Start timer
    startTimerLine(widthValue); // Start timer line
    showQuetions(que_count); // Show questions
    queCounter(que_numb); // Update question counter
    startTime = new Date(); // Start time for total quiz duration
}

// Restart Quiz button click
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    result_box.classList.remove("activeResult"); // Hide result box
    resetQuiz(); // Reset quiz variables and state
    showQuetions(que_count); // Show questions
    queCounter(que_numb); // Update question counter
    startTimer(timeValue); // Start timer
    startTimerLine(widthValue); // Start timer line
    startTime = new Date(); // Reset start time for total quiz duration
}

// Quit Quiz button click
quit_quiz.onclick = () => {
    window.location.reload(); // Reload the current window
}

// Next Question button click
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { // If there are more questions
        que_count++; // Increment question count
        que_numb++; // Increment question number
        showQuetions(que_count); // Show next question
        queCounter(que_numb); // Update question counter
        clearInterval(counter); // Clear timer
        clearInterval(counterLine); // Clear timer line
        startTimer(timeValue); // Start timer for next question
        startTimerLine(widthValue); // Start timer line for next question
        timeText.textContent = "Time Left"; // Update time text
        next_btn.classList.remove("show"); // Hide next button
    } else {
        clearInterval(counter); // Clear timer
        clearInterval(counterLine); // Clear timer line
        showResult(); // Show results
    }
}

// Getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    // Creating a new span and div tag for question and option
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '';
    questions[index].options.forEach((option, i) => {
        option_tag += '<div class="option"><span>' + option + '</span></div>';
    });
    
    que_text.innerHTML = que_tag; // Adding new span tag inside que_text
    option_list.innerHTML = option_tag; // Adding new div tag inside option_list
    
    const option = option_list.querySelectorAll(".option");

    // Set onclick attribute to all available options
    option.forEach(opt => {
        opt.setAttribute("onclick", "optionSelected(this)");
    });
}

// Creating the new div tags for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// If user clicked on option
function optionSelected(answer) {
    clearInterval(counter); // Clear timer
    clearInterval(counterLine); // Clear timer line
    let userAns = answer.textContent; // Get user selected option
    let correcAns = questions[que_count].answer; // Get correct answer from array
    const allOptions = option_list.children.length; // Get all option items

    if (userAns === correcAns) { // If selected option is correct
        userScore += 1; // Increment score
        answer.classList.add("correct"); // Highlight correct option
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon to correct option
    } else {
        answer.classList.add("incorrect"); // Highlight incorrect option
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Add cross icon to incorrect option

        // Automatically select the correct answer if user selected wrong
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent === correcAns) {
                option_list.children[i].setAttribute("class", "option correct"); // Highlight correct option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon to correct option
            }
        }
    }
    // Disable all options after selection
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); // Show the next button
}

function showResult() {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.remove("activeQuiz"); // Hide quiz box
    result_box.classList.add("activeResult"); // Show result box
    const scoreText = result_box.querySelector(".score_text");
    endTime = new Date(); // End time for total quiz duration
    let totalTime = Math.floor((endTime - startTime) / 1000); // Calculate total duration in seconds
    let minutes = Math.floor(totalTime / 60); 
    let seconds = totalTime % 60;

    // Display the score and total time taken
    let scoreTag = '';
    if (userScore > 3) {
        scoreTag = `<span>and congrats! 🎉, You got <p>${userScore}</p> out of <p>${questions.length}</p> in <p>${minutes} min ${seconds} sec</p></span>`;
    } else if (userScore > 1) {
        scoreTag = `<span>and nice 😎, You got <p>${userScore}</p> out of <p>${questions.length}</p> in <p>${minutes} min ${seconds} sec</p></span>`;
    } else {
        scoreTag = `<span>and sorry 😐, You got only <p>${userScore}</p> out of <p>${questions.length}</p> in <p>${minutes} min ${seconds} sec</p></span>`;
    }
    
    scoreText.innerHTML = scoreTag; // Adding score tag to scoreText
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    
    function timer() {
        timeCount.textContent = time; // Update time count
        time--; // Decrement time
        if (time < 9) { // If timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // Add a leading zero
        }
        if (time < 0) { // If timer runs out
            clearInterval(counter); // Clear timer
            timeText.textContent = "Time Off"; // Update time text
            const allOptions = option_list.children.length; // Get all option items
            let correcAns = questions[que_count].answer; // Get correct answer from array
            
            // Automatically select the correct answer
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent === correcAns) {
                    option_list.children[i].setAttribute("class", "option correct"); // Highlight correct option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon to correct option
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // Disable all options
            }
            next_btn.classList.add("show"); // Show the next button
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    
    function timer() {
        time += 1; // Increment time value
        time_line.style.width = time + "px"; // Update width of time_line
        if (time > 549) { // If width exceeds limit
            clearInterval(counterLine); // Clear timer line
        }
    }
}

function queCounter(index) {
    // Creating a new span tag and passing the question number and total question
    let totalQueCounTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
    bottom_ques_counter.innerHTML = totalQueCounTag; // Adding span tag to bottom_ques_counter
}

// Function to reset the quiz state
function resetQuiz() {
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    next_btn.classList.remove("show"); // Hide next button
    timeText.textContent = "Time Left"; // Reset time text
}
