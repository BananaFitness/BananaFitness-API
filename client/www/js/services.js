var services = angular.module('CovalentFitness.services', [])

services.factory('Auth', function ($http, $location, $window) {

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      //Are we also using tokens?
      // return resp.data.token;
    });
  };

  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (resp) {
      // return resp.data.token;
    });
  };

  var logout = function () {
    return $http({
      method: 'POST',
      url: '/api/users/logout',
    })
    .then(function (resp) {
      // return resp.data.token;
    });
  };

  return {
    signup: signup,
    login: login,
    logout: logout
  };
}
