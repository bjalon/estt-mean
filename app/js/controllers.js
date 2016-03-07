var libraryControllers = angular.module('libraryControllers', []);

var baseURL = 'http://localhost:3000';

libraryApp.controller('libraryRechercherCtrl', ['$scope', '$http', '$location', 'filterFilter', function($scope, $http, $location, filterFilter) {
    $scope.fetchBooks = function() {
        console.log("Compute info to fetch book items matching the criteria typed: " + $scope.bookTyped);
        if (typeof $scope.bookTyped === 'undefined' || $scope.bookTyped.length < 1) {
            console.log("No info detected");
            $scope.bookSelectedNumber = 0;
            $scope.clean();
            return;
        }

        $http.get(baseURL + '/api/book', {
            param: {
                "fulltext": $scope.bookTyped
            }
        }).success(function(books) {
            console.log("After request here are the books found: " + JSON.stringify(books));
            if (typeof books === 'undefined') {
                console.log("No entry found in response");
                $scope.bookSelectedNumber = 0;
                $scope.clean();
                // We don't fetch subelements
                return;
            }

            // We fetch subelements
            $scope.bookSelectedNumber = books.length;
            $scope.books = books;

            if ($scope.bookSelectedNumber == 1) {
                console.log("Only one result found, so this one is selected");
                $scope.bookSelectedNumber = 1;
                $scope.bookSelected = books[0];
            }
        });

        $scope.navigateToBorrow = function(book) {
            $location.path('/emprunt/' + book.title);
        }
    }

    $scope.clean = function() {
        $scope.bookSelected = '';
        $scope.bookSelectedNumber = 0;
        $scope.books = {};
        $scope.bookTyped = '';
    }
}]);


libraryApp.controller('libraryGestionCtrl', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter) {
    function fetchEmprunt() {
        $http.get(baseURL + '/api/emprunt')
            .success(function(emprunts) {
                $scope.emprunts = emprunts;
                console.log('Emprunts fetched' + JSON.stringify(emprunts));
            });
    }

    $scope.cancelEmprunt = function(emprunt) {
        $http.delete(baseURL + '/api/emprunt/' + emprunt._id)
            .success(function(emprunts) {
                fetchEmprunt();
            });
    }

    $scope.refresh = function() {
        fetchEmprunt();
    }

    fetchEmprunt();
}]);

libraryApp.controller('libraryRestitutionCtrl', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter) {
    $scope.fetchEmprunt = function() {
        console.log("Compute info to fetch emprunt items matching the criteria typed: " + $scope.empruntTyped);
        if (typeof $scope.empruntTyped === 'undefined' || $scope.empruntTyped.length < 1) {
            console.log("No info detected");
            $scope.empruntSelectedNumber = 0;
            clean();
            return;
        }

        $http.get(baseURL + '/api/emprunt', {
            param: {
                "fulltext": $scope.empruntTyped
            }
        }).success(function(emprunts) {
            console.log("After request here are the emprunts found: " + JSON.stringify(emprunts));
            if (typeof emprunts === 'undefined') {
                console.log("No entry found in response");
                $scope.empruntSelectedNumber = 0;
                clean();
                // We don't fetch subelements
                return;
            }

            // We fetch subelements
            $scope.empruntSelectedNumber = emprunts.length;
            $scope.emprunts = emprunts;

            if ($scope.empruntSelectedNumber == 1) {
                console.log("Only one result found, so this one is selected");
                $scope.empruntSelectedNumber = 1;
                $scope.empruntSelected = emprunts[0];
                $scope.bookSelected = filterFilter($scope.books, { "name": emprunts[0].book })[0];
                $scope.childSelected = filterFilter($scope.children, { "name": emprunts[0].child })[0];
            }
        });
    }

    $scope.selectEmpruntItem = function(empruntItem) {
        console.log('Item selected ' + JSON.stringify(empruntItem));
        $scope.empruntSelectedNumber = 1;
        $scope.empruntSelected = empruntItem;
        $scope.bookSelected = filterFilter($scope.books, { "name": empruntItem.book })[0];
        $scope.childSelected = filterFilter($scope.children, { "name": empruntItem.child })[0];
        console.log('book selected ' + JSON.stringify($scope.bookSelected));
        console.log('child selected ' + JSON.stringify($scope.childSelected));
        $scope.hasBeenSelectedInList = true;

    }

    $http.get('data/children.json').success(function(data) {
        $scope.children = data;
    });

    $http.get('data/books.json').success(function(data) {
        $scope.books = data;
    });

    function clean() {
        console.log('Clean asked');
        $scope.hasBeenSelectedInList = false;
        $scope.emprunts = '';
        $scope.bookSelected = '';
        $scope.childSelected = '';
    }

    $scope.cleanAll = function() {
        console.log('Clean All asked');
        $scope.empruntSelectedNumber = 0;
        $scope.empruntSelected = '';
        $scope.empruntTyped = '';
        clean();
    }

    $scope.restituer = function(empruntItem) {
        $http.delete(baseURL + '/api/emprunt/' + $scope.empruntSelected._id, {})
           .success(function(emprunts) {
            $scope.cleanAll();
        });
    }
}]);

libraryApp.controller('libraryEmpruntCtrl', ['$scope', '$http', '$routeParams', 'filterFilter', function($scope, $http, $routeParams, filterFilter) {
    if (typeof $routeParams.bookId != 'undefined' && $routeParams.bookId.length > 0) {
        $scope.booksFilter = $routeParams.bookId;
    }

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

    $scope.borrowBook = function() {
        var postContent = {
            "child": $scope.childrenFilter.name,
            "book": $scope.booksFilter,
        };
        console.log('Msg sent: ' + JSON.stringify(postContent));
        $http.post(baseURL + '/api/emprunt', postContent).success(function(emprunt) {
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
