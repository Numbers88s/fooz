function ctrl($scope){
  $scope.player1 = 0;
  $scope.player2 = 0;
  $scope.recordScore = function($e) {
    if($e.which == 119) {
      $scope.player1++;
    }
  }
}



// directive('playerscore', function () {
//     return function (scope, element, attrs) {
//         element.bind("keydown keypress", function (event) {
//             if(event.which === 13) {
//                 scope.$apply(function (){
//                     scope.$eval(attrs.ngEnter);
//                 });

//                 event.preventDefault();
//             }
//         });
//     };
// });

