var libraryApp = angular.module('libraryApp', ['ngRoute', 'libraryControllers']);

libraryApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/emprunt/:bookId?', {
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
        when('/rechercher', {
            templateUrl: 'views/rechercher.html',
            controller: 'libraryRechercherCtrl'
        }).
        otherwise({
            redirectTo: '/emprunt'
        });
    }
]);
