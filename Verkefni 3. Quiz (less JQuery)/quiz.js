"use strict";
(function() {
	function questions(question, choices, correctAnswer) {
		this.question = question;
		this.choices = choices;
		this.correctAnswer = correctAnswer;
	}

	var Quiz = [];
	Quiz.push(new questions("qestion 1.", ["True","False"], 0));
	Quiz.push(new questions("qestion 2.", ["True","False"], 1));
	Quiz.push(new questions("qestion 3.", ["True","False"], 1));
	Quiz.push(new questions("qestion 4.", ["True","False"], 0));
	Quiz.push(new questions("qestion 5.", ["True","False","Maybe","IDK"], 0));
	Quiz.push(new questions("qestion 6.", ["True","False", "True or False", "True and False", "Who knows?"], 0));

	var container = document.getElementById('container');
	var quizContainer = document.getElementById('quiz');
	var proLabel = document.getElementById('label');
	var proBar = document.getElementById('myBar');
	var questionCounter = 0; //Tracks question number
	var selections = []; //Array containing user choices
	//var quiz = $('#quiz'); //Quiz div object

/*--------------------------- Shuffle ---------------------------*/
	function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}

	return array;
}

	/*-------------------------- Creater ---------------------------*/
	function createQuestionElement(index) {
	var qElement = document.createElement('div');
	qElement.id = 'question';
	
	//var header = $('<h2>Question ' + (index + 1) + ':</h2>');
	var header = document.createElement('h2');
	header.innerHTML = 'Question ' + (index + 1) + ':';
	qElement.appendChild(header);
	
	//var question = $('<p>').appendChild(Quiz[index].question);
	var question = document.createElement('p');
	question.innerHTML = Quiz[index].question;
	qElement.appendChild(question);
	
	var radioButtons = createRadios(index);
	qElement.appendChild(radioButtons);
	
	quizContainer.appendChild(qElement);
	}
	
	// Creates a list of the answer choices as radio inputs
	function createRadios(index) {
	var radioList = document.createElement("ul"); //make the <ul>
	var item; //marks the items
	var input = '';
	for (var i = 0; i < Quiz[index].choices.length; i++) {
		item = document.createElement("li");
		input = '<input type="radio" name="answer" value=' + i + ' />';
		input += Quiz[index].choices[i]; //choice
		item.innerHTML = input;
		radioList.appendChild(item);
	}
	return radioList;
	}
	
	// Reads the user selection and pushes the value to an array
	function choose() {
	selections[questionCounter] = +$('input[name="answer"]:checked').val();
	}
	
	// Displays next requested element
	function displayNext() {
		quizContainer.innerHTML = '';
		//$('#question').remove();
		
		if(questionCounter < Quiz.length){
			//var nextQuestion = createQuestionElement(questionCounter);
			//quizContainer.appendChild(nextQuestion);
			createQuestionElement(questionCounter);

			if (!(isNaN(selections[questionCounter]))) {
				//$('input[value='+selections[questionCounter]+']').prop('checked', true);
			}
			
			if(questionCounter >= 0){
				var next = document.createElement('div');
				next.className = 'button';
				next.id = 'next';
				next.innerHTML = 'Next';

				next.onclick = function() {
					choose();

					if (isNaN(selections[questionCounter])) {
						alert('Please make a selection!');
					} else {
						questionCounter++;
						displayNext();
					}

					moveProgress();
				};

				quizContainer.appendChild(next);
				//$('#next').show();
			}
		} else {
			var scoreElem = displayScore();
			quizContainer.appendChild(scoreElem);

			var start = document.createElement('div');
			start.className = 'button';
			start.id = 'start';	
			start.innerHTML = 'Start Over';

			start.onclick = function(e) {
				e.preventDefault();

				proBar.style.width = 0;
				proLabel.innerHTML = '0%';

				questionCounter = 0;
				selections = [];
				displayNext();
			};

			quizContainer.appendChild(start);
		}
	}
	
	// Computes score and returns a paragraph element to be displayed
	function displayScore() {
	var score = document.createElement('p');
	score.id = 'question';
	
	var numCorrect = 0;
	for (var i = 0; i < selections.length; i++) {
		if (selections[i] === Quiz[i].correctAnswer) {
		numCorrect++;
		}
	}
	
	score.innerHTML = 'You got ' + numCorrect + ' questions out of ' +
				 Quiz.length + ' right!!!';

	return score;
	}

	/*---------------------- Buttons -----------------------*/
	// Click handler for the 'Start Over' button
	/*var start = document.getElementById('start');
	start.click(function (e) {
		e.preventDefault();

		questionCounter = 0;
		selections = [];
		displayNext();
		start.style.visibility = 'hidden';
	});*/

	// Click handler for the 'next' button
	//var next = document.getElementById('next');

	/*$('#next').on('click', function (e) {
	e.preventDefault();
	
	choose();
	
	// If no user selection, progress is stopped
	if (isNaN(selections[questionCounter])) {
		alert('Please make a selection!');
	} else {
		questionCounter++;
		displayNext();
	}
	});*/

	function moveProgress() {
		var pro = questionCounter / Quiz.length * 100;

		proBar.style.width = pro + '%';
		proLabel.innerHTML = pro.toString().substr(0, 4) + '%';
	}

	Quiz = shuffle(Quiz);

	// Display initial question
	displayNext();
})();
	
