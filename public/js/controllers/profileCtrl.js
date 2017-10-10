app.controller('profileCtrl', function($scope, $location, $stateParams, mainSrvc) {

  // if(user.data) {
  //   $location.path('/')
  // };
  // $scope.user = user;

  // Get user boards


  // firebase.auth().onAuthStateChanged(user => {
  //       if (user) {
  //           this.user = user
  //           return user
  //           console.log(user);
  //       };
  //       // else { ng-show set to false }
  //       console.log(this.user);
  // })

// $scope.noUser = mainSrvc.noUser;


mainSrvc.getUser($stateParams).then(response => {
  // console.log(response);
  $scope.user = response.data[0];
})

  mainSrvc.getBoards($stateParams)
  .then(response => {
    // console.log(response);
    $scope.boards = response.data;
  })

  // Create board
  $scope.createBoard = (board) => {

    if(!board) {
      console.log('Please enter name');
    }
    else {
      board.id = $stateParams.id;
      mainSrvc.checkBoard(board).then(response => {
        if(response.data.validBoard == 'board already exists') {
          console.log('This board already exists');
        }
        else {
          console.log(board);
          mainSrvc.createBoard(board).then(response => {
            const boardId = response.data[0].board_id
            console.log(response.data[0]);
            $location.path('/board/' + boardId);
          })
        }
      })
    }
  };

  $scope.hideModal = () => {
    $scope.showModal = false;
  };

  $scope.deleteBoard = (board) => {
    const userId = parseInt($stateParams.id);
    // console.log(board, userId);
    mainSrvc.deleteBoard(board, userId).then(response => {
      $scope.boards = response.data;
    })
  }

});
