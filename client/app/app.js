const databaseService = function($http, $q) {
  return({
    getCategories: getCategories,
    getItems: getItems,
    getNumItems: getNumItems,
    getItem: getItem,
    getRelatedItems: getRelatedItems
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

  function getItem(itemId) {
    const request = $http({
      method: "get",
      url: `/api/getitem/${itemId}`
    });

    return (request.then(handleSuccess, handleError));
  }

  function getRelatedItems() {
    const request = $http({
      method: 'get',
      url: '/api/getrelateditems'
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
}

angular.module('myApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  })
  .service('databaseService', databaseService)


 
