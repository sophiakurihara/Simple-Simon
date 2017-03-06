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
	var random = Math.floor(Math.random() * 4);
}

//appends next button onto simon sequence by using random generator.
function addToSimon () {
	var nextButton = randomSequence();
	console.log(nextButton);
	simonSequence.push(buttons[nextButton]);
}

//updates round upon successful repetition from the user
function updateRound () {
	$("#this_round").text(round);
}


function playSequence() {
	addToSimon();
	var index = 0;
	var max = simonSequence.length;
	var interval = 2000;
	var intervalId = setInterval(function() {
		if (index <= (max-1)) {
			simonSequence[index].animate({
				opacity: "1.0"
			}, 430);
			simonSequence[index].animate({
				opacity: "0.3"
			}, 430);
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
			}, 200);
			whichButton.animate({
				opacity: "0.3"
			}, 200);

			userSequence.push(whichButton);
			var lastUserIndex = userSequence.length-1


		})
	})
}


});