$(document).ready(function(){

  console.log("you'll never walk alone");

  var $body = $('body');
  var $tableCell = $('td');
  var toggle = true;

  $tableCell.on('click', function(){
    console.log(this.id);
    var yanse;

    if(toggle){
      yanse = "black";
    } else {
      yanse = "white";
    }

    var $token = $('<div class="token">').css({
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundColor: yanse

    });

    $tableCell.append($token);

    toggle = !toggle;


  }); // end fo click







}); // end of .ready
