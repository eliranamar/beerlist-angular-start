app.factory('beerFactory', function ($http) {

  var beers = [];

  //fetching the beers from DB
  var getBeersFromDB = function () {
    return $http.get('/beers')
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

  var rateBeer

  //return all the properties
  return {
    getBeersFromDB: getBeersFromDB,
    addBeer: addBeer,
    removeBeer: removeBeer
  }
})