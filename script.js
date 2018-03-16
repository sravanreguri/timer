// Code goes here

var app = angular.module('App', []);


app.controller('MainCtrl', function($scope, $interval) {

  $scope.name = 'task1';
  $scope.breaktime = 300;
  $scope.bseconds = Math.floor($scope.breaktime % 60);
  $scope.bminutes = Math.floor($scope.breaktime / 60);
  $scope.Message = "Timer";
  $scope.bMessage = "Break";
  $scope.alert = "";
  $scope.balert = "";
  $scope.countdown = 1500;

  $scope.seconds = Math.floor($scope.countdown % 60);
  $scope.minutes = Math.floor($scope.countdown / 60);

  $scope.start = function() {

    $scope.Message = "Timer started. ";
    $scope.Timer = $interval(function() {

      $scope.seconds = Math.floor($scope.countdown % 60);
      $scope.minutes = Math.floor($scope.countdown / 60);

      $scope.countdown--;
      if ($scope.countdown < 300) {
        $scope.alert = "Time is running out... " + $scope.minutes + ":" + $scope.seconds;
      }

    }, 1000);
  };



  $scope.breaking = function() {

    if (angular.isDefined($scope.Timer)) {
      $interval.cancel($scope.Timer);
    }

    //Set the Timer start message.
    $scope.Message = "Break started. ";

    $scope.breakTimer = $interval(function() {

      $scope.bMessage = "Break started. ";
      $scope.Message = "Timer paused. ";

      $scope.bseconds = Math.floor($scope.breaktime % 60);
      $scope.bminutes = Math.floor($scope.breaktime / 60);

      $scope.breaktime--;

      if ($scope.breaktime < 60) {
        $scope.balert = "Time is running out... " +  $scope.bminutes + ":" +$scope.bseconds;
      }


      if ($scope.breaktime < 0) {

        $scope.start();
        if (angular.isDefined($scope.breakTimer)) {
          $scope.bMessage = "Break ";
          $interval.cancel($scope.breakTimer);
        }
        $scope.breaktime = 5;

      }

    }, 1000);
  };

  $scope.resume = function() {
    $scope.Message = "Timer ";
    $scope.bMessage = "Break ";
    $scope.balert = "";
    $scope.alert = "";
    $scope.breaktime = 300;
    if (angular.isDefined($scope.breakTimer)) {
      $interval.cancel($scope.breakTimer);
    }

    $scope.start();
  };


  $scope.stop = function() {
    $scope.Message = "Timer stopped. ";
    $scope.bMessage = "Break stopped. ";
    $scope.balert = "";
    $scope.alert = "";
    $scope.countdown = 1500;
    $scope.breaktime = 300;
    $scope.seconds = Math.floor($scope.countdown % 60);
    $scope.minutes = Math.floor($scope.countdown / 60);
    $scope.bseconds = Math.floor($scope.breaktime % 60);
    $scope.bminutes = Math.floor($scope.breaktime / 60);
    if (angular.isDefined($scope.Timer)) {
      $interval.cancel($scope.Timer);
    }
    if (angular.isDefined($scope.breakTimer)) {
      $interval.cancel($scope.breakTimer);
    }
  };


  $scope.list = [];

  $scope.list.push("task-1");
  $scope.list.push("task-2");
  $scope.list.push("task-3");

  $scope.addItem = function() {
    $scope.list.push($scope.value);
    $scope.value = "";
  }

  $scope.removeItem = function(x) {

    var index = $scope.list.indexOf(x);

    if (index > -1) {
      $scope.list.splice(index, 1);
    }
  }

});;