app.controller('boardCtrl', function($scope, $timeout, $location, $stateParams, $sce, boardSrvc) {

  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
        console.log(this.user);
  })

  const boardId = $stateParams.board_id;

  // Get Board Name & Board Images / Sites
  boardSrvc.getBoardName(boardId).then(response => {
    $scope.boardName = response.data[0].name;
  })
  boardSrvc.getBoardImages($stateParams).then(response => {
    console.log(response);
    $scope.images = response;
  })
  boardSrvc.getBoardSites(boardId).then(response => {
    $scope.sites = response;
  })

  // Delete image
  $scope.deleteImage = (image) => {
    const imageId = image.image_id;
    const boardId = image.board_id;
    console.log(image);
    boardSrvc.deleteImage(imageId, boardId).then(response => {
      console.log(response);
      $scope.images = response.data;
    })
  }

  // Add site
  $scope.addSite = (site) => {
    if(!site){
      console.log('please enter site');
    }
    else {
      const boardId = $stateParams.board_id;
      console.log(boardId);
      boardSrvc.addSite(site, boardId).then(response => {
        console.log(response);
        $scope.images = response;
      })
    }
  }

  // Delete site
  $scope.deleteSite = (site) => {
    console.log(site);
    const url = site.site_url;
    const boardId = site.board_id
    boardSrvc.deleteSite(url, boardId).then(() => {
      boardSrvc.getBoardSites(boardId).then(response => {
        $scope.sites = response;
      })
    })
  }

  /*
    Upload image to Firebase ===================================================
    Add image_url to database
    Update $scope.images
  */
  $scope.upload = (file) => {
    const name = file.name
    file.title = name.replace(/.([^.]*)$/,'')
    file.id = boardId;
    console.log(file);
    boardSrvc.upload(file)
    .then(response => {
      $timeout(function(){
        $scope.images = response;
        console.log(response);
      }, 0)
    })
  }

});
