app.controller('profileCtrl', function($scope, $location, mainSrvc, user) {

  if(user.data) {
    $location.path('/')
  };
  $scope.user = user;

  // Get user boards
  mainSrvc.getBoards(user).then(response => {
    console.log(response);
    $scope.boards = response.data;
  })

  // Create board
  $scope.createBoard = (board) => {

    if(!board) {
      console.log('Please enter name');
    }
    else {
      board.id = user.id;
      mainSrvc.checkBoard(board).then(response => {
        if(response.data.validBoard == 'board already exists') {
          console.log('This board already exists');
        }
        else {
          console.log(board);
          mainSrvc.createBoard(board).then(response => {
            console.log(response.data[0]);
            $location.path('/board/' + response.data[0].board_id + '/' + response.data[0].name);
          })
        }
      })
    }


  };

  $scope.hideModal = () => {
    $scope.showModal = false;
  };
});
