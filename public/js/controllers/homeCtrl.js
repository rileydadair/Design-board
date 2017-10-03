app.controller('homeCtrl', function($scope, mainSrvc) {
  mainSrvc.getUsers().then(users => {
    $scope.users = users.data;
  })

  $scope.addUser = function(email, password, name, username) {
    mainSrvc.addUser(email, password, name, username).then(users => {
      $scope.users = users.data;
    })
  }

  $scope.deleteUser = function(user) {
    mainSrvc.deleteUser(user).then(users => {
      $scope.users = users.data;
    })
  }
});
