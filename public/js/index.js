$(document).ready(function () {
"use strict";
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

//plays the current random sequence generated for this round
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
			index++;
		}
	}, interval);
	userInput();
}

function userInput() {
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
				$("#start_text").text("Better luck next time!");
				userSequence = [];
				simonSequence = [];
				round = 0;
				updateRound();
				setTimeout("location.reload(true);", 2000);

			} else if (userSequence.length == simonSequence.length) {
				$("#start_text").text("Next Round:");
				round++;
				updateRound();
				userSequence = [];

				buttons.forEach(function (whichButton, index, array) {
					whichButton.off("click");
				});
			playSequence();
			} else {
				$("#start_text").text("Looking good so far!");
			}

		});
	});
}

	console.log("start game");
$("#begin_game").click(function() {
	userSequence = [];
	simonSequence = [];
	round = 0;
	updateRound();
	playSequence();

	$("#start_text").text("Good luck!")
});


})();