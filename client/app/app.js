angular.module('app', [])
  .controller('mainController', ['$scope', 'databaseService', function($scope, databaseService) {
    $scope.categories = [];

    /* must have list to get started */
    loadCategories();

    function loadCategories() {
      databaseService.getCategories()
        .then((categories) => {
          $scope.categories = categories;
        })
    }

  }])
  .service('databaseService', function($http, $q) {
    return({
      getCategories: getCategories
    });

    function getCategories() {
      const request = $http({
        method: "get",
        url: "/api/categories"
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

  });