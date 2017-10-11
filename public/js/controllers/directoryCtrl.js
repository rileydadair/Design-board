app.controller('directoryCtrl', function($scope, $location, $stateParams, directorySrvc) {

  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
        console.log(this.user);
  })

  // Get user and boards
  directorySrvc.getUser($stateParams).then(response => {
    $scope.user = response.data[0];
  })

  directorySrvc.getBoards($stateParams).then(response => {
    console.log(response.data);
    $scope.boards = response.data;

    // directorySrvc.getDirectoryImages($stateParams).then(response => {
    //   console.log(response.data);
    //   $scope.images = response.data
    // })
  })

  // Board route
  $scope.boardRoute = (board) => {
    board.userId = parseInt($stateParams.id);
    directorySrvc.boardRoute(board)
  }

  // Create board
  $scope.createBoard = (board) => {
    if(!board) {
      console.log('Please enter name');
    }
    else {
      board.id = $stateParams.id;
      directorySrvc.createNewBoard(board);
    }
  };

  // Hide / Show - Modal
  $scope.hideModal = () => {
    $scope.showModal = false;
  }

  // Delete Board
  $scope.deleteBoard = (board) => {
    const userId = parseInt($stateParams.id);
    directorySrvc.deleteBoard(board, userId).then(response => {
      console.log(response.data);
      $scope.boards = response.data;
    })
  }

});
