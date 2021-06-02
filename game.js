var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 1;

var started = false;

function nextSequence() {
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);    
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



$(document).on("keydown", function () {
  if (!started) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
    started = true;
  }
});

function checkAnswer(currentLevel) {
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  console.log("Success");
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
    nextSequence();
  }, 1000);
} 
} else {
  console.log("Wrong")
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key To Restart");
  startOver();
}
}

function startOver() {
  level = 1;
  started = false;
  gamePattern = [];
}