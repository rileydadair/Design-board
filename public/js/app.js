var app = angular.module('app', ['ui.router', 'ngFileUpload'])
.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    })

    .state('directory', {
      url: '/directory:id',
      templateUrl: 'views/directory.html',
      controller: 'directoryCtrl'
    })

    .state('board', {
      url: '/directory:id/board:board_id',
      templateUrl: 'views/board.html',
      controller: 'boardCtrl',
    })
});
