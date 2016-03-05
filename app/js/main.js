var libraryApp = angular.module('libraryApp', ['ngRoute', 'libraryControllers']);

libraryApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/emprunt', {
            templateUrl: 'views/emprunt.html',
            controller: 'libraryEmpruntCtrl'
        }).
        when('/restitution', {
            templateUrl: 'views/restitution.html',
            controller: 'libraryRestitutionCtrl'
        }).
        when('/gestion', {
            templateUrl: 'views/gestion.html',
            controller: 'libraryGestionCtrl'
        }).
        otherwise({
            redirectTo: '/emprunt'
        });
    }
]);

libraryApp.factory("flash", function($rootScope) {
  var queue = [];
  var currentMessage = "";

  $rootScope.$on("$routeChangeSuccess", function() {
    currentMessage = queue.shift() || "";
  });

  return {
    setMessage: function(message) {
      queue.push(message);
    },
    getMessage: function() {
      return currentMessage;
    }
  };
});
