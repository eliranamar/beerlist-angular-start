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
      ratings: [],
      avarage: 0
    };

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

  // rate the beer and send it to server
  $scope.rateBeer = function (event) {
    var index = this.$index;
    var beer = {
      _id: this.beer._id,
      ratings: event.rating
    }
    this.beer.ratings = event.rating;
    // console.log(angular.element(document).find('star-rating-comp')[index]);
    // angular.element(document).find('star-rating-comp')[index]
    var myEl = angular.element(document.querySelectorAll('star-rating-comp')[index]);
    var parentEl = myEl.parent();
    // parentEl.attr('ng-disabled', 'true');
    // parentEl.attr("ng-", "width:100px;height:49.55px;");
    // parentEl.empty();
    // console.log(myEl.children().children()[1]);
    // myEl.children().children()[1].setAttribute('ng-hide', 'true');
    // beerFactory.rateBeer(beer)
    //   .then(function (beerFromServer) {
    //     console.log(angular.element(event.target).parent().parent().parent()[0]);
    //     $scope.beers[index] = beerFromServer;
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   });
  }

  // calc the avrg rating per beer
  $scope.avarageRating = function (beer) {
    if (!beer.ratings.length) {
      return 0;
    }
    var avarage = 0;
    for (var i = 0; i < beer.ratings.length; i++) {
      avarage += beer.ratings[i];
    }
    avarage /= beer.ratings.length;
    beer.avarage = avarage;
    return beer.avarage.toFixed(1);
  }

  var flag = false;
  // Sort Beers By Rating
  $scope.sortBeers = function () {
    $scope.beers.sort(dynamicSort('avarage', flag));
    flag = !flag;
  }

  var dynamicSort = function (prop, flag) {
    return function (a, b) {
      if (flag) {
        return (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
      } else {
        return (a[prop] > b[prop]) ? -1 : (a[prop] < b[prop]) ? 1 : 0;
      }
    };
  }


})