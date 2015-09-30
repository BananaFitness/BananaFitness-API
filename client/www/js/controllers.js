angular.module('ionfit.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('SignupCtrl', function($scope, Auth) {

  $scope.signupData = {};

  $scope.doSignup = function() {
    Auth.signup($scope.signupData)
      .then(function () {
        $location.path('/home');
      })
      .catch(function (error) {
        console.error(error);
      });    
  };
})

.controller('LoginCtrl', function($scope, Auth) {

  // Form data for the login
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    Auth.login($scope.loginData)
      .then(function () {
        $location.path('/home');
      })
      .catch(function (error) {
        console.error(error);
      });     
    
  };
})

.controller('LogoutCtrl', function($scope, Auth) {

  $ionicModal.fromTemplateUrl('views/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.doLogout = function() {
    Auth.logout()    
  };
})

.controller('WorkoutsCtrl', function($scope, ExService) {
  // will be for workout list and indv workout views
  // hard coding a few workouts for example
  $scope.workoutList = [{name: 'lower body'}, {name: 'arms'}, {name: 'chest/shoulder'}];
  $scope.workout = [];

  //functions for loading workouts/workout ==========

  $scope.loadWorkoutList = function(){
    //build out service to get workouts from server
  ExService.workoutGetter().then(function(data){
    $scope.workoutList = data;
    console.log($scope.workoutList);
    });
  };

  $scope.loadWorkout = function(){
    // loads workout by id on click in workout view
    //build service to get all moves for specific workout from server
  };

  $scope.loadWorkoutList();

  //functions for workout sharing =========

  $scope.share = function(workout) {
    //still need to write this
  };

  $scope.use = function() {

  };

  //functions for workout edits/adds ==========
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
});
