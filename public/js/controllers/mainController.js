app.controller('mainCtrl', function ($scope, beerFactory) {

  $scope.beers = [];

  beerFactory.getBeersFromDB()
    .then(function (beers) {
      $scope.beers = beers;
      console.log($scope.beers);
    })
    .catch(function (error) {
      console.log(error)
    });

  $scope.addBeer = function () {
    var newBeer = {
      name: this.name,
      style: this.style,
      image_url: this.image,
      abv: this.abv,
      ratings: []
    };
    // $scope.beers.push(newBeer);
    console.log($scope.beers);
    beerFactory.addBeer(newBeer)
      .then(function (beerFromServer) {
        $scope.beers.push(beerFromServer);
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  $scope.removeBeer = function () {
    console.log($scope.beers);
    console.log(this.beer);
    beerFactory.removeBeer(this.beer._id)
      .then(function (data) {
        for (var i = 0; i < $scope.beers.length; i++) {
          if (data._id === $scope.beers[i]._id) {
            $scope.beers.splice(i, 1);
            break;
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }



})