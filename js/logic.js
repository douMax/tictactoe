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



var getWins = function(n){
  var matrix = [];
  var arr = [];
  var arr2 = [];
  var str = '';
  for (var i = 1; i <= n; i++){
    debugger;
    var idFront = i;
    for (var j = 1; j<= n; j++){
      str = idFront + '' + j;
      arr.push(str);
      console.log(str);
    }
    arr2.push(arr);
    console.log(arr);
  }
  matrix.push(arr2);
  console.log(arr2);
  console.log(matrix);
};



// write a function to create a n x n board on html with a given n, within same width and height
var createBoard = function(n, width, $parent){
// n:number, is the number of cells on each side
// width:number, is the board side lenght in pixels, the board is always perfect square
// $parent:string, is the parent jquery element board is going to append to

  var cellWidth = width/n;

  var $board;
  var $cell;

  $cell.css({
    width: cellWidth,
    height: cellWidth,
    fontSize: (cellWidth * 0.8) + 'px'
  });

};


// AI

var board
