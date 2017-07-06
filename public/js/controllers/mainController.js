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
    console.log(this.name);
    console.log(this.style);
    console.log(this.abv);
    console.log(this.image);
    if (typeof (this.name) != 'string' || typeof (this.style) != 'string' ||
      typeof (this.abv) != 'string' || typeof (this.image) != 'string') {
      alert('not valid inputs');
      return;
    }
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
    // beerFactory.removeBeer(this.beer._id)
    //   .then(function (data) {
    //     for (var i = 0; i < $scope.beers.length; i++) {
    //       if (data._id === $scope.beers[i]._id) {
    //         $scope.beers.splice(i, 1);
    //         break;
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   });
  }
  $scope.attrs = [{
      attr: 'read-only',
      value: 'true'
    }
  ];
  $scope.dis = true;
  $scope.rateBeer = function (event) {
    console.log(parent.rating);
    console.log(angular.element(event.target).parent().parent().parent()[0]);
    // stars.getAttributeNode('disabled').value = "true";
    console.log(this.beer._id);
    // debugger;
  }

  $scope.avarageRating = function (beer) {
    if (!beer.ratings.length) {
      return 0;
    }
    var avarage = 0;
    for (var i = 0; i < beer.ratings.length; i++) {
      avarage += beer.ratings[i];
    }
    avarage /= beer.ratings.length;
    return avarage.toFixed(1);
  }

  $scope.doStuff = function (item) {
    debugger;
    console.log(angular.element(item).parent().parent());
  };


})