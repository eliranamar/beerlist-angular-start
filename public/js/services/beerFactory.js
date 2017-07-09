app.factory('beerFactory', function ($http) {

  // var beers = [];

  //fetching the beers from DB
  var getBeersFromDB = function () {
    return $http.get('/beers')
      .then(function (response) {
        return angular.copy(response.data);
      });
  }

  // fetching a single beer by id
  var getBeerFromDBById = function (_id) {
    return $http.get('/beers/' + _id)
      .then(function (response) {
        return angular.copy(response.data);
      });
  }



  //adding a beer to DB
  var addBeer = function (newBeer) {
    console.log(newBeer);
    return $http.post('/beers', newBeer)
      .then(function (response) {
        return angular.copy(response.data);
      })
  }

  //removig a beer from DB
  var removeBeer = function (_id) {
    console.log(_id);
    return $http.delete('/beers/' + _id)
      .then(function (response) {
        return angular.copy(response.data);
      })
  }

  var rateBeer = function (beer) {
    console.log(beer);
    return $http.post('/beers/' + beer._id + '/ratings', beer)
      .then(function (response) {
        return angular.copy(response.data);
      })
  }


  var updateBeer = function (beer) {
    // console.log(beer);
    return $http.put('/beers/' + beer._id, beer)
      .then(function (response) {
        return response.data
      });
  }

  var addReview = function (review) {
    return $http.post('/beers/' + review.beer_id + '/reviews', review)
      .then(function (response) {
        return response.data
      });
  }

  var deleteReview = function (review) {
    return $http.delete('/beers/' + review.beer_id +
        '/reviews/' + review.review_id, review)
      .then(function (response) {
        return response.data
      });
  }

  //return all the properties
  return {
    getBeersFromDB: getBeersFromDB,
    addBeer: addBeer,
    removeBeer: removeBeer,
    rateBeer: rateBeer,
    updateBeer: updateBeer,
    getBeerFromDBById: getBeerFromDBById,
    addReview: addReview,
    deleteReview: deleteReview
  }
})