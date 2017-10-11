app.controller('homeCtrl', function($scope, $location, homeSrvc, Upload) {

  // Checking user state. Each controller!!!
  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
    })

  // Login, Sign up, Sign out
  $scope.login = homeSrvc.login

  // password at least 6 characters, html attributes
  $scope.createUser = (name, email, password) => {
    console.log(name, email, password);
    homeSrvc.createNewUser(name, email, password)
  }

  $scope.signOut = homeSrvc.signOut;

  // Hide / Show - Login & Sign up
  $scope.showSignup = false;
  $scope.showLogin = true;

  $scope.hideSignUp = function() {
    $scope.showSignup = false;
    $scope.showLogin = true;
  }
  $scope.hideLogin = function() {
    $scope.showSignup = true;
    $scope.showLogin = false;
  }

});
