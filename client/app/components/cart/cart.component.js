const cartController = function($scope, $stateParams, databaseService) {
  $scope.guid = databaseService.loadGuid();

  $scope.addToCart = function(itemId) {
    databaseService.addToCart(itemId)
      .then((data) => {

      })
  }

};

angular.module('myApp')
  .component('myCart', {
    controller: cartController,
    templateUrl: "app/components/cart/cart.html"
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('cart', {
        url: '/cart',
        component: 'myCart'
      })
  });
