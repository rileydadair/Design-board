app.controller('userCtrl', function($scope, $stateParams, mainSrvc) {
  $scope.test = mainSrvc.test;

  mainSrvc.getUserInfo($stateParams).then(user => {
    $scope.user = user.data[0];
    console.log(user.data[0]);
  })

});
