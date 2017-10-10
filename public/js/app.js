var app = angular.module('app', ['ui.router', 'ngFileUpload'])
.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
      // resolve: {
      //     user: mainSrvc => mainSrvc.getUser()
      //         .then(response => response.data)
      //         .catch(err => err)
      // }
    })

    .state('profile', {
      url: '/profile/:id',
      templateUrl: 'views/profile.html',
      controller: 'profileCtrl'
      // resolve: {
      //     user: mainSrvc => mainSrvc.getUser()
      //         .then(response => response.data)
      //         .catch(err => err)
      // }
    })

    .state('board', {
      url: '/board/:board_id',
      templateUrl: 'views/board.html',
      controller: 'boardCtrl',
      // resolve: {
      //     user: mainSrvc => mainSrvc.getUser()
      //         .then(response => response.data)
      //         .catch(err => err)
      // }
    })
});
