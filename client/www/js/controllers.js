angular.module('starter.controllers', [])

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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
