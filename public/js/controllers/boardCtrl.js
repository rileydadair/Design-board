app.controller('boardCtrl', function($scope, $location, $stateParams, mainSrvc, user) {

  if(user.data) {
    $location.path('/')
  };
  $scope.user = user;
  // Board name passed in from stateParams from ui-sref and $location in
  // profileCtrl.js
  $scope.boardName = $stateParams.name;
  const boardId = $stateParams.board_id;

  // Get all board data
  mainSrvc.getBoardImages($stateParams).then(response => {
    console.log(response);
    $scope.images = response.data.reverse();
  })

  // ngFileUpload - if image has been selected, invoke upload()




  $scope.submit = () => {
      if ($scope.form.image.$valid && $scope.image) {
        $scope.upload($scope.image);
      }
      else {console.log('no image');}
    };

  // $scope.upload = function(file) {
  //   mainSrvc.upload(file);
  // }

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
});
