
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});


//Game

//Variables

	var randomNumber;
	var guess;
	var guessCounter;
	var feedback;


//Functions

	function newGame() {
		generateRandom();
		guessCounter = 0;
		clearGuess();
		clearInput();
		printFeedback("Make your Guess!");
		$("input").prop("disabled",false);
	}

	function generateRandom() {
		randomNumber = Math.floor((Math.random() * 100) + 1);
		console.log("The Random Number is: " +randomNumber);
	}

	function userInput() {
		guess = $("#userGuess").val();
		guess = parseInt(guess);
	}

	function clearGuess() {
		$("ul#guessList").children().remove();
		$("#count").text(0);
	}

	function clearInput() {
		$("#userGuess").val('');
	}

	function printFeedback(message) {
		$('#feedback').html(message);
	}

	function disableInput() {
		$("input").prop("disabled", true);
	}

	function evaluateGuess() {

		var difference = Math.abs(guess - randomNumber);

		if ( guess === randomNumber ) {

			if ( guessCounter === 1 ) {

				printFeedback("You're right!<br> It only took you " + guessCounter + " guess.");
				disableInput();
			} 

			else { printFeedback("You're right!<br> It took you " + guessCounter + " guesses.");
			disableInput();
			}
		}

		//Need to assess the absolute difference between the first guess and the random number, and then provide a scale of being hot or cold.
	

		else if  ( difference < 5 ) {
			printFeedback("You're very hot");
		}
		else if  ( difference < 10 ) {
			printFeedback("You're hot");
		}
		else if  ( difference < 15 ) {
			printFeedback("You're warm");
		}
		else if  ( difference < 25 ) {
			printFeedback("You're lukewarm");
		}
		else if  ( difference < 30 ) {
			printFeedback("You're cold");
		}
		else if  ( difference < 40) {
			printFeedback("You're freezing");
		}
		else if  ( difference < 100) {
			printFeedback("I hope you're dressed warm. You're in Antarctica.");
		}

	}


//Clicking new game starts new game

	$(".new").on('click', function() {
		newGame();
	});

//Submit form

	$("form").submit(function(event){
		//prevent page refreshing after submit
		event.preventDefault();

		userInput();


		//Will move this evaluating code into its own function
		if ( isNaN(guess) ) {
			alert("Please input a number between 1 - 100");
		}

		else if ( guess < 1 ) {
			alert("We don't accept numbers lower than 1. Please input a number between 1 - 100.");
		}
		else if ( guess > 100 ) {
			alert("We don't accept numbers higher than 100. Please input a number between 1 - 100.");
		}
		else { 		
			var printGuess = $("ul#guessList").append("<li>" + guess +"</li>");
			guessCounter += 1;
			var printGuessCounter = $("#count").text(guessCounter);
			
			evaluateGuess(); 
			console.log("The guess is: " + guess);
		}

		clearInput();
	
	});



//Run functions

	newGame();


//End of doc ready
});


/* Printing relative feedback for next version. Will need to provide absolute feedback on first guess. All current guesses would compare the difference between prevGuess and randomNumber which I'd store as as prevDifference vs. the difference between currentGuess and randomNumber which I'd store as currentDifference. If currentDifference is higher than prevDifference then print message that the user is getting colder. If currentDifference is lower than prevDifference then print message that user is getting hotter.
*/
