$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  $(".lineUpButton").on("click", function(event){
    var counter = 100;

    while(counter > 0){
      $.each(window.dancers, function(index, dancer){
        this.$node.css({"left" : 10, "top" : 50});
      });

      $.each(window.dancers, function(index,element){
        var prev = window.dancers.slice(0, index);
        var left = Number(element.$node[0].style["left"].replace("px", "")) + 10;

        $.each(prev, function(index, element){
          var left = Number(element.$node[0].style["left"].replace("px", "")) + 10;
          element.$node.css({"left": left})
        })
        element.$node.css({"left": left});
        counter--;
      });
    };
  });


  $(".royalRumble").on("click", function(event){
    for(var i = 0; i < window.dancers.length; i++){
      for(var j = 0; j < window.dancers.length; j++){
        var dancer1Left = window.dancers[i].$node[0].style["left"].replace("px", "");
        var dancer1Top = window.dancers[i].$node[0].style["top"].replace("px", "");
        var dancer2Left = window.dancers[j].$node[0].style["left"].replace("px", "");
        var dancer2Top = window.dancers[j].$node[0].style["top"].replace("px", "");

        if(sameDancer(window.dancers[i], window.dancers[j]) && tooClose(dancer1Left, dancer1Top, dancer2Left, dancer2Top)){
          window.dancers[i].$node.css({"border" : 0, "width" : 0, "height" : 0  });
          window.dancers.splice(i, 1);
          return 0;
        }
      }
    };
  });
});

var sameDancer = function(dancer1, dancer2){
  return dancer1 !== dancer2 ? true : false
};

var pythagorean = function(aLeft, aTop, bLeft, bTop){
  return Math.sqrt(Math.pow((aTop - bTop),2) + Math.pow((aLeft - bLeft),2));
};

var tooClose = function(aLeft, aTop, bLeft, bTop){
  var distance = pythagorean(aLeft, aTop, bLeft, bTop);
  console.log(distance);
  return distance < 1000 ? true : false;
}