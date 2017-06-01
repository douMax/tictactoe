
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
    tokenChoose('sun', 'moon');
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


  // ===================== AI comes here ========================

  var modeAI = false;

  var compMoves;
  var boardCheck;

  var a1;
  var a2;
  var a3;
  var b1;
  var b2;
  var b3;
  var c1;
  var c2;
  var c3;

  var arrayId = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];



  var compMove1 = function() {
    boardCheck("x");
    debugger;
    if (!b2) {
      $("#22").addClass("o");
      turns++;
    } else {
      $("#13").addClass("o");
      turns++;
    }
  }; // 1st computer move

  var compMove2 = function() {
    boardCheck("x");
    if ((a1&&c3) || (a3&&c1)) {
      $("#23").addClass("o"); // 2 x on diagonal direction, o on the edge;
      turns++;
    } else if ((a2&&c2) || (b1&&b3) || (a2&&c1) || (b1&&a3)) {
      $("#11").addClass("o"); //
      turns++;
    } else if ((a3&&c2) || (b3&&c1)|| (c1&&b2)) {
      $("#33").addClass("o");
      turns++;
    } else if ((a1&&c2) || (b1&&c3) || (a2&&b3) || (a2&&b1)) {
      $("#31").addClass("o");
      turns++;
    } else if ((a1&&b3) || (a2&&c3) || (b1&&c2) || (b3&&c2)) {
      $("#13").addClass("o");
      turns++;
    } else {
      blockOrWin("x");
    }
  }; // 2nd computer move




  var getEmpty = function(){
    var boardX = boardCheck("x");
    var boardO = boardCheck("o");
    var totalBoard = [];
    for (var i = 0; i < boardX.length; i++) {
      totalBoard[i] = (boardX[i] || boardO [i]);
    }
    return totalBoard;
  };

  var compMove3 = function() {
      blockOrWin("o");

    if (!blockOrWin("o")) {
      blockOrWin("x");
    }

    if (!blockOrWin("x")) {
      var i = getEmpty();
      var id = arrayId[i];
      $("#" + id).addClass("o");
    }
    turns++;
  }; // 3rd computer move

  var compMove4 = function() {
    compMove3();
  }; // 4th computer move

  var blockOrWin = function(token) {
    var boardX = boardCheck('x');
    boardCheck(token);
    if (!boardX[0] && ((a2&&a3) || (b1&&c1) || (b2&&c3))) {
      return "#11";

    } else if (!boardX[1] && ((a1&&a3) || (b2&&c2))) {
        return "#12";

      } else if (!boardX[2] && ((a1&&a2) || (b3&&c3) || (b2&&c1))) {
          return "#13";

        } else if (!boardX[3] && ((a1&&a3) || (b2&&b3))) {
            return "#21";

          } else if (!boardX[5] && ((a3&&c3) || (b1&&b2))) {
              return "#23";

            } else if (!boardX[6] && ((c2&&c3) || (a1&&b1) || (b2&&a3))) {
                return "#31";

              } else if (!boardX[7] && ((a2&&b2) || (c1&&c3))) {
                  return "#32";

                } else if (!boardX[8] && ((c1&&c2) || (a3&&b3) || (a1&&b2))) {
                    return "#33";

                  } else {
                    return false;
                  }
  }; // blockOrWin function ends

  var boardCheck = function(token) {
    a1 = $("#11").hasClass(token);
    a2 = $("#12").hasClass(token);
    a3 = $("#13").hasClass(token);
    b1 = $("#21").hasClass(token);
    b2 = $("#22").hasClass(token);
    b3 = $("#23").hasClass(token);
    c1 = $("#31").hasClass(token);
    c2 = $("#32").hasClass(token);
    c3 = $("#33").hasClass(token);

    return [a1, a2, a3, b1, b2, b3, c1, c2, c3];
  };










}); // end of .ready
