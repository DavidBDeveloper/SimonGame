var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Starting the game pressing any key
$(document).on("keydown", function(){
  if (started === false){
    started = true;
    nextSequence();
  }
});

// next sequence function.
function nextSequence(){
  //Changing the h1 text according to the level.
  level++;
  $("#level-title").text("level " + level);
  //Restarting the user clicked pattern array.
  userClickedPattern = [];
  //Creating a random number.
  var randomNumber = Math.floor(Math.random() * 4);
  // Selecting random color and pushing it into gamePattern.
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //Animation and sound random chose.
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//handler function
$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //Animation and sound User click.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Checking answer data.
  var lastAnswerIndex = userClickedPattern.length - 1;
  checkAnswer(lastAnswerIndex);
});

//checking answer
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    //wrong sounds and style
    var wrongSound = new Audio ("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Eresh un petosh, Vas report. Oprima cualquier tecla para seguir siendo un peto");
    //restart the game
    startOver();
  }
}

//restart the game.
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

// Sounds function.
function playSound(name){
  var sound = new Audio ("sounds/" + name + ".mp3");
  sound.play();
}

//Animate press function.
function animatePress(currentColour){
  var colourSelected = $("." + currentColour);
  colourSelected.addClass("pressed");
  setTimeout(function(){
    colourSelected.removeClass("pressed");
  }, 100);
}
