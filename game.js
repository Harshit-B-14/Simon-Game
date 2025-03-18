let buttonColours = ["red" , "blue" , "green" , "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let i = 0;
function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);     // generate random number

    let randomChosenColour = buttonColours[randomNumber]; // select random colour
    
    playSound(randomChosenColour);                        // plays the sound of the colour
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);   // flashes the button
    
    gamePattern.push(randomChosenColour);                 // adds the random choosen colour to the sequence

    level++;

    userClickedPattern = [];

    i=0;       // this is the counter

    $("h1").text("Level " + level);
}


$("button").click((event)=>{
    let userChosenColour = event.target.id;
    let idClr = "#" + event.target.id;
    $(idClr).fadeOut(100).fadeIn(100);

    playSound(userChosenColour);
    
    userClickedPattern.push(userChosenColour);
    console.log(gamePattern);
    console.log(userClickedPattern);
    
    check(userChosenColour);
});

function check(colour){
    if (gamePattern[i] == colour){
        i++;
        if(i==gamePattern.length){
            setTimeout(nextSequence,500);
        }                                // might give semantic error
    }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press any key to restart");
        level = 0;
        gamePattern = [];
        redFlash();
        return;
    }        
}

function playSound(name){
    var Sound = new Audio('sounds/'+name+'.mp3');
    Sound.play();
}

$(document).keydown(function(){
    if (level==0){
        nextSequence();
    }
})

function redFlash(){
    $("body").addClass("wrong");
    setTimeout(remover,100);
}

function remover(){
    $("body").removeClass("wrong");
}