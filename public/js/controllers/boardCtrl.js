app.controller('boardCtrl', function($scope, $location, $stateParams, $sce, mainSrvc) {

  // if(user.data) {
  //   $location.path('/')
  // };
  // $scope.user = user;
  const boardId = $stateParams.board_id;

  mainSrvc.getBoardName(boardId).then(response => {
    $scope.boardName = response.data[0].name;
  })
  mainSrvc.getBoardImages($stateParams).then(response => {
    $scope.images = response.data.reverse();
  })
  mainSrvc.getBoardSites(boardId).then(response => {
    console.log(response);

    $scope.sites = response.reverse();
  })

  // ngFileUpload - if image has been selected, invoke upload()
  // $scope.submit = () => {
  //     if ($scope.form.image.$valid && $scope.image) {
  //       $scope.upload($scope.image);
  //     }
  //     else {console.log('no image');}
  //   };

  // Upload Image to firebase
  $scope.upload = (file) => {
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
      mainSrvc.addImage(downloadURL, boardId).then(() => {
        mainSrvc.getBoardImages($stateParams).then((response) => {
          $scope.images = response.data.reverse();
        });
      });
    });
  }

  $scope.deleteImage = (image) => {
    console.log(image);
    const url = image.image_url;
    const boardId = image.board_id
    mainSrvc.deleteImage(url, boardId).then(response => {
      $scope.images = response.data.reverse();
    })
  }

  $scope.addSite = (site) => {
    if(!site){
      console.log('please enter site');
    }
    else {
      const boardId = $stateParams.board_id;
      console.log(boardId);
      mainSrvc.addSite(site, boardId).then(() => {
        mainSrvc.getBoardSites(boardId).then(response => {
          console.log(response);

          $scope.sites = response.reverse();
        })
      })
    }
  }

  $scope.deleteSite = (site) => {
    console.log(site);
    const url = site.site_url;
    const boardId = site.board_id
    mainSrvc.deleteSite(url, boardId).then(() => {
      mainSrvc.getBoardSites(boardId).then(response => {
        console.log(response);
        $scope.sites = response.reverse();
      })
    })
  }

});
