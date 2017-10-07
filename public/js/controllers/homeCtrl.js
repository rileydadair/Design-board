app.controller('homeCtrl', function($scope, $location, mainSrvc, Upload, user) {

  // console.log(user);
  // if(user.data) {
  //   $location.path('/')
  // }
  //
  // $scope.user = user;

$scope.createUser = (email, password, name, username) => {
    if(!email) {
      console.log('no email');
    }
    if(!password) {
      console.log('no password');
    }
    if(!name) {
      console.log('no name');
    }
    if(!username) {
      console.log('no username');
    }
    if(name && email && password && username) {
      console.log({username: username});
      mainSrvc.checkUser({username: username}).then(response => {
        if(response.data.validUser == 'username already exists') {
          console.log('username already exists');
        }
        if(response.data.validUser == 'create new user') {
          mainSrvc.createUser(email, password, name, username).then(() => {

            mainSrvc.login({username, password}).then(response => {
              $location.path('/profile/' + response.data.user.username);
              console.log(response.data.user.username);
            })
          })
        }
      })
    }
  }

  $scope.login = (user) => {
    mainSrvc.login(user).then(response => {
      if(response.data.validUser == 'no user') {
        console.log('no user');
      }
      if(response.data.validUser == 'incorrect password') {
        console.log('wrong password');
      }
      if(response.data.validUser == 'valid') {
        $location.path('/profile/' + response.data.user.username);
      }
    })
  }
  // Show / Hide Sign in and Join
  $scope.showJoin = false;
  $scope.showSignin = true;

  $scope.hideJoin = function() {
    $scope.showJoin = false;
    $scope.showSignin = true;
  }
  $scope.hideSignin = function() {
    $scope.showJoin = true;
    $scope.showSignin = false;
  }

});
