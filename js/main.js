
$(document).ready(function(){



  console.log("you'll never walk alone");
  //jquery elements
  var $cells = $('.cells'); //select all the cells
  var $letr = $('#letr').addClass('chosen').addClass('animated bounceIn'); //buttons to switch token
  var $pic = $('#pic');
  var $again = $('#again');
  var $restart = $('#restart');  // button restart
  var $msg = $('.msg');  // message div to display messages
  var $scoreP1 = $('#p1 .num');
  var $scoreP2 = $('#p2 .num');

  var scores = {
    p1: 0,
    p2: 0,
  }

  var turns = 0;            // turns start at zero
  var gameOver = false;

  var player ='';
  var token = '';
  var token1 = 'x';
  var token2 = 'o';

  //storage
  // if(!localStorage){
  //   alert("Sorry, your browser do not support local storage.");
  // }

  // var saveRecords = function(){
  //   sessionStorage.setItem('scoreP1', '' + scores.p1);
  //   sessionStorage.setItem('scoreP2', '' + scores.p2);
  //   sessionStorage.setItem('token1', token1);
  //   sessionStorage.setItem('token2', token2);
  //   var movesP1 = ttt.players.p1.moves.join(',');
  //   var movesP2 = ttt.players.p2.moves.join(',');
  //   sessionStorage.setItem('movesP1', movesP1);
  //   sessionStorage.setItem('movesP2', movesP2);
  // };
  //
  // var getRecords = function(){
  //   token1 = sessionStorage.getItem('token1');
  //   token2 = sessionStorage.getItem('token2');
  //   scores.p1 = parseInt(sessionStorage.getItem('scoreP1'));
  //   scores.p2 = parseInt(sessionStorage.getItem('scoreP2'));
  //   var movesP1 = sessionStorage.getItem('movesP1');
  //   var movesP2 = sessionStorage.getItem('movesP2');
  //   movesP1 = movesP1.split(',')
  //   movesP2 = movesP2.split(',')
  //   ttt.players.p1.moves = movesP1;
  //   ttt.players.p2.moves = movesP2;
  //   placeTokens(movesP1, token1);
  //   placeTokens(movesP2, token2);
  //   turns = movesP1.length + movesP2.length;
  //   $scoreP1.text('' + scores.p1);
  //   $scoreP2.text('' + scores.p2);
  // };

  var placeTokens = function(idArr, token){
    for (var i = 0; i < idArr.length; i++) {
      var id = idArr[i];
      $('.cells #' + id).addClass(token);
    }
  };

  //token choose
  var tokenChoose = function(t1, t2){
    token1 = t1;
    token2 = t2;
    console.log('token: ', t1, t2);
  };

  $letr.on('click', function(){
    if(turns){
      return;
    }
    tokenChoose('x', 'o');
    $(this).addClass('chosen').addClass('animated bounceIn');
    $pic.removeClass('chosen').removeClass('animated bounceIn');
  });

  $pic.on('click', function(){
    if(turns){
      return;
    }
    tokenChoose('triangle', 'circle');
    $(this).addClass('chosen').addClass('animated bounceIn');
    $letr.removeClass('chosen').removeClass('animated bounceIn');
  });


  var newRound = function(){
    gameOver = false;
    turns = 0;
    ttt.players.p1.moves = []; //clear the moves array
    ttt.players.p2.moves = [];
    $cells.removeClass(token1);     //clear the cells
    $cells.removeClass(token2);
    $msg.text("Let's play. p1 first");
  }


  // button again to reset the game but not reset the scores
  $again.on('click', function(){
    newRound();
    console.log("new round");
  });

  $restart.on('click', function(){
    newRound();
    tokenChoose('x', 'o');
    $letr.addClass('chosen');
    $pic.removeClass('chosen');
    scores.p1 = 0;
    scores.p2 = 0;
    $scoreP1.text(''+ scores.p1);
    $scoreP2.text(''+ scores.p2);
    console.log("new game");
  });


  //token choose function



  // click in one square start the game
  $cells.on('click', function(){
    console.log(this.id);

    if( $(this).hasClass(token1) || $(this).hasClass(token2) ){
      return;
    }
    if (gameOver){
      return;
    }

    if (turns % 2 === 0) {
      token = token1;
      player = "p1";
      $msg.text("p2's turn")
    } else {
      token = token2;
      player = "p2";
      $msg.text("p1's turn")
    }

    ttt.players[player].moves.push(this.id)

    $(this).addClass(token).addClass('animated bounceIn');

    console.log("id:" + this.id + ", " + player + ", " + token );

    turns++;
    console.log("turns: " + turns);

    // check for win
    if(ttt.checkForWin(ttt.players[player].moves)){
      $msg.text(player + ' wins');
      gameOver = true;
      scores[player] += 1;
      console.log("game over " + player + ' wins');

    } else if (turns === (ttt.n)**2 ) {
      $msg.text("draw");
      gameOver = true;
      console.log("game over draw");

    }

    $scoreP1.text(''+ scores.p1);
    $scoreP2.text(''+ scores.p2);

    if(gameOver === false){
      saveRecords();
    }


  }); // end of on click




  //start an object called ttt, basic game logic comes here
  var ttt = {

    n: 3,  // 3 x 3 game board

    players: {
      p1: {
        token: 'x',
        moves: [],
        scores: 0
      },
      p2: {
        token: 'o',
        moves: [],
        scores: 0
      },
    },

    diagonals: {
      dia1: [],
      dia2: [],
    },

    getDiagonal:function(n){
      var arr1 = [];
      var arr2 = [];

      for (var i = 1; i <= n; i++){
        i = String(i);
        arr1.push(i);
        arr2.unshift(i);
      }

      for (var i = 0; i < arr1.length; i++) {
        this.diagonals.dia1.push(arr1[i]+arr1[i]);
        this.diagonals.dia2.push(arr1[i]+arr2[i]);
      }
    },

    moves: function(player, cellID){
      this.players[player].moves.push(cellID);
    },

    checkForWin: function(currentPlayArr){
      var rowCheck = this.otherWin(currentPlayArr, 0);
      var colCheck = this.otherWin(currentPlayArr, 1);

      this.getDiagonal(this.n);
      var diagCheck1 = this.diagonalWin(this.diagonals.dia1, currentPlayArr);
      var diagCheck2 = this.diagonalWin(this.diagonals.dia2, currentPlayArr);

      if (rowCheck || colCheck || diagCheck1 || diagCheck2) {
        return true;
      }

      return false;
    },


    diagonalWin: function(diagonal, currentPlayArr){
      for (var i = 0; i < diagonal.length; i++) {
        if(currentPlayArr.indexOf(diagonal[i]) == -1){
          return false;
        }
      }
      return true;
    },

    otherWin: function(currentPlayArr, index){  // rows and columns
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
    },

  };  // end of object




}); // end of .ready
