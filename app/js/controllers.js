var libraryControllers = angular.module('libraryControllers', []);

libraryApp.controller('libraryGestionCtrl', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter) {
    function fetchEmprunt() {
        $http.get('http://localhost:3000/api/emprunt')
            .success(function(emprunts) {
                $scope.emprunts = emprunts
            });
    }

    $scope.cancelEmprunt = function(emprunt) {
        var index = $scope.emprunts.indexOf(emprunt);
        $scope.emprunts.splice(index, 1);
    }

    $scope.refresh = function() {
        fetchEmprunt();
    }

    function doCancel(emprunt) {
        var index = $scope.emprunts.indexOf(emprunt);
        $scope.emprunts.splice(index, 1);
    }

    fetchEmprunt();
}]);

libraryApp.controller('libraryRestitutionCtrl', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter) {
    $http.get('data/emprunts.json').success(function(data) {
        $scope.emprunts = data;
    });

    $http.get('data/children.json').success(function(data) {
        $scope.children = data;
    });

    $http.get('data/books.json').success(function(data) {
        $scope.books = data;
    });

    $scope.validate = function() {
        var result = filterFilter($scope.emprunts, { "book": $scope.empruntTyped });
        if (typeof result === 'undefined' || result.length != 1) {
            return false;
        }
        $scope.emprunt = result[0];
        $scope.childEmprunteur = filterFilter($scope.children, { "name": $scope.emprunt.child })[0];
        $scope.bookEmprunte = filterFilter($scope.books, { "id": $scope.emprunt.book })[0];
        return true;
    }
}]);

libraryApp.controller('libraryEmpruntCtrl', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter) {

    $http.get('data/children.json').success(function(data) {
        $scope.children = data;
    });

    $http.get('data/books.json').success(function(data) {
        $scope.books = data;
    });

    $scope.selectChild = function(name) {
        $scope.childrenFilter.name = name;
    }

    $scope.selectBook = function(name) {
        $scope.booksFilter = name;
    }

    $scope.validate = function(e) {
        return (typeof $scope.childrenFilter === 'undefined' || (filterFilter($scope.children, $scope.childrenFilter).length != 1) || (filterFilter($scope.books, $scope.booksFilter).length != 1));
    }

    $scope.askValidation = function() {
        // do the call
        $scope.showModal = true;
        $scope.selectedChild = $scope.children[1];
        $scope.selectedBook = $scope.books[1];
    }

    $scope.borrowBook = function(child, book) {
        var postBody = {
            "child": child,
            "book": book,
            "date": Date.now
        };
        $http.post('/api/emprunt', {
            username: 'dickeyxxx',
            body: postBody
        }).success(function(emprunt) {
            clean();
        });
    }

    $scope.cancel = function(child, book) {
        clean();
    }

    function clean() {
        $scope.selectedChild = '';
        $scope.selectedBook = '';
        $scope.childrenFilter = '';
        $scope.booksFilter = '';
    }



}]);


libraryApp.controller('headerLibraryController', function($scope, $location) {

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

});
