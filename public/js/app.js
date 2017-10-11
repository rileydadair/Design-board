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

    .state('directory', {
      url: '/directory/:id',
      templateUrl: 'views/directory.html',
      controller: 'directoryCtrl'
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
