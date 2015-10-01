var services = angular.module('CovalentFitness.services', [])

services.factory('Auth', function($http, $location, $window) {

  var signup = function(user) {
    return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then(function(resp) {
        //Are we also using tokens?
        // return resp.data.token;
      });
  };

  var login = function(user) {
    return $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .then(function(resp) {
        // return resp.data.token;
      });
  };

  var logout = function() {
    return $http({
        method: 'POST',
        url: '/api/users/logout',
      })
      .then(function(resp) {
        // return resp.data.token;
      });
  };

  return {
    signup: signup,
    login: login,
    logout: logout
  };
})

//NOTE: I HAVENT PUT ROUTES TO SERVER IN YET, 

.factory('WorkoutServices', function($http, $location, $window) {
  //wsi = workoutServicesInstance
  var wsi = {};

  wsi.selectedWorkout = {
    id: null
  };

  wsi.setWorkout = function(wrktID) {
    wsi.selectedWorkout.id = wrktID;
  };

  wsi.getAllWorkouts = function() {
    return $http({
      method: 'GET',
      url: '/api/workouts/:' //I looked and can't find userid in the front end.  We can fix this later though.
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.getSpecificWorkout = function() {
    return $http({
      method: 'GET',
      url: '/api/moves:' + wsi.selectedWorkout.id,
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.addMoveToWorkout = function(moveInfoObj) {
    return $http({
      method: 'PUT', // need a backend route for put
      url: '/api/moves/',
      data: moveInfoObj
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.editMoveInWorkout = function(oldMoveInfoObj, newMoveInfoObj) {
    return $http({
      method: 'POST', // need a backend route for put
      url: '/api/moves/',
      data: {
        oldMoveInfoObj: oldMoveInfoObj,
        newMoveInfoObj: newMoveInfoObj
      }
    }).then(function(resp) {
      return resp.data;
    });
  };

  wsi.deleteMoveFromWorkout = function(moveInfoObj) {
    return $http({
      method: 'DELETE', // need a backend route for delete
      url: '/api/moves/',
      data: moveInfoObj //specified workoutid, name, weight, rep, set
    }).then(function(resp) {
      return resp.data;
    });
  };

  return wsi;
});
