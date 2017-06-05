
$(document).ready(function(){

  console.log("you'll never walk alone");

  // debugger;
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


  //===================== save game and load game ==================================

  var placeTokens = function(player){
    var idArr = gameState[player].moves;
    for (var i = 0; i < idArr.length; i++) {
      var id = idArr[i];
      $('#' + id).addClass(gameState[player].token);
    }
    return idArr.length;
  };

  if(sessionStorage.length){
    gameState = JSON.parse(sessionStorage.gameState);
    // debugger;
    var length1 = placeTokens('p1');
    var length2 = placeTokens('p2');

    if(gameState.p1.tokens !== 'x'){
      $('#letr').removeClass('chosen');
      $('#pic').addClass('chosen').addClass('animated bounceIn')
    }

    $('#p1 .num').text(''+ gameState.p1.score);
    $('#p2 .num').text(''+ gameState.p2.score);

    turns = length1 + length2;

    if (turns % 2 === 0){
      $('.msg').text("game continued. p1's turn")
    } else {
      $('.msg').text("game continued. p2's turn")
    }

    if(turns === 0) {
      $('.msg').text("let's play. p1 first")
    }


  }

  // check if session storage is supoorted
  var save = true;
  if(sessionStorage === undefined){
    save = false;
  }

  //====================== token choose, reset button ==============================

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
    $('#p1 .symbol').addClass('p1x').removeClass('sun');
    $('#p2 .symbol').addClass('p2o').removeClass('moon');

    if(save){
      sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }

  });

  $('#pic').on('click', function(){
    if(turns){
      return;
    }
    tokenChoose('sun', 'moon');
    $(this).addClass('chosen').addClass('animated bounceIn');
    $('#letr').removeClass('chosen').removeClass('animated bounceIn');
    $('#p1 .symbol').addClass('sun').removeClass('p1x');
    $('#p2 .symbol').addClass('moon').removeClass('p2o');

    if(save){
      sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }

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

    if(save){
      sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }

    console.log("new round");
  });

  $('#restart').on('click', function(){
    newRound();
    gameState.p1.score = 0;
    gameState.p2.score = 0;
    $('#p1 .num').text(''+ gameState.p1.score);
    $('#p2 .num').text(''+ gameState.p1.score);

    if(save){
      sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }

    console.log("new game");
  });

  //=============================== click to play the game ========================


  $('.cells').hover(function(){
    if( $(this).hasClass(gameState.p1.token) || $(this).hasClass(gameState.p2.token) ){
      return;
    }
    $(this).addClass('mouseOnCell');
  }, function(){
    $(this).removeClass('mouseOnCell');
  });



  $('.cells').on( 'click', function(){
    console.log(this.id);
    var token1 = gameState.p1.token;
    var token2 = gameState.p2.token;

    var token;
    var player;

    $(this).removeClass('mouseOnCell');  // click to place a token and remove the overshade

    if( $(this).hasClass(token1) || $(this).hasClass(token2) ){  // if click the same square
      var $msg = $('.msg').text();
      $('.msg').text('choose another square').addClass('animated shake');
      window.setTimeout(function(){
        $('.msg').text($msg).removeClass('animated shake');
      }, 1500);
      return;
    }

    if (gameOver){
      return;
    }

    if (turns % 2 === 0) {
      token = token1;
      player = "p1";
      $('.msg').text("p2's turn");
      $('#p2').addClass('chosen animated bounceIn');
      $('#p1').removeClass('chosen animated bounceIn');
    } else {
      token = token2;
      player = "p2";
      $('.msg').text("p1's turn");
      $('#p1').addClass('chosen animated bounceIn');
      $('#p2').removeClass('chosen animated bounceIn');
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

    if(save){
      sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }

  } ); // end of on click


  //============================= check for win ====================================

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


  // ============================== AI comes here ================================





}); // end of .ready
