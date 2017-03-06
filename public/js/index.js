
"use strict";
$(document).ready(function() {
// creates empty arrays for Simon generated sequence, and user input.
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
		console.log("sound should play");
	});

	blue.click(function () {
		$("#soundbuttonBlu").get(0).play();
		console.log("sound should play");
	});

	green.click(function () {
		$("#soundbuttonGre").get(0).play();
		console.log("sound should play");
	});

	yellow.click(function() {
		$("#soundbuttonYel").get(0).play();
		console.log("sound should play");
	});

	}	

//generates random sequence for the buttons
function randomSequence () {
	return Math.floor(Math.random() * 4);
}

//appends next button onto simon sequence by using random generator.
function addToSimon () {
	var nextButton = randomSequence();
	simonSequence.push(buttons[nextButton]);
	console.log(simonSequence);
}

//updates round upon successful repetition from the user
function updateRound () {
	$("#this_round").text(round);
}

//displays the random sequence generated for this round
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
	//when playSequence is done, checks for userInput
	userInput();
}

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


			userSequence.push(whichButton);
			var lastUserIndex = userSequence.length-1

			if (userSequence[lastUserIndex] != simonSequence[lastUserIndex]) {
				$("#start_text").html("<h2>Better luck next time!</h2>");
				userSequence = [];
				simonSequence = [];
				round = 0;
				updateRound();
				setTimeout("location.reload(true);", 2000);

			} else if (userSequence.length == simonSequence.length) {
				$("#start_text").html("<h2>New Round:</h2>");
				round++;
				updateRound();
				userSequence = [];

				buttons.forEach(function (whichButton, index, array) {
					whichButton.off("click");
				});
			playSequence();
			} else {
				$("#start_text").html("<h2>Looking good!</h2>");
			}

		});
	});
}

	console.log("start game");

$("#restart_game").click(function () {
	userSequence = [];
	simonSequence = [];
	round = 0;
	updateRound();
	setTimeout("location.reload(true);", 500);
});

$("#begin_game").click(function() {
	userSequence = [];
	simonSequence = [];
	round = 0;
	updateRound();
	playSequence();


	$("#start_text").html("<h2>Good luck!</h2>");
});

});

