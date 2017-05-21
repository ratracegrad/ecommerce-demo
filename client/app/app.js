angular.module('app', [])
  .controller('mainController', ['$scope', 'databaseService', function($scope, databaseService) {
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
    }

    $scope.range = function() {
      const arr = [];
      for (let i = 1; i <= $scope.numPages; i++) {
        arr.push(i);
      }
      return arr;
    }

  }])
  .service('databaseService', ["$http", "$q", function($http, $q) {
    return({
      getCategories: getCategories,
      getItems: getItems,
      getNumItems: getNumItems
    });

    function getCategories() {
      const request = $http({
        method: "get",
        url: "/api/categories"
      });

      return (request.then(handleSuccess, handleError));
    }

    function getItems(currentCategory, page, itemsPerPage) {
      const request = $http({
        method: "get",
        url: `/api/getitems?category=${currentCategory}&&page=${page}&&limit=${itemsPerPage}`
      });

      return (request.then(handleSuccess, handleError));
    }

    function getNumItems(currentCategory) {
      const request = $http({
        method: "get",
        url: `/api/getnumitems?currentCategory=${currentCategory}`
      });

      return (request.then(handleSuccess, handleError));
    }

    /* send failure message back to application */
    function handleError( response ) {
      // The API response from the server should be returned in a
      // normalized format. However, if the request was not handled by the
      // server (or what not handles properly - ex. server error), then we
      // may have to normalize it on our end, as best we can.
      if (
        ! angular.isObject( response.data ) ||
        ! response.data.message
      ) {
        return( $q.reject( "An unknown error occurred." ) );
      }
      // Otherwise, use expected error message.
      return( $q.reject( response.data.message ) );
    }

    /* $http call successful so unwrap application data from API response payload */
    function handleSuccess( response ) {
      return( response.data );
    }

  }]);