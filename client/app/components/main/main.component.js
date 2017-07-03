const mainController = function($scope, databaseService, $location) {
    const params = $location.search();
    $scope.categories = [];
    $scope.items = [];
    $scope.currentPage = 0;
    $scope.currentCategory = params.category || 'All';
    $scope.itemsPerPage = 5;
    $scope.numItems = 0;
    $scope.numPages = 1;


    /* must have list to get started */
    loadCategories();
    loadItems();
    loadNumItems();
    saveGuid();

    function loadCategories() {
        databaseService.getFromDatabase('/api/categories')
            .then((categories) => {
                $scope.categories = categories;
            });
    }

    function loadItems() {
        databaseService.getFromDatabase(`/api/getitems?category=${$scope.currentCategory}&&page=${$scope.currentPage}&&limit=${$scope.itemsPerPage}`)
            .then((items) => {
                $scope.items = items;
            });
    }

    function loadNumItems() {
        databaseService.getFromDatabase(`/api/getnumitems?currentCategory=${$scope.currentCategory}`)
            .then((numItems) => {
                $scope.numItems = numItems.count;
                $scope.numPages = Math.ceil(Number($scope.numItems / $scope.itemsPerPage));
            });
    }

    function saveGuid() {
        databaseService.guidHandler('save');
    }

    $scope.getPage = (n) => {
        $scope.currentPage = n - 1;
        loadItems();
    };

    $scope.range = function() {
        const arr = [];
        for (let i = 1; i <= $scope.numPages; i++) {
            arr.push(i);
        }
        return arr;
    };

    $scope.changeCategory = function(newCategory) {
        $scope.currentCategory = newCategory;
        loadItems();
        loadNumItems();
    };

};

angular.module('myApp')
    .component('myMain', {
        controller: mainController,
        templateUrl: 'app/components/main/main.html'
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                component: 'myMain'
            });
    });
