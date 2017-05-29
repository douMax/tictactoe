// a click to place token function

var ttt = {

  n: 3,  // 3 x 3 game board

  players: {
    X: [],
    O: [],
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
    this.getDiagonal(this.n);
    var rowCheck = this.otherWin(currentPlayArr, 0);
    var colCheck = this.otherWin(currentPlayArr, 1);

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

  otherWin: function(currentPlayArr, index){
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

$(document).ready(function(){

  console.log("you'll never walk alone");

  var $body = $('body');
  var $cells = $('.cells');
  var clicks = 0;
  var gameOver = false;

  $cells.on('click', function(){
    if($(this).html() !== ''){
      console.log(this.id);
      return;
    }

    if (gameOver){
      return;
    }

    var yanse;
    var value;

    if (clicks % 2 === 0) {
      value = "X";
      yanse = "hotpink";
      ttt.moves(value, this.id);
      console.log("X: " + this.id);
    } else {
      value = "O";
      yanse = "White";
      ttt.moves(value, this.id);
      console.log("O: " + this.id);
    }

    $(this).html(value);
    $(this).css({
      fontSize: "48px",
      color: yanse
    });

    if(ttt.checkForWin(ttt.players[value])){
      console.log(value + ' wins');
      gameOver = true;
    }

    clicks++;
    console.log(clicks);

  }); // end of on click


  




}); // end of .ready
