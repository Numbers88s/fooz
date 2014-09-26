function ctrl($scope, $timeout, $interval){
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

  $scope.startTimer = function () {
    $scope.timerprom = $interval(function(){
      if($scope.second < 59) {
       $scope.second++;
      }
      else {
        $scope.second = 0;
        $scope.minute++;
      }
    }, 1000);
  }

  $scope.recordInput = function($e) {
    
  	if($scope.scoreInterval) {
  		return;
  	}

  	//rotate player 1
	  if($e.which == 111) {
	   $scope.avatar1++;
    }

    //rotate player 2
	  if($e.which == 112) {
	    $scope.avatar2++;
    }

    //score player 1
    if($e.which == 98) {
      if(!$scope.scoreInterval) {
	      $timeout(function(){$scope.scoreInterval = false}, 4000);
        $timeout(function(){$scope.goal = false}, 2000);
        $scope.player1++;
        $scope.goal = true;
        $scope.scoreInterval = true;

        if($scope.player1 == 4 && $scope.player2 < 4) {
          $scope.finishthem = true;
          $timeout(function(){$scope.finishthem = false;}, 2000);
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
        $timeout(function(){$scope.scoreInterval = false}, 4000);
        $timeout(function(){$scope.goal = false}, 2000);
        $scope.player2++;
        $scope.goal = true;

        $scope.scoreInterval = true;

        if($scope.player2 == 4 && $scope.player1 < 4) {
          $scope.finishthem = true;
          $timeout(function(){$scope.finishthem = false;}, 2000);
        }
      }
      //$scope.scoreInterval = true;
    }

    //reset key
    if($e.which == 119) {
      $scope.reset();
    }


	//shortcut keys for players
	if($e.which == 98) {
	 
  }

    if($scope.player1 == 5) {
    	//WINNER
    	$scope.message1 = "WINNER!";
    	if($scope.player2 == 0) {
    		//SKUNK!
    		$scope.message2 = "SKUNKED!"
    	}
      $interval.cancel($scope.timerprom);

      if($scope.championship) {
        $scope.player1Rounds++;

        if($scope.player1Rounds < 3) {
          $timeout(function(){$scope.nextRound()}, 4000);
        }
        else {
          //championship win
          $scope.championshipWin();
        }
      }
    }
    else if($scope.player2 == 5) {
    	//winner!
		  $scope.message2 = "WINNER!";
		  if($scope.player1 == 0) {
    		//SKUNK!
    		$scope.message1 = "SKUNKED!";
    	}
      $interval.cancel($scope.timerprom);
      if($scope.championship) {
        $scope.player2Rounds++;
        if($scope.player2Rounds < 3) {
          $timeout(function(){$scope.nextRound()}, 4000);
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

  $scope.reset = function() {
  	$scope.nextRound();
    $scope.player1Rounds = 0;
    $scope.player2Rounds = 0;
  }
}