const cartController = function($scope, $stateParams, databaseService) {
  $scope.guid = databaseService.loadGuid();

  getCartContents($scope.guid);

  function getCartContents(userId) {
    databaseService.getCart(userId)
      .then((data) => {
        $scope.cart = data;
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
