app.service('mainSrvc',function($http, $location){

  this.getUser = () => $http.get('/auth/me');

  // this.getUsers = function() {
  //   return $http.get('/api/users');
  // }

  this.checkUser = (user) => {
    return $http.post('/api/user/checkUser', user);
  }

  this.createUser = (email, password, name, username) => {
    return $http.post('/api/user/createUser', [ email, password, name, username ])
  }

  this.login = (user) => {
    return $http.post('/api/user/login', user);
  }

  this.checkBoard = (board) => {
    return $http.post('/api/user/checkBoard', board);
  }

  this.getBoards = (user) => {
    return $http.get(`/api/user/getBoards/${user.id}`)
  }

  this.createBoard = (board) => {
    return $http.post('/api/user/createBoard', board);
  }

  this.getBoardImages = (board) => {
    return $http.get(`/api/user/getBoardImages/${board.board_id}`)
  }

  this.addImage = (image, boardId) => {
    return $http.post('/api/user/addImage', [image, boardId])
  }


  // this.getUserInfo = function(username){
  //   console.log(username);
  //   return $http.get(`/api/user/${username}`)
  // }

});
