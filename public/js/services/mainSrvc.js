app.service('mainSrvc',function($http){
  this.getUsers = function() {
    return $http.get('/api/users');
  }

  this.addUser = function(email, password, name, username) {
    return $http.post('/api/users/add/', [ email, password, name, username ])
  }

  this.deleteUser = function(user) {
    return $http.delete(`/api/users/${user.id}`)
  }

  this.getUserInfo = function(username){
    console.log(username.id);
    return $http.get(`/api/user/${username.id}`)
  }

  this.test = 'bittymonster'
});
