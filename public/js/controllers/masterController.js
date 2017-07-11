app.controller('masterController', function ($scope, authFactory) {
  $scope.currentUser = authFactory.currentUser;

  $scope.logout = function () {
    authFactory.logout($scope.user)
      .then(function () {
        $state.go('home');
        authFactory.getCurrentUser();
      }, function (err) {
        alert(err.data);
      });
  }

  authFactory.getCurrentUser();
});