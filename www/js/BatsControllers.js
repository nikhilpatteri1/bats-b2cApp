angular.module('batscontrollers', [
  'login', 'start', 'livetracking',
  'forgotpassword', 'changepassword', 'managetracker',
  'signupstep1', 'signupstep2', 'updatemarkerdetails',
  'replayroute', 'eventhistory', 'vehiclestatistics',
  'eventhistorydetail', 'vehiclestatisticsdetail', 'navigation',
  'livetrackingdetails', 'report', 'addmember',
  'managemember', 'livetrackingdevices', 'eventhistoryfilter',
  'replayroutedetail', 'notification',
  'ion-datetime-picker', 'ion-place-tools', 'ionic-toast',
  'underscore', 'ngLoadingSpinner', 'gm'
])

  .controller('BatsCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $state, PageConfig, Constants,
    $ionicPopup, $interval, BatsServices, ionicToast, UtilsFactory) {

    $scope.openSetting = false;
    $scope.openSettingBar = function () {
      $scope.openSetting = !$scope.openSetting;
    }

    $scope.menuLink = 1;
    $scope.sidebarLinkColor = function (selectedMenuPageNumber) {
      $scope.menuLink = selectedMenuPageNumber;
    }
    var notificationCall;
    $rootScope.callNotification = function () {
     notificationCall =  $interval(callNotificationinterval,20000);
    }

    if(notificationCall==undefined){
      $rootScope.callNotification();
    }

    function callNotificationinterval (){
      console.log(localStorage.getItem(Constants.accessToken));
      if(localStorage.getItem(Constants.accessToken)!=null){
        BatsServices.notification({}).success(function (response) {
          $scope.notificationData = response;
          UtilsFactory.setNotificationDetails(response);
        }).error(function (error) {
          console.log(error.err);
        })
      }
      else{
        $interval.cancel(notificationCall);
      }
    }


    $rootScope.interlogout = function () {
      if (localStorage.getItem(Constants.USER_VO)) {
        localStorage.removeItem(Constants.USER_VO);
      }
      if (localStorage.getItem(Constants.accessToken)) {
        localStorage.removeItem(Constants.accessToken);
      }
      if (localStorage.getItem("choice")) {
        localStorage.removeItem("choice");
      }

      if (localStorage.getItem(Constants.ACCESS_TYPE)) {
        localStorage.removeItem(Constants.ACCESS_TYPE)
      }
      $scope.menuLink = 1;
      $state.go(PageConfig.LOGIN);
    }

    function removeLogin() {
      BatsServices.logout({}).success(function (response) {
        $rootScope.interlogout();
      }).error(function (error) {
        ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
      })

    }

    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Logout',
        template: 'Are you sure you want to log out from Bats?',
        cancelText: 'No',
        scope: $scope,
        okText: 'Yes',
      });
      confirmPopup.then(function (res) {
        if (res) {
          removeLogin();
        }
      });
    }
  })
