document.addEventListener('DOMContentLoaded', function () {

  // task 1

  document.querySelector('.group-form').addEventListener('submit', function (e) {
    e.preventDefault(); 


    clearErrors();

    // Get constants from HTML
    const name = document.getElementById('name');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const team = document.getElementById('team');

    let formValid = true;

    // conditions for showing errors if necessary

    if (name.value.trim() === '') {
      formValid = false;
      showError('name', 'First name is required.');
    }

    if (lastname.value.trim() === '') {
      formValid = false;
      showError('lastname', 'Last name is required.');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === '') {
      formValid = false;
      showError('email', 'Email is required.');
    } else if (!emailRegex.test(email.value.trim())) {
      formValid = false;
      showError('email', 'Please enter a valid email address.');
    }

    if (password.value.trim() === '') {
      formValid = false;
      showError('password', 'Password is required.');
    } else if (password.value.trim().length < 8) {
      formValid = false;
      showError('password', 'Password must be at least 8 characters long.');
    }

    if (team.value === '') {
      formValid = false;
      showError('team', 'Please select a team size.');
    }

    const checkboxes = document.querySelectorAll('.check input[type="checkbox"]');
    let selectedCount = 0;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        selectedCount++;
      }
    });

    if (selectedCount < 3) {
      formValid = false;
      showError('checkboxes', 'Choose at least 3 services');
    }

    if (formValid) {
      // Hide Task 1 
      document.querySelector('.task1-div').style.display = 'none';

      // Show Task 2 
      document.querySelector('.task2-div').style.display = 'flex';
      document.querySelector('body').style.backgroundColor = '#D9D9D9';


      rockPaperScissors(); 
    }
  });

  // Function to show error message
  function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  // Function to clear error messages
  function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(error => error.textContent = '');
  }



  // task 2

  // rock paper scissors logic
  function rockPaperScissors() {
    let rock = document.getElementById("rock");
    let paper = document.getElementById("paper");
    let scissors = document.getElementById("scissors");
    let computerChoice = document.getElementById("comp");
    let userChoice = document.getElementById("user");
    let resultText = document.querySelector(".result p");
    let playerScoreElem = document.querySelector(".player-score p:nth-child(2)");
    let computerScoreElem = document.querySelector(".computer-score p:nth-child(2)");
    let historyList = document.querySelector(".game-history ul");
    let resetBtn = document.getElementById("reset-btn");
    let arr = ["./rock.png", "./paper.png", "./scissors.png"];
    let randnum = Math.floor(Math.random() * 3);
    let score = {
      player: 0,
      computer: 0,
    };
    let round = 1;

    // Event listeners for game buttons
    rock.addEventListener('click', () => generate('rock'));
    paper.addEventListener('click', () => generate('paper'));
    scissors.addEventListener('click', () => generate('scissors'));

    // generate computer choice, display computer and user choices, update scores and game history
    function generate(userInput) {
      randnum = Math.floor(Math.random() * 3);
      let computerMove = arr[randnum]; 

      // display computer choice
      computerChoice.classList.remove("flip");
      void computerChoice.offsetWidth;
      computerChoice.src = computerMove;
      if (computerMove.includes("paper")) {
        computerChoice.classList.add("flip");
      }

      // display user choice
      userChoice.classList.remove("flip");
      void userChoice.offsetWidth;
      userChoice.src = "./" + userInput + ".png";
      if (userInput === "rock" || userInput === "scissors") {
        userChoice.classList.add("flip");
      }

      // Extract move name for comparison
      let computerInput = computerMove.replace("./", "").replace(".png", "");
      let result = compare(userInput, computerInput);

      if (result === "win") score.player++;
      else if (result === "lose") score.computer++;

      resultText.textContent = getResultMessage(result);

      // Update scores
      playerScoreElem.style.display = "block";
      computerScoreElem.style.display = "block";
      playerScoreElem.textContent = score.player;
      computerScoreElem.textContent = score.computer;

      // Update game history
      let outcomeEmoji = result === "win" ? "🏆 Player Wins!" : result === "lose" ? "😞 Computer Wins!" : "🤝 It's a Draw!";
      let li = document.createElement("li");
      li.textContent = `Round ${round++}: Player - ${capitalize(userInput)}, Computer - ${capitalize(computerInput)} → ${outcomeEmoji}`;
      historyList.appendChild(li);
    }

    // display result
    function getResultMessage(result) {
      resultText.style.visibility = "visible";
      if (result === "win") return "YOU WON! 🎉";
      if (result === "lose") return "YOU LOST! 😞";
      return "IT'S A DRAW! 🤝";
    }

    //logic to identify a winner
    function compare(userInput, computerInput) {
      if (userInput === computerInput) return "draw";
      if (
        (userInput === "rock" && computerInput === "scissors") ||
        (userInput === "paper" && computerInput === "rock") ||
        (userInput === "scissors" && computerInput === "paper")
      ) {
        return "win";
      }
      return "lose";
    }

    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // logic for reset button
    resetBtn.addEventListener("click", function () {
      score.player = 0;
      score.computer = 0;
      playerScoreElem.textContent = 0;
      computerScoreElem.textContent = 0;

      resultText.textContent = "Waiting for your move...";
      
      playerScoreElem.style.display = "none";
      computerScoreElem.style.display = "none";

      userChoice.classList.remove("flip");
      computerChoice.classList.remove("flip");
      void userChoice.offsetWidth;
      void computerChoice.offsetWidth;

      userChoice.src = "scissors.png";
      computerChoice.src = "scissors.png";

      userChoice.classList.add("flip");

      historyList.innerHTML = "";
      round = 1;
    });
  }
});
