
"use strict";
$(document).ready(function() {

    /* creates empty arrays for Simon generated sequence, and user input.
    these arrays will be appended to throughout the game*/
    var simonSequence = [];
    var userSequence = [];

    // begins game at round 0;
    var round = 0;

    // assign variable names to IDs to simplify syntax
    var red = $("#box_red");
    var blue = $("#box_blue");
    var green = $("#box_green");
    var yellow = $("#box_yellow");

    //creates an array called 'buttons' containing all 4 button colors
    var buttons = [red, blue, green, yellow];

    //this function assigns audio files to each button, 
    // and will be played whenever the button is pressed.
    function buttonSounds () {

        red.click(function () {
            $("#soundbuttonRed").get(0).play();
        });

        blue.click(function () {
            $("#soundbuttonBlu").get(0).play();
        });

        green.click(function () {
            $("#soundbuttonGre").get(0).play();
        });

        yellow.click(function() {
            $("#soundbuttonYel").get(0).play();
        }); 

        }   

    //generates random order of buttons for the simonSequence
    function randomSequence () {
        return Math.floor(Math.random() * 4);
    }

    //appends next random button onto simonSequence by using random generator.
    function addToSimon () {
        var nextButton = randomSequence();
        simonSequence.push(buttons[nextButton]);
        console.log(simonSequence);
    }

    //updates round # upon successful repetition/input from the user
    function updateRound () {
        $("#this_round").text(round);
    }

    /*displays the random sequence generated for this round
    by lighting up the buttons on the game board*/
    function playSequence() {
        addToSimon();
        var index = 0;
        var max = simonSequence.length;
        var interval = 1500;
        var intervalId = setInterval(function() {
            var button = simonSequence[index];
            if (index < (max)) {
                simonSequence[index].animate({
                    opacity: "1.0"
                }, 300, function(){
                    button.animate({
                    opacity: "0.3"
                }, 300);
                });
                // appends onto the previous random sequence.
                index++;
            }
        }, interval);
    //when playSequence is done, checks userInput for equality
        userInput();
    }

    /* this function dictates what happens when the user presses the buttons and checks
    for equality between the userSequence and simonSequence*/
    function userInput() {
        buttonSounds();
        buttons.forEach(function (whichButton, index, array) {
            whichButton.click(function () {
                whichButton.animate({
                    opacity: "1.0"
                }, 250);
                whichButton.animate({
                    opacity: "0.3"
                }, 250);
                /*whichButton is just a random variable assigned to access the buttons.this function
                changes button opacity when it is clicked by the user*/

                userSequence.push(whichButton);
                //this appends together buttons clicked by the user to create a sequence to be checked
                
                var lastUserIndex = userSequence.length-1
                
                //if the userSequence input is not the same is the simonSequence
                if (userSequence[lastUserIndex] != simonSequence[lastUserIndex]) {
                    $("#start_text").html("<h2>Better luck next time!</h2>");
                    $("#soundbuttonWrong").get(0).play();
                    userSequence = [];
                    simonSequence = [];
                    round = 0;
                    updateRound();
                    setTimeout("location.reload(true);", 2000);

                //if the userSequence matches simonSequence 
                } else if (userSequence.length == simonSequence.length) {
                    $("#start_text").html("<h2>New Round:</h2>");
                    round++;
                    updateRound();
                    userSequence = [];

                    buttons.forEach(function (whichButton, index, array) {
                        whichButton.off("click");
                    });
                //plays a new sequence for the next round 
                playSequence();
                } else {
                    // gives user this message as long as their sequence is on the right track
                    $("#start_text").html("<h2>Looking good!</h2>");
                }

            });
        });
    }
    //refreshes the page when the restart button is clicked
    $("#restart_game").click(function () {
        userSequence = [];
        simonSequence = [];
        round = 0;
        updateRound();
        setTimeout("location.reload(true);", 500);
    });
    //initializes the game board when the begin button is clicked
    $("#begin_game").click(function() {
        $("#simon_says").animate({
            left: "100px"
        },500).animate({
            right: "100px"
        },500);
        
        userSequence = [];
        simonSequence = [];
        round = 0;
        updateRound();
        playSequence();

        //gives the user a good luck message once the game begins!
        $("#start_text").html("<h2>Good luck!</h2>");
    });

});

