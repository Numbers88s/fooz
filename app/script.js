var kickAssFoosball = angular.module('kickAssFoosball', ['timer']);

kickAssFoosball.controller('ctrl', function($scope, $interval, $timeout) {

  $scope.player1 = 0;
  $scope.player2 = 0;
  $scope.player1Rounds = 0;
  $scope.player2Rounds = 0;
  $scope.skunk = false;
  $scope.winner = false;
  $scope.scoreInterval = false;
  $scope.championship = false;
  $scope.avatar1 = 0;
  $scope.avatar2 = 0;
  $scope.goal = false;
  $scope.minute = 0;
  $scope.second = 0;
  $scope.message1 = "";
  $scope.message2 = "";
  $scope.finishthem = false;
  $scope.timerprom;
  $scope.Timer;
  $scope.TotalSeconds;




  // $scope.startTimer = function () {
  //   $scope.timerprom = $interval(function(){
  //     if ($scope.second < 59) {
  //       $scope.second++;
  //     }
  //     else {
  //       $scope.second = 0;
  //       $scope.minute++;
  //     }
  //   }, 1000);
  // 

  // $scope.CreateTimer = function(TimerID, Time) {
  //   $scope.Timer = document.getElementById(TimerID);
  //   $scope.TotalSeconds = Time;

  //   $scope.UpdateTimer()
  //   window.setTimeout("Tick()", 1000);
  // }

  // $scope.Tick = function() {
  //   if ($scope.TotalSeconds <= 0) {
  //     alert("Time's up!")
  //     return;
  //   }

  //   TotalSeconds += 1;
  //   $scope.UpdateTimer()
  //   window.setTimeout("Tick()", 1000);
  // }

  // $scope.UpdateTimer = function() {
  //   var Seconds = TotalSeconds;
    
  //   var Hours = Math.floor(Seconds / 3600);
  //   Seconds -= Hours * (3600);

  //   var Minutes = Math.floor(Seconds / 60);
  //   Seconds -= Minutes * (60);

  //   var TimeStr = LeadingZero(Minutes) + " : " + LeadingZero(Seconds)

  //   Timer.innerHTML = TimeStr;
  // }

  // $scope.LeadingZero = function(Time) {
  //   return (Time < 10) ? "0" + Time : + Time;
  // }

  // $scope.RestartTimer = function() {
  //   $scope.TotalSeconds = 0;
  // }

  $scope.recordInput = function($e) {
    
    if($scope.scoreInterval) {
      return;
    }

    //rotate player 1
    if($e.which == 112) {
      $scope.avatar2++;
    } else if($e.which == 111 && $scope.avatar2 > 0) {
      $scope.avatar2--;
    }

    //rotate player 2
    if($e.which == 114) {
      $scope.avatar1++;
    } else if($e.which == 113 && $scope.avatar1 > 0) {
      $scope.avatar1--;
    }

    //score player 1
    if($e.which == 98) {
      if(!$scope.scoreInterval) {
        $timeout(function(){$scope.scoreInterval = false}, 2000);
        $timeout(function(){$scope.goal = false}, 1000);
        $scope.player1++;
        $scope.goal = true;
        $scope.scoreInterval = true;

        if($scope.player1 == 4 && $scope.player2 < 4) {
          $scope.finishthem = true;
          $timeout(function(){$scope.finishthem = false;}, 3500);
        }
      }
      //$scope.scoreInterval = true;
    }

    //C switches into championship mode
    if($e.which == 99) {
       $scope.championship = !$scope.championship;

    }
    
    //score player 2
    if($e.which == 49) {
      if(!$scope.scoreInterval) {
        $timeout(function(){$scope.scoreInterval = false}, 2000);
        $timeout(function(){$scope.goal = false}, 1000);
        $scope.player2++;
        $scope.goal = true;

        $scope.scoreInterval = true;

        if($scope.player2 == 4 && $scope.player1 < 4) {
          $scope.finishthem = true;
          $timeout(function(){$scope.finishthem = false;}, 3500);
        }
      }
      //$scope.scoreInterval = true;
    }

    //reset key (Press W)
    if($e.which == 119) {
      $scope.reset();
    }

    //shortcut keys for players
    if($e.which == 98) {
     
    }

    if($scope.player2 == 5) {
    //WINNER
      $scope.message2 = "WINNER!";
      $scope.$broadcast('timer-stop');
      if($scope.player1 == 0) {
        //SKUNK!
        $scope.message1 = "SKUNKED!"
      }
      $interval.cancel($scope.timerprom);

      if($scope.championship) {
        $scope.player1Rounds++;

        if($scope.player1Rounds < 3) {
          $timeout(function(){$scope.nextRound()}, 2500);
        }
        else {
          //championship win
          $scope.championshipWin();
        }
      }
    }
    else if($scope.player1 == 5) {
    //WINNER!
      $scope.message1 = "WINNER!";
      $scope.$broadcast('timer-stop');
      if($scope.player2 == 0) {
        //SKUNK!
        $scope.message2 = "SKUNKED!";
      }
      $interval.cancel($scope.timerprom);
      if($scope.championship) {
        $scope.player2Rounds++;
        if($scope.player2Rounds < 3) {
          $timeout(function(){$scope.nextRound()}, 2500);
        }
        else {
          $scope.championshipWin();
        }
      }
    }
  }

  $scope.championshipWin = function() {

  }

  $scope.nextRound = function () {
    $scope.player1 = 0;
    $scope.player2 = 0;
    $scope.message1 = "";
    $scope.message2 = "";
    $scope.finishthem = false;
    $scope.minute = 0;
    $scope.second = 0;
    $interval.cancel($scope.timerprom);
    $scope.startTimer();
  }

  $scope.resetTimeout = function () {
    if ($scope.timeoutId) {
      clearTimeout($scope.timeoutId);
    }
  }

  $scope.reset = function() {
    // $scope.nextRound();
    $scope.player1Rounds = 0;
    $scope.player2Rounds = 0;
    $scope.avatar1 = 0;
    $scope.avatar2 = 0;
    $scope.player1 = 0;
    $scope.player2 = 0;
    $scope.message1 = "";
    $scope.message2 = "";
    $scope.resetTimeout();
    $scope.$broadcast('timer-stop');
    $scope.$broadcast('timer-start');
    // $scope.mminutes = 0;
    // $scope.sseconds = 0;
    // $scope.startTimer();
  }
})



// var Timer;
// var TotalSeconds;
// var stop;
// var restart;

// function CreateTimer(TimerID, Time) {
//   Timer = document.getElementById(TimerID);
//   TotalSeconds = Time;

//   UpdateTimer()
//   restart = window.setTimeout("Tick()", 1000);
// }

// function Tick() {
//   if (TotalSeconds === 1500) {
//     return;
//   }

//   TotalSeconds += 1;
//   UpdateTimer()
//   stop = window.setTimeout("Tick()", 1000);
//   return;
// }

// function UpdateTimer() {
//   var Seconds = TotalSeconds;
  
//   var Hours = Math.floor(Seconds / 3600);
//   Seconds -= Hours * (3600);

//   var Minutes = Math.floor(Seconds / 60);
//   Seconds -= Minutes * (60);

//   var TimeStr = LeadingZero(Minutes) + " : " + LeadingZero(Seconds);

//   Timer.innerHTML = TimeStr;
// }

// function LeadingZero(Time) {
//   return (Time < 10) ? "0" + Time : + Time;
// }

// document.onkeypress = function(e) {
//   // If user presses W it resets the score and picture  
//   if(e.keyCode == 119) {
//     clearTimeout(stop);
//     clearTimeout(restart);
//     Timer.innerHTML = "00 : 00";
//     CreateTimer("timer", 01);
//     e.preventDefault();
//   //If user presses s it reloads page
//   } else if(e.keyCode == 115) {
//     document.location.reload(true);
//   } else if(e.keyCode == 102) {
//     clearTimeout(stop);
//     clearTimeout(restart);
//   }
// }

// IGNORE THIS FOR NOW
// window.addEventListener("keydown", keysPressed, false);
// // window.addEventListener("keyup", keysReleased, false);

// var keys = [];

// function keysPressed(e) {
//   // This stores an entry for every key pressed.
//   keys[e.keyCode] = true;

//   // w + w
//   if (keys[115] && keys[115]) {
//     console.log("it works!");
//     keys[e.keyCode] = false;
//   }
// }

// function  keysReleased(e) {
//   // This marks keys that were released.
  
// }






























