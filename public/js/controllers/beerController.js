app.controller('beerCtrl', function ($scope, $stateParams, beerFactory) {
  $scope.beer = $stateParams.beerParam;
  $scope.id = $stateParams.id;

  $scope.getBeerFromDBById = function () {
    if (!$stateParams.beerParam) {
      beerFactory.getBeerFromDBById($stateParams.id)
        .then(function (beer) {
          $scope.beer = beer;
        })
    } else {
      $scope.beer = $stateParams.beerParam;
    }
  }

  $scope.addReview = function () {
    var review = {
      name: $scope.name,
      text: $scope.text,
      beer_id: this.beer._id
    }
    beerFactory.addReview(review)
      .then(function (beer) {
        $scope.beer = beer;
      })
      .catch(function (err) {
        //if something has gone wrong then alert the user
        alert(err.data.message);
      });
    $scope.name = null;
    $scope.text = null;
  }

  $scope.deleteReview = function () {
    console.log(this.review._id);
    console.log(this.$parent.id);
    var reviewToDelete = {
      beer_id: this.$parent.id,
      review_id: this.review._id
    }
    // debugger
    beerFactory.deleteReview(reviewToDelete)
      .then(function (beer) {
        $scope.beer = beer;
      })
      .catch(function (err) {
        //if something has gone wrong then alert the user
        alert(err.data.message);
      });
  }

  $scope.getBeerFromDBById();
});