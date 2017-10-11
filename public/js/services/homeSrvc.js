app.service('homeSrvc',function($http, $location){

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
  Login ========================================================================
  */
  this.login = (user) => {
    // Endpoint - login
    return $http.post('/user/login', user)
    .then(response => {
      console.log(response);
      if(response.data.validUser == 'no user') {
        console.log('no user');
      }
      if(response.data.validUser == 'valid') {

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          console.log("logged in")
          // Endpoint - get user id
          return $http.get(`/user/getUserId/${user.email}`)
          .then(response => {
            console.log(response);
            $location.path('/directory' + response.data[0].id);
          })
        })
        .catch(err => {
          console.log(err);
          // Run jQuery here in Id to add html message
          this.error = "Password is incorrect";
        })

      }
    })
  }

  /*
  Create new user ==============================================================
  */
  this.createNewUser = (name, email, password) => {
    console.log(name, email, password)
    if(!name) {
      console.log('no name')
    }
    if(!email) {
      console.log('no email')
    }
    if(!password) {
      console.log('no password')
    }
    if(name && email && password) {

      function check(name, email, password) {
        const userEmail = {email:email}
        console.log(email);

        // Endpoint - checkUser
        return $http.post('/user/checkUser', userEmail)
        .then(response => {
          if(response.data.validUser == 'username already exists') {
            console.log('The email address is already in use by another account.')
            // Run jQuery here in Id to add html message
          }
          if(response.data.validUser == 'create new user') {
            // console.log('create new user')
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                let userInfo = [user.uid, user.email, name]
                // Endpoint - create user
                return $http.post('/user/createUser', userInfo).then((response) => {
                  $location.path('/directory' + response.data[0].id);
                  console.log(response);
                })
            })
          }
        })
      }
      check(name, email, password);

    }
  }

  /*
  Sign out =====================================================================
  */
  this.signOut = (user) => {
    console.log('clicked');
    firebase.auth().signOut().then((user) => {
        console.log(this.user.uid, 'Signed Out');
    })
  }

});
