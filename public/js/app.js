var app = angular.module('beerList', ['star-rating', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'mainCtrl',
      templateUrl: '/templates/home.html'
    })
    .state('beer', {
      url: '/beer/:id',
      controller: 'beerCtrl',
      params: {
        beerParam: null
      },
      templateUrl: '/templates/beer.html',
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'AuthCtrl'
    });

  $urlRouterProvider.otherwise('/home');
}]);