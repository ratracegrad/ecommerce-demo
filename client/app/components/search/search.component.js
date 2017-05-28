const searchController = function($scope, databaseService, $location) {
  $scope.queryString = $location.search().query;

  loadSearchItems();

  function loadSearchItems() {
    databaseService.findSearchItems($scope.queryString)
      .then((items) => {
        $scope.items = items;
      })
  }
};

angular.module('myApp')
  .component('mySearch', {
    controller: searchController,
    templateUrl: 'app/components/search/search.html'
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        component: 'mySearch'
      })
  });