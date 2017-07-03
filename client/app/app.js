const databaseService = function($http, $q) {
  return({
    getFromDatabase: getFromDatabase,
    postToDatabase: postToDatabase,
    guidHandler: guidHandler
  });

  /* this function is used to get data from mongodb database */
  function getFromDatabase(url) {
    const request = $http({
      method: 'get',
      url: url
    });

    return (request.then(_handleSuccess, _handleError));
  }

  /* this function is used to add data to mongodb database  */
  function postToDatabase(url, data) {
    const request = $http({
      method: 'post',
      url: url,
      data: data
    })  ;

    return (request.then(_handleSuccess, _handleError));
  }

  /* this function handles creating, saving or retrieving guid */
  function guidHandler(action) {
    switch (action) {
      case 'create':
        return _createGuid();
        break;
      case 'load':
        return localStorage.getItem('ecommerceDemo');
        break;
      case 'save':
        if (localStorage.getItem('ecommerceDemo') === null) {
          localStorage.setItem('ecommerceDemo', _createGuid() );
        }
        break;
    }
  }

  /* -------------------------------
   * Helper private methods below
   * -------------------------------*/
  function _s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  function _createGuid() {
      return (_s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' +
      _s4() + '-' + _s4() + _s4() + _s4()).toString();
  }

  function _handleError( response ) {
    // The API response from the server should be returned in a
    // normalized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (!angular.isObject( response.data ) || !response.data.message ) {
      return( $q.reject( "An unknown error occurred." ) );
    }
    // Otherwise, use expected error message.
    return( $q.reject( response.data.message ) );
  }

  function _handleSuccess( response ) {
    return( response.data );
  }
};

angular.module('myApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  })
  .service('databaseService', databaseService);


 
