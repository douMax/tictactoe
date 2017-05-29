$(document).ready(function(){

  console.log("you'll never walk alone");
  var $body = $('body');
  var $cells = $('.cells');
  var toggle = true;  // switch players, switch for tokens

  var playerX = [];
  var playerO = [];



  // click to place tokens
  var startGame = function(){

    $cells.on('click', function(){
      var yanse;
      var toValue;
      var playCell = this.id;

      if (toggle) {
        toVale = "X";
        yanse = "hotpink";
        playerX.push(this.id);
        console.log("X: " + this.id);
      } else {
        toVale = "O";
        yanse = "White";
        playerO.push(this.id);
        console.log("O: " + this.id);
      }

      // for now change the html value to X/O, later place a token, a div with background image
      $(this).html(toVale);
      $(this).css({
        fontSize: "48px",
        color: yanse
      });

      toggle = !toggle;

      if( checkForWin(playerX) ){
        console.log( "X wins" );
        return;
      }

      if( checkForWin(playerO) ){
        console.log( "O wins" );
        return;
      }

    }); // end fo click

  };


  //check for win

  var checkForWin = function(arr){

    var row = [];
    var col = [];

    for (var i = 0; i < arr.length; i++) {
      row.push(arr[i][0]);
      col.push(arr[i][1]);
    }

    row = row.sort();
    col = col.sort();

    var rowCheck = false;
    for (var i = 0; i < row.length; i++) {
      if (row[i] === row[i+1] && row[i] === row[i+2]){
        rowCheck = true;
      }
    }

    var colCheck = false
    for (var i = 0; i < col.length; i++) {
      if (col[i] === col[i+1] && col[i] === col[i+2]){
        colCheck = true;
      }
    }

    var diagonal = checkDiagonal(arr, 3);


    if( rowCheck || colCheck || diagonal ){
      return true;
    } else {
      return false;
    }

  }; // end fo checkForWin function

  //checkForDiagonal
  var dia1 = [];
  var dia2 = [];

  var checkDiagonal =  function(arr, n){
    getDiagonal(n);
    var check1 = checkArray(dia1, arr);
    var check2 = checkArray(dia2, arr);
    if(check1 || check2){
      return true;
    }
    return false;
  }

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

  var checkArray = function(arr1, arr2){

    for (var i = 0; i < arr1.length; i++) {
      if(arr2.indexOf(arr1[i]) == -1){
        return false;
      }
    }
    return true;
  };





}); // end of .ready
