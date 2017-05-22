const itemController = function($scope, $stateParams, databaseService) {

  $scope.itemId =  $stateParams.itemId;

};

angular.module('myApp')
  .component('myItem', {
   controller: itemController,
   templateUrl: "app/components/item/item.html"

  })
  .config(function($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item/{{itemId}}',
        component: 'myItem'
      })
  })
