
$(document).ready(function(){

  console.log("you'll never walk alone");

  var $cells = $('.cells'); //select all the cells
  var turns = 0;            // turns start at zero
  var gameOver = false;

  var player1 = 'x';  // set the default tokens to x and o
  var player2 = 'o';

  //buttons to switch token
  var $xo = $('#xo');
  var $pic = $('#pic');

  var $restart = $('#restart');  // button restart
  var $msg = $('.msg');  // message div to display messages

  $xo.on('click', function(){   // button x/o to choose x and o tokens
    if(turns){
      return;
    }
    player1 = 'x';
    player2 = 'o';
    console.log("token chose: " + $pic.text());
  });

  $pic.on('click', function(){  // button pic to choose triangle and circle tokens
    if(turns){
      return;
    }
    player1 = 'triangle';
    player2 = 'circle';
    console.log("token chose: " + $pic.text());
  });

  $restart.on('click', function(){   // button restart to reset the game
    // location.reload();
    gameOver = false;
    turns = 0;
    ttt.players[player1] = [];
    ttt.players[player2] = [];
    $cells.removeClass(player1);
    $cells.removeClass(player2);
    console.log("game restart");
    $msg.html('');
  });


  $cells.on('click', function(){
    console.log(this.id);

    if( $(this).hasClass(player1) || $(this).hasClass(player2) ){
      return;
    }
    if (gameOver){
      return;
    }

    if (turns % 2 === 0) {
      player = player1;
      ttt.moves(player, this.id);
      console.log("id:" + this.id + " player: " + player);
    } else {
      player = player2;
      ttt.moves(player, this.id);
      console.log("id:" + this.id + " player: " + player);
    }

    $(this).addClass(player);

    turns++;
    console.log("turns: " + turns);

    if(ttt.checkForWin(ttt.players[player])){
      console.log("game over " + player + ' wins');
      $msg.html(player + ' wins');
      gameOver = true;
    } else if (turns === (ttt.n)**2 ) {
      console.log("game over draw");
      $msg.html("draw");
      gameOver = true;
    }

  }); // end of on click




  //start an object called ttt, basic game logic comes here
  var ttt = {

    n: 3,  // 3 x 3 game board

    players: {
      x: [],
      o: [],

      triangle: [],
      circle: [],


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
      this.players[player].push(cellID);
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
