app.service('directorySrvc',function($http, $location){

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.user = user
        return user
        console.log(user);
    }
    else {
      this.noUser = true;
    }
  })

  /*
  Get requests on view load ====================================================
  */
  this.getUser = (params) => {
    // Endpoint - Get user
    return $http.get(`/user/getUser/${params.id}`);
  }

  this.getBoards = (params) => {
    // Endpoint - Get boards
    return $http.get(`/user/getBoards/${params.id}`)
  }

  this.getDirectoryImages = (params) => {
    // console.log(params.id);
    // Endpoint - Get board images for directory view
    return $http.get(`/user/getDirectoryImages/${params.id}`)
  }

  /*
  Board Route ==================================================================
  */
  this.boardRoute = (board) => {
    const boardId = board.board_id;
    const userId = board.id;
    $location.path('/directory' + userId + '/board' + boardId);
  }

  /*
  Create board =================================================================
  */
  this.createNewBoard = (board) => {
    const userId = board.id
    // Endpoint - check board
    return $http.post('/user/checkBoard', board)
    .then(response => {
      if(response.data.validBoard == 'board already exists') {
        // Run jQuery here in Id to add html message
        console.log('This board already exists');
      }
      else {
        // Endpoint - create board
        return $http.post('/user/createBoard', board)
        .then(response => {
          const boardId = response.data[0].board_id
          $location.path('/directory' + userId + '/board' + boardId);
        })
      }
    })
  }

  /*
  Delete board =================================================================
  */
  this.deleteBoard = (board, userId) => {
    // Endpoint - delete board
    return $http.post('/user/deleteBoard', [ board, userId ]);
  }

})
