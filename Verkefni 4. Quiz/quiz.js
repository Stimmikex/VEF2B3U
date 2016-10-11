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

/*var myStart = {
	startkey: $('#start').hide();
	Counterkey: var questionCounter = 0;
	selectionsArray: var selections = [];
	quizdivkey: var quiz = $('#quiz');
};*/
  $('#start').hide();

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  

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
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(Quiz[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>'); //make the <ul>
    var item; //marks the items
    var input = '';
    for (var i = 0; i < Quiz[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += Quiz[index].choices[i]; //choice
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
      $('#question').remove();
      
      if(questionCounter < Quiz.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter >= 0){ //checks if this is the first question
          
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#start').show();
      }
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === Quiz[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 Quiz.length + ' right!!!');
    return score;
  }

  /*---------------------- Buttons -----------------------*/
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  Quiz = shuffle(Quiz);

  // Display initial question
  displayNext();
})();
	
