const itemController = function($scope, $stateParams, databaseService, $location) {
    $scope.itemId =  Number($stateParams.itemId);
    $scope.item = {};
    $scope.stars = 0;
    $scope.numReviews = 0;
    $scope.reviews = [];
    $scope.relatedItems = [];
    $scope.review = {};

    loadItem();
    loadRelatedItems();

    function loadRelatedItems() {
        databaseService.getFromDatabase('/api/getrelateditems')
            .then((items) => {
                $scope.relatedItems = items;
            });
    }

    function loadItem() {
        databaseService.getFromDatabase(`/api/getitem/${$scope.itemId}`)
            .then((item) => {
                $scope.item = item;

                if ('reviews' in item) {
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
            });
    }

    $scope.getNumStars = function(num) {
        return $scope.stars > num ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty';
    };

    $scope.submitReview = function(id, review) {
        $scope.review = angular.copy(review);
        databaseService.postToDatabase(`/api/addreview/${id}`, review)
            .then(() => {
                $scope.review = {}; // reset to clear out current values
                loadItem();
                loadRelatedItems();
            })
            .catch(() => {
                $scope.review = {}; // reset to clear out current values
                loadItem();
                loadRelatedItems();
            });

    };

    $scope.addToCart = function(itemId) {
        const userId = databaseService.guidHandler('load');

        databaseService.postToDatabase(`/api/addtocart/${itemId}/${userId}`)
            .then(() => {
                $location.path('/cart');
            });

    };

};

angular.module('myApp')
    .component('myItem', {
        controller: itemController,
        templateUrl: 'app/components/item/item.html'
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('item', {
                url: '/item/{itemId}',
                component: 'myItem'
            });
    });
