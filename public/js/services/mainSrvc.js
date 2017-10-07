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

  // this.getBoardResults = (board) => {
  //   return $http.get('/api/user/getBoardResults', board)
  // }

  // this.getUserInfo = function(username){
  //   console.log(username);
  //   return $http.get(`/api/user/${username}`)
  // }

  // Upload Image to firebase
  this.upload = (file) => {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + file.name).put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      const downloadURL = uploadTask.snapshot.downloadURL;

      // pass download url to database
      console.log(downloadURL);
    });
  }

});
