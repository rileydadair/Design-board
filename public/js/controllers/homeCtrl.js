app.controller('homeCtrl', function($scope, $location, mainSrvc, Upload) {

  // console.log(user);
  // if(user.data) {
  //   $location.path('/')
  // }
  //
  // $scope.user = user;

  // Checking user state. Each controller
  firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user);
        };
        // else { ng-show set to false }
    })

  // password at least 6 characters, html attributes
  $scope.createUser = (name, email, password) => {
    if(!name) {
      console.log('no name');
    }
    if(!email) {
      console.log('no email');
    }
    if(!password) {
      console.log('no password');
    }

    if(name && email && password) {
      console.log({email: email});
      mainSrvc.checkUser({email: email}).then(response => {
        if(response.data.validUser == 'username already exists') {
          console.log('The email address is already in use by another account.');
        }
        if(response.data.validUser == 'create new user') {
          console.log('create new user');

          mainSrvc.createUser(name, email, password)
        }
      })
    }
  }

  $scope.signIn = (user) => {
    mainSrvc.login(user).then(response => {
      console.log(response);
      if(response.data.validUser == 'no user') {
        console.log('no user');
      }
      if(response.data.validUser == 'valid') {

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(() => {
            console.log("logged in")
            mainSrvc.getUserId(user).then(response => {
              console.log(response);
              $location.path('/profile/' + response.data[0].id);
            })
          })
          .catch(err => {
            $scope.error = "Password is incorrect";
            return $scope.error;
            console.log(err);
          })
        //
        // $location.path('/profile/' + response.data.user.username);
      }
    })
  }

  $scope.signOut = (user) => {
    firebase.auth().signOut().then((user) => {
        console.log(this.user.uid, 'Signed Out');
    })
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
  $scope.showSignup = false;
  $scope.showSignin = true;

  $scope.hideSignUp = function() {
    $scope.showSignup = false;
    $scope.showSignin = true;
  }
  $scope.hideSignin = function() {
    $scope.showSignup = true;
    $scope.showSignin = false;
  }

});
