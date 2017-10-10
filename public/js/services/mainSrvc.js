app.service('mainSrvc',function($http, $location, $sce){

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

    this.createUser = (name, email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            let userInfo = [user.uid, user.email, name]
            return $http.post('/api/users/createUser', userInfo).then((response) => {
              $location.path('/profile/' + response.data[0].id);
              console.log(response);
            })
        })
    }

    // this.signIn = (email, password) => {
    //   firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(() => { console.log("logged in") })
    //     .catch(err => {
    //       // $scope.error = "Password is incorrect";
    //       // return $scope.error;
    //       console.log(err);
    //     })
    //   }














  /*=========================================*/



  this.getUser = () => $http.get('/auth/me');

  // this.getUsers = function() {
  //   return $http.get('/api/users');
  // }

  this.checkUser = (user) => {
    return $http.post('/api/user/checkUser', user);
  }

  // this.createUser = (email, password, name, username) => {
  //   return $http.post('/api/user/createUser', [ email, password, name, username ])
  // }

  this.login = (user) => {
    return $http.post('/api/user/login', user);
  }

  this.checkBoard = (board) => {
    return $http.post('/api/user/checkBoard', board);
  }

  this.getBoards = (params) => {
    // console.log(this.user.uid);
    console.log(params.id);
    return $http.get(`/api/user/getBoards/${params.id}`);
  }

  this.createBoard = (board) => {
    return $http.post('/api/user/createBoard', board);
  }

  this.deleteBoard = (board, userId) => {
    return $http.post('/api/user/deleteBoard', [ board, userId ]);
  }

  this.addImage = (image, boardId) => {
    return $http.post('/api/user/addImage', [ image, boardId ]);
  }

  this.deleteImage = (url, boardId) => {
    return $http.post('/api/user/deleteImage', [ url, boardId ]);
  }

  this.addSite = (site, boardId) => {
    console.log(site, boardId);
    return $http.post('/api/user/addsite', [ site, boardId ]);
  }

  this.deleteSite = (url, boardId) => {
    return $http.post('/api/user/deleteSite', [ url, boardId ]);
  }

  this.getBoardName = (id) => {
    return $http.post('/api/user/getBoardName', [ id ]);
  }

  this.getBoardImages = (board) => {
    return $http.get(`/api/user/getBoardImages/${board.board_id}`);
  }

  this.getBoardSites = (id) => {
    console.log(id);
    return $http.post('/api/user/getBoardSites', [ id ])
    .then(response => {

      const results = response.data;
      const sitesArr = [];


      for(var i = 0; i < results.length; i++){
        const obj = {
          trusted_url: $sce.trustAsResourceUrl(results[i].site_url),
          site_url: results[i].site_url,
          board_id: results[i].board_id,
          title: results[i].title,
          description: results[i].description,
        }
        sitesArr.push(obj);
      }
      console.log(sitesArr);
      return sitesArr;

    })
  }

  this.getUserId = function(user){
    return $http.get(`/api/user/${user.email}`)
  }

  this.getUser = (params) => {
    return $http.get(`/api/user/getUser/${params.id}`);
  }
});
