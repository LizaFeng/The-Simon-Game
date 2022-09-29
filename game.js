
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var randomChosenColour;
var level = 0;

if(level===0){
  $("h1").text("Press 'a' to Start")

}

function animatePress(currentColour){
  $(currentColour).addClass("pressed");

  //Timer to remove the .pressed for button to go back to normal colour
  setTimeout(function(){
    $(currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
    console.log("correct");
  }
  else if (gamePattern[currentLevel]!==userClickedPattern[currentLevel]){
    var wrong_audio=new Audio("sounds/wrong.mp3");
    wrong_audio.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)
    
    $("h1").text("Game Over, Press 'r' to Restart");

    //event listener if the user gets a key wrong
    $(document).on("keydown", function(event){
      if(event.key==="r"){
        startOver();
      }
    })
  }
}

function nextSequence(){
  userClickedPattern=[];
  
  //updating the level
  level=level+1;
  $("h1").text("Level "+level);

  //Generating a sequence of sound patterns for user to follow
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  //Animation for pressed button
  $("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //playing the sound
  playSound(randomChosenColour);


}

function playSound(name){
  //plays next sequence
  var audio_= new Audio('sounds/'+name+'.mp3');
  audio_.play();
}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  $("h1").text("Press 'a' to Start")
}

$(".btn").on("click", function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress("."+userChosenColour);

  checkAnswer(userClickedPattern.length-1);

})

$(document).on('keydown',function(event){
  //console.log(event.key);
  if(event.key==="a" && level===0){
    $("h1").text("Level 0");
    nextSequence();
  }
})



