angular.module('CovalentFitness.controllers', [])

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
      .then(function() {
        $location.path('/home');
      })
      .catch(function(error) {
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
      .then(function() {
        $location.path('/home');
      })
      .catch(function(error) {
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
    Auth.logout();
  };
})

.controller('WorkoutsCtrl', function($scope, $location, WorkoutServices) {
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;

  $scope.workoutList = [];

  //functions for Workouts Controller ==========

  $scope.loadWorkoutList = function() {
    WorkoutServices.getAllWorkouts()
      .then(function(allWorkouts) {
        $scope.workoutList = allWorkouts;
      });
  };

  $scope.selectWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt)
      .then($location.path('/app/workout'));
  };

  $scope.addWorkout = function() {
    WorkoutServices.setWorkout(null)
      .then($location.path('/app/add_edit_workout'));
  };

  // $scope.shareWorkout = function() {
  //   //not sure if we want to do this yet.
  // };

  $scope.editWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt)
      .then($location.path('/app/add_edit_workout'));
  };

  $scope.loadWorkoutList();

})

.controller('WorkoutCtrl', function($scope, $location, WorkoutServices) {

  $scope.workout = null;

  //functions for Workout Controller ==========

  $scope.loadWorkout = function() {
    WorkoutServices.getSpecificWorkout()
      .then(function(specWorkout) {
        $scope.workout = specWorkout;
      });
  };

  $scope.editWorkout = function(wrkt) {
    WorkoutServices.setWorkout(wrkt)
      .then($location.path('/app/add_edit_workout'));
  };

  //nav ==========

  $scope.goBack = function() {
    WorkoutServices.setWorkout(null)
      .then($location.path('/app/workouts'));
  };

  $scope.loadWorkout();

})

.controller('WorkoutEditsCtrl', function($scope, $location, $ionicModal, WorkoutServices) {

  // button func ==========
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  //*****NOTE the modal is unfinished*****

  // modal for collection edit info ==========
  $ionicModal.fromTemplateUrl('../views/workoutEditsModal.html', {
    scope: $scope,
    animation: 'slide-in-up' // I am having trouble finding an alternate animation. 
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();

  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  //workoutedits controller vars and functions ==========
  $scope.currentWorkout = null;

  $scope.goBack = function() {
    WorkoutServices.setWorkout(null)
      .then($location.path('/app/workouts'));
  };

  //right now edits send to server each time, maybe we can accumulate these here and send to server on 'save' or 'exit'.  We should talk about which we want.

  $scope.adEx = function() {
    //getting this figured out with modal *****
  };

  $scope.editEx = function() {
    //getting this figured out with modal *****
  };

  $scope.deleteEx = function(move) {
    WorkoutServices.deleteMoveFromWorkout(move)
      .then($scope.loadCurrentWorkout());
  };

  $scope.loadCurrentWorkout = function() {
    WorkoutServices.getSpecificWorkout()
      .then(function(specWorkout) {
        $scope.currentWorkout = specWorkout;
      });
  };

  //need to if check current WO (blank or current) and set initial state
  if (WorkoutServices.selectedWorkout.id === null) {
    $scope.currentWorkout = {};
  } else {
    $scope.loacCurrentWorkout();
  }
});
