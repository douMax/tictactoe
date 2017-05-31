
$(document).ready(function(){

  console.log("you'll never walk alone");

  var gameState = {
    p1:{
      moves: [],
      token: 'x',
      score: 0,
    },
    p2:{
      moves: [],
      token: 'o',
      score: 0,
    }
  };

  var sides = 3;
  var turns = 0;
  var gameOver = false;


  //indicate the default tokens = x/o
  $('#letr').addClass('chosen').addClass('animated bounceIn');

  //choose token
  var tokenChoose = function(t1, t2){
    gameState.p1.token = t1;
    gameState.p2.token = t2;
    console.log('token: ', t1, t2);
  };

  $('#letr').on('click', function(){
    if(turns){
      return;
    }
    tokenChoose('x', 'o');
    $(this).addClass('chosen').addClass('animated bounceIn');
    $('#pic').removeClass('chosen').removeClass('animated bounceIn');
  });

  $('#pic').on('click', function(){
    if(turns){
      return;
    }
    tokenChoose('triangle', 'circle');
    $(this).addClass('chosen').addClass('animated bounceIn');
    $('#letr').removeClass('chosen').removeClass('animated bounceIn');
  });


  // start a newRound or a newGame;
  var newRound = function(){
    gameOver = false;
    turns = 0;
    gameState.p1.moves = []; //clear the moves array
    gameState.p2.moves = [];
    $('.cells').removeClass(gameState.p1.token);     //clear the cells
    $('.cells').removeClass(gameState.p2.token);
    $('.msg').text("let's play. p1 first");
  }

  $('#again').on('click', function(){  // click 'again' to start a new round
    newRound();
    console.log("new round");
  });

  $('#restart').on('click', function(){
    newRound();
    gameState.p1.score = 0;
    gameState.p2.score = 0;
    $('#p1 .num').text(''+ gameState.p1.score);
    $('#p2 .num').text(''+ gameState.p1.score);
    console.log("new game");
  });



  $('.cells').on( 'click', function(){
    console.log(this.id);

    var token1 = gameState.p1.token;
    var token2 = gameState.p2.token;
    var token;
    var player;

    if( $(this).hasClass(token1) || $(this).hasClass(token2) ){
      return;
    }
    if (gameOver){
      return;
    }

    if (turns % 2 === 0) {
      token = token1;
      player= "p1";
      $('.msg').text("p2's turn")
    } else {
      token = token2;
      player = "p2";
      $('.msg').text("p1's turn")
    }

    gameState[player].moves.push(this.id)

    $(this).addClass(token);

    console.log("id:" + this.id + ", " + player + ", " + token );

    turns++;
    console.log("turns: " + turns);

    // check for win
    if( checkForWin(gameState[player].moves) ){
      $('.msg').text(player + ' wins');
      gameOver = true;
      gameState[player].score += 1;
      console.log("game over " + player + ' wins');

    } else if (turns === sides**2 ) {
      $('.msg').text("draw");
      gameOver = true;
      console.log("game over draw");
    }

    $('#p1 .num').text(''+ gameState.p1.score);
    $('#p2 .num').text(''+ gameState.p2.score);

  } ); // end of on click






  var placeTokens = function(idArr, token){
    for (var i = 0; i < idArr.length; i++) {
      var id = idArr[i];
      $('.cells #' + id).addClass(token);
    }
  };




  //basic game logic comes here
  var dia1 = [];
  var dia2 = [];

  var getDiagonal = function(n){
    var arr1 = [];
    var arr2 = [];

    for (var i = 1; i <= n; i++){
      i = String(i);
      arr1.push(i);
      arr2.unshift(i);
    }

    for (var i = 0; i < arr1.length; i++) {
      dia1.push(arr1[i]+arr1[i]);
      dia2.push(arr1[i]+arr2[i]);
    }
  };


  diagonalWin = function(diagonal, currentPlayArr){

    for (var i = 0; i < diagonal.length; i++) {
      if(currentPlayArr.indexOf(diagonal[i]) == -1){
        return false;
      }
    }
    return true;
  },


  otherWin = function(currentPlayArr, index){  // rows and columns
    var newArr = [];

    for (var i = 0; i < currentPlayArr.length; i++) {
      newArr.push(currentPlayArr[i][index]);
    }
    newArr = newArr.sort();

    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i] === newArr[i+1] && newArr[i] === newArr[i+2]){
        return true;
      }
    }

    return false;
  };


  checkForWin = function(currentPlayArr){

    var rowCheck = otherWin(currentPlayArr, 0);
    var colCheck = otherWin(currentPlayArr, 1);

    getDiagonal(sides);

    var diagCheck1 = diagonalWin(dia1, currentPlayArr);
    var diagCheck2 = diagonalWin(dia2, currentPlayArr);

    if (rowCheck || colCheck || diagCheck1 || diagCheck2) {
      return true;
    }

    return false;
  };



}); // end of .ready
