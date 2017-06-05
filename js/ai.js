
var player;   // current player
var token;    // current token in use
var nexturnMsg; // who's next turn
var message;  // global variable, store the message


var whichPlayer = function(){
  if(tunrs % 2 === 0 ){
    player = 'p1';
    token = gameState[player].token;
    nexturnMsg = "p2's turn"
  } else {
    player = 'p2';
    token = gameState[player].token;
    nexturnMsg = "p1's turn"
  }
};




//when the opponent is about to win, block it
//core moves - when opponent first move in the centre, take the corner
//core moves - when opponent first take corner, place in the centre


var currentGame = function(token){  // argument token, a string
  var a1 = $('#11').hasClass(token);
  var a2 = $('#12').hasClass(token);
  var a3 = $('#13').hasClass(token);
  var b1 = $('#21').hasClass(token);
  var b2 = $('#22').hasClass(token);
  var b3 = $('#23').hasClass(token);
  var c1 = $('#31').hasClass(token);
  var c2 = $('#32').hasClass(token);
  var c3 = $('#33').hasClass(token);
  return [a1,a2,a3,b1,b2,b3,c1,c2,c3];
};


var $cells = $('.cells');
