// write a function to create a n x n board on html with a given n, within same width and height
var createBoard = function(n, width, $parent){
// n:number, is the number of cells on each side
// width:number, is the board side lenght in pixels, the board is always perfect square
// $parent:string, is the parent jquery element board is going to append to

  var cellWidth = width/n;

  var $board;

  $('.cell').css({
    width: cellWidth,
    height: cellWidth,
    fontSize: (cellWidth * 0.8) + 'px'
  });

};


// AI

// player plays move no. 1,3,5,7,9
// AI plays move no. 2,4,6,8

var ai = {
  2:[],
  4:[],
  6:[],
  8:[],
};

// constantly calculate all the possible moves

$('.cells')


var $cellClicked =
