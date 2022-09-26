var gamePattern=[];
var buttonColours=["green","red","yellow","blue"];
var userClickedPattern=[];
level=0;
var started=false;

$("body").on("keypress",function(event){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 700);
        }
    }
        else{
            $("body").addClass("game-over");
            playSound("wrong");
            $("#level-title").text("Game over, press any key to restart game:)");

            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            
            startOver();
        }

}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}




function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
}, 100); 
}



function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}