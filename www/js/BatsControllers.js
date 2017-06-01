angular.module('batscontrollers', [
  'login', 'start', 'livetracking',
  'forgotpassword', 'changepassword', 'managetracker',
  'signupstep1', 'signupstep2', 'updatemarkerdetails',
  'replayroute', 'eventhistory', 'vehiclestatistics',
  'eventhistorydetail', 'vehiclestatisticsdetail', 'navigation',
  'livetrackingdetails', 'report', 'addmember',
  'managemember', 'livetrackingdevices', 'eventhistoryfilter',
  'replayroutedetail', 'notification',
  'ion-datetime-picker', 'ion-place-tools', 'ionic-toast', 'geofence',
  'underscore', 'ngLoadingSpinner', 'gm', 'angular-svg-round-progressbar', 'ngCordova', 'notificationbell'
])

  .controller('BatsCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $state, PageConfig, Constants, $cordovaNetwork,
    $ionicPopup, $interval, BatsServices, ionicToast, UtilsFactory, $cordovaLocalNotification, $ionicPlatform, $cordovaSQLite) {

    $scope.openSetting = false;
    $scope.openSettingBar = function () {
      $scope.openSetting = !$scope.openSetting;
    }

    $scope.menuLink = 1;
    $scope.sidebarLinkColor = function (selectedMenuPageNumber) {
      $scope.menuLink = selectedMenuPageNumber;
    }
    var notificationCall;
    /*........................... App Initialization Ends ...........................*/

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

    function deleteDatabase() {
      var token = localStorage.getItem("token");
      var query = "DELETE FROM Token WHERE token = (?)";
      $cordovaSQLite.execute(db, query, [token]).then(function (res) {
        //alert("Token Deleted");
      }, function (err) {
       // alert(err);
      });

      var query_eventdelete = "DELETE FROM Notification";
      $cordovaSQLite.execute(db, query_eventdelete, []).then(function (res) {
        //alert("notifi Deleted");
      }, function (err) {
       // alert(err);
      });
    }

    function removeLogin() {
      BatsServices.logout({}).success(function (response) {
        deleteDatabase();
        cordova.plugins.notification.local.cancelAll(function () {
          //alert("done");
        }, this);
        $rootScope.interlogout();
      }).error(function (error) {
        ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
      })
    }

    $scope.$on('onReminderAdded', function (event, id, state, json) {
      // console.log('notification ADDED, id: ' + id + ' state:' + state + ' json:' + json);
    });

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

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        var alertPopup = $ionicPopup.alert({
            title: 'No Internet Connection',
            template: '<div class="pwdSuccessPopup">Sorry, no Internet connectivity detected. Please reconnect and try again.</div>'
        });
    })
})