const itemController = function($scope, $stateParams, databaseService) {
  $scope.itemId =  Number($stateParams.itemId);
  $scope.item = {};
  $scope.stars = 0;
  $scope.numReviews = 0;
  $scope.reviews = [];
  $scope.relatedItems = [];

  loadItem();
  loadRelatedItems();

  function loadRelatedItems() {
    databaseService.getRelatedItems()
      .then((items) => {
        $scope.relatedItems = items;
      })
  }

  function loadItem() {
    databaseService.getItem($scope.itemId)
      .then((item) => {
        $scope.item = item;

        if ("reviews" in item) {
          $scope.numReviews = item.reviews.length;

          let stars = 0;
          for (let i = 0; i < $scope.numReviews; i++) {
            const review = item.reviews[i];
             stars += review.stars;
          }

          if ($scope.numReviews > 0) {
            $scope.stars = stars / $scope.numReviews;
            $scope.reviews = item.reviews;
          }
        }
      })
  }

  $scope.getNumStars = function(num) {
    return $scope.stars > num ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty';
  }
};

angular.module('myApp')
  .component('myItem', {
   controller: itemController,
   templateUrl: "app/components/item/item.html"
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item/{itemId}',
        component: 'myItem'
      })
  });
