var colorArr = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern = [];
var randomChosenColor;
var level = 0;

begin();

function begin()
{
    $(document).one("keydown", function(){
        $("#level-title").text("Level " + level);
    
        nextSequence();
    });
}

function nextSequence()
{
    userClickedPattern = [];
    var randomNo = Math.floor(Math.random()*4); 
    randomChosenColor = colorArr[randomNo];

    gamePattern.push(randomChosenColor);
    

    $("#" + randomChosenColor).fadeToggle("fast").fadeToggle("fast");

    playSound(randomChosenColor);

    level++;

    $("#level-title").text("Level " + level);

}

 
 $(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    
    
    playSound(userChosenColour);

    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer
    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name)
{
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(curentLevel)
{
    if(userClickedPattern[curentLevel] == gamePattern[curentLevel])
    {
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    }
    else
    {
        //If the pattern is completed but the entered value is wrong then play wrong sound
        playSound("wrong");

        // a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

//Create a new function called startOver().
function startOver()
{
    // reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    begin();
}








