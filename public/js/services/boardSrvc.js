app.service('boardSrvc',function($http, $location, $sce){

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
      return sitesArr;

    })
  }

  /*
  Add & delete image ===========================================================
  */
  this.addImage = (image, boardId) => {
    return $http.post('/api/user/addImage', [ image, boardId ]);
  }

  this.deleteImage = (url, boardId) => {
    return $http.post('/api/user/deleteImage', [ url, boardId ]);
  }

  /*
  Add & delete site ============================================================
  */
  this.addSite = (site, boardId) => {
    console.log(site, boardId);
    return $http.post('/api/user/addsite', [ site, boardId ]);
  }

  this.deleteSite = (url, boardId) => {
    return $http.post('/api/user/deleteSite', [ url, boardId ]);
  }

  /*
    Upload image to Firebase ===================================================
    Add image_url to database
    Update $scope.images
  */
  this.upload = (file) => {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + file.name).put(file);
    return new Promise(function(resolve, reject) {

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
      },

      function(error) {
        // Handle unsuccessful uploads
        reject(error);
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = uploadTask.snapshot.downloadURL;
        const boardId = file.id;
        // pass download url to database
        console.log(downloadURL , boardId);

        resolve({downloadURL, boardId});
      });

    })
    .then(({downloadURL, boardId}) => {
      // const {downloadURL, boardId} = obj
      console.log(downloadURL, boardId);
      return $http.post('/api/user/addImage', [ downloadURL, boardId ])
      .then(response => {
        console.log(response.data);
        return response;
      })
    })
  }

})
