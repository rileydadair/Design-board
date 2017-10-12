app.service('directorySrvc',function($http, $location, $sce){

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
    .then(response => {
      console.log(response);
      const results = response.data;
      const imagesArr = [];

      for(var i = 0; i < results.length; i++){
        const obj = {
          board_id: results[i].board_id,
          image_url: $sce.trustAsResourceUrl(results[i].image_url),
          site_url: $sce.trustAsResourceUrl(results[i].site_url),
          reference_url: results[i].reference_url,
          name: results[i].name,
          title: results[i].title,
          description: results[i].description,
          image_id: results[i].image_id
        }
        imagesArr.push(obj);
      }
      return imagesArr;

    })
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
    return $http.post('/user/deleteBoard', [ board, userId ])
    .then(response => {
      console.log(response);
      const results = response.data;
      const imagesArr = [];

      for(var i = 0; i < results.length; i++){
        const obj = {
          board_id: results[i].board_id,
          image_url: $sce.trustAsResourceUrl(results[i].image_url),
          site_url: $sce.trustAsResourceUrl(results[i].site_url),
          reference_url: results[i].reference_url,
          name: results[i].name,
          title: results[i].title,
          description: results[i].description,
          image_id: results[i].image_id
        }
        imagesArr.push(obj);
      }
      return imagesArr;

    })
  }

})
