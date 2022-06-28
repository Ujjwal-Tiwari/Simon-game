//alert("hello");
var buttonColours=["red" ,"blue","green","yellow"];
var gamePattern=[];
var userClickedPatterrn=[];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    started=true;
    $("#level-title").text("Level "+level);
    nextSequence();
  }
  else{
    $("#level-title").text("Press Any Key to Start");
  }
});

// next sequence funtion
function nextSequence(){
  userClickedPatterrn=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  console.log(randomNumber);
  var randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  var b="#"+randomChosenColor;
  $(b).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
// clicked button sequence
$(".btn").on("click",function(){
  var userChosenColor=$(this).attr("id");  // this.id will also work
  userClickedPatterrn.push(userChosenColor);
  //console.log(userClickedPatterrn);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPatterrn.length)-1);

});

function playSound(name){
  if(name!=="wrong"){
    var audioloc="sounds/"+name+".mp3";
    var audio=new Audio(audioloc);
    audio.play();

  }
  else{

  }
}
function animatePress(currentColor){
  var b="#"+currentColor;
  $(b).addClass("pressed");
  setTimeout(function () {
    $(b).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

  if(userClickedPatterrn[currentLevel]===gamePattern[currentLevel]){
    //console.log("success");
    if(userClickedPatterrn.length===gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
    else{
      //console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  function startOver(){
    level=0;
    gamePattern=[];
    started=false;
  }
