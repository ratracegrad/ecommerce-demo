const databaseService = function($http, $q) {
  return({
    getCategories: getCategories,
    getItems: getItems,
    getNumItems: getNumItems,
    getItem: getItem,
    getRelatedItems: getRelatedItems,
    addReview: addReview,
    loadGuid: loadGuid,
    saveGuid: saveGuid,
    addToCart: addToCart
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

  function addReview(id, review) {
    const request = $http({
      method: 'post',
      url: `/api/addreview/${id}`,
      data: review
    });

    return (request.then(handleSuccess, handleError));
  }

  function addToCart(itemId, userId) {
    const request = $http({
      method: 'post',
      url: `/api/addtocart/${itemId}/${userId}`
    });

    return (request.then(handleSuccess, handleError));
  }

  function createGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4()).toString();
  }

  function loadGuid() {
    return localStorage.getItem('ecommerceDemo')
  }

  function saveGuid() {
    if (localStorage.getItem('ecommerceDemo') === null) {
      localStorage.setItem('ecommerceDemo', createGuid() );
    }
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
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  })
  .service('databaseService', databaseService)


 
