let container = document.querySelector(".jokeContainer")
let cross = document.querySelector(".cross")
let but = document.getElementById("btn");
let check = document.querySelector(".btn");
let show = document.querySelector(".mainArea")
let modeChange = document.getElementById("dlMode");
let toggleIcon = document.querySelector(".toggle-icon");
let questionH = document.querySelector(".questionHolder");
let option = document.querySelector(".first");
let scoreContainer = document.querySelector(".scoreContainer");
let score = document.getElementById("score");
let totalScore = document.getElementById("totalScore");
let resultS = document.querySelector(".resultHolder");
let back = document.getElementsByTagName("li")
let audio = new Audio("Kaun Banega Crorepati.mp3")
let correct = "", correctAns = askedQ = 0, totalQ = 5;


toggleIcon.addEventListener("click", (e) => {
  e.preventDefault();
  let body = document.body;
  body.classList.toggle("dark");
  toggleIcon.classList.toggle("bx-sun")
  // toggleIcon.classList.toggle("fa-sun")
})

const checkBtn = () =>{
  check.addEventListener( "click", ansCheck)
}

document.addEventListener(("DOMContentLoaded"), (e) => {
  e.preventDefault();
  loadQuestion();
  checkBtn();
  score.textContent = correctAns;
  totalScore.textContent = totalQ;
})

but.addEventListener("click", (e) => {
  e.preventDefault()
  container.style.height = "460px";
  cross.classList.add("active");
  show.classList.add("active");
  but.classList.add("active");
  scoreContainer.classList.add("active")
  
  // loadQuestion();
  // generatedJokes();
});
cross.addEventListener("click", (e) => {
  e.preventDefault()
  container.style.height = "100px";
  show.classList.remove("active");
  // jokes.classList.remove("active");
  cross.classList.remove("active");
  // type.classList.remove("active");
  but.classList.remove("active");
  scoreContainer.classList.remove("active")
  askedQ = 0;
  correctAns = 0;
  score.textContent = correctAns;
  totalScore.textContent = totalQ;
  loadQuestion();
  check.style = "display";
});


// Data Fetching
const loadQuestion = () => {
  let quizUrl = fetch("https://opentdb.com/api.php?amount=1&category=21&type=multiple")
  quizUrl.then((response) => {
    return response.json()
  }).then((value) => {
    // console.log(value.results[0]) 
    let data = value.results[0];
    displayQuestion(data);
    resultS.innerHTML = "";
  }).catch((err) => {
    console.log("Error")
  })
}

const displayQuestion = (data) => {
check.disabled = false;
let question = data.question;
correct = data.correct_answer;
let incorrect = data.incorrect_answers;
let options = incorrect;

options.splice(Math.floor(Math.random() * (incorrect.length + 1)), 0, correct);
// console.log(options);

questionH.innerHTML = question;
option.innerHTML = `
  <li>${options[0]}</li>
  <li>${options[1]}</li>
  <li>${options[2]}</li>
  <li>${options[3]}</li>
  `
  optionSelect();
  // console.log(correct);
}

const optionSelect = () =>{
    option.querySelectorAll("li").forEach((options) => {
    options.addEventListener("click", (e) => {
      e.preventDefault();
      if(option.querySelector(".selected")){
        let optionActive = option.querySelector(".selected");
        optionActive.classList.remove("selected");
      }
      options.classList.add("selected");
    })
  })
  
}

const ansCheck = () =>{
  check.disabled = true;
  if(option.querySelector(".selected")){
    let selectedAns = option.querySelector(".selected").textContent;
    if(selectedAns.trim() == HTMLDecode(correct)){
      correctAns++;
      resultS.innerHTML += `<p class = "right"><b>Correct Answer!</p>`;
      option.querySelector(".selected").style.background = "green";
    }
    else{
      resultS.innerHTML = `<p class = "wrong"><b>Wrong Answer!</p>${correct} is correct answer.`;
      option.querySelector(".selected").style.background = "red";
    }
    countdown();
  }
}
function HTMLDecode(textString){
  let docs = new DOMParser().parseFromString(textString, "text/html");
  return docs.documentElement.textContent;
}

const countdown = () =>{
  askedQ++;
  setcount();
  if(askedQ == totalQ){
    resultS.innerHTML = `<p class = "right"><b>Completed<br> You scored: ${correctAns}/${totalQ}</p>`;
    audio.play();
    check.style.display = "none";
    if(correctAns >= 4){
      resultS.innerHTML += `<p class = "right">Excellent!</p>`;
    }
  }
  else{
    setTimeout(() => {
      loadQuestion();
    },2500)
  }
}
const setcount = () =>{
  score.textContent = correctAns;
  totalScore.textContent = totalQ;
}