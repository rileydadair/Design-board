app.controller('boardCtrl', function($scope, $location, $stateParams, mainSrvc, user) {

  if(user.data) {
    $location.path('/')
  };
  $scope.user = user;
  // Board name passed in from stateParams from ui-sref and $location in
  // profileCtrl.js
  $scope.test = $stateParams.name;
  const boardResults = [ user.id, $stateParams.name];
  console.log($stateParams);

  // Get all board data
  // mainSrvc.getBoardResults(boardResults).then(response => {
  //   console.log(response);
  // })

  // ngFileUpload - if image has been selected, invoke upload()
  $scope.submit = () => {
      if ($scope.form.image.$valid && $scope.image) {
        $scope.upload($scope.image);
      }
      else {console.log('no image');}
    };

  $scope.upload = function(file) {
    mainSrvc.upload(file);
  }
});
