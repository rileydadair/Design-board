var app = angular.module('app', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'homeCtrl',
      // resolve: {
      //     user: mainSrvc => mainSrvc.getUser()
      //         .then(response => response.data)
      //         .catch(err => err)
      // }
    })
    .state('user', {
      url: '/:id',
      templateUrl: 'views/user.html',
      controller: 'userCtrl'
    })
});
