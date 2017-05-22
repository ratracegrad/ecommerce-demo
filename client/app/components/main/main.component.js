const mainController = function($scope, databaseService) {
  $scope.categories = [];
  $scope.items = [];
  $scope.currentPage = 0;
  $scope.currentCategory = "All";
  $scope.itemsPerPage = 5;
  $scope.numItems = 0;
  $scope.numPages = 1;


  /* must have list to get started */
  loadCategories();
  loadItems();
  loadNumItems();

  function loadCategories() {
    databaseService.getCategories()
      .then((categories) => {
        $scope.categories = categories;
      })
  }

  function loadItems() {
    databaseService.getItems($scope.currentCategory, $scope.currentPage, $scope.itemsPerPage)
      .then((items) => {
        $scope.items = items;
      });
  }

  function loadNumItems() {
    databaseService.getNumItems($scope.currentCategory)
      .then((numItems) => {
        $scope.numItems = numItems.count;
        $scope.numPages = Math.ceil(Number($scope.numItems / $scope.itemsPerPage));
      })
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
  }

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
      })
  });
