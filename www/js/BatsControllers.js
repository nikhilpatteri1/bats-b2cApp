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

  .controller('BatsCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $state, PageConfig, Constants,
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
    // $rootScope.callNotification = function () {
    //   notificationCall = $interval(callNotificationinterval, 20000);
    // }

    // if (notificationCall == undefined) {
    //   $rootScope.callNotification();
    // }
    // document.addEventListener("deviceready", onDeviceReady, false);
    // function onDeviceReady() {
    //   console.log("result = INSIDE CONTROLLER FOR NOTIFICATION ");
    //   dbOperation(function () {
    //             //setTimeout(function () { callForToken(); }, 5 * 1000);
    //   });
    // }

    //App Initialization Ends........................................................

    //DB Operation Starts............................................................

    // function dbOperation(cb) {
    // 	console.log("==========================>>>>>>>>>>>>>>> DB Operation <<<<<<<<<<<<<<================================================");
    // 	db = $cordovaSQLite.openDB({name:"BATS.db",iosDatabaseLocation:'default'});
    //   //  $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Device_IMEI (imei varchar)");
    //     $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Token (token varchar)");
    //   		cb();
    // }

    // function callNotificationinterval() {
    //   //  console.log(localStorage.getItem(Constants.accessToken));
    //   if (localStorage.getItem(Constants.accessToken) != null) {
    //     BatsServices.notification({}).success(function (response) {
    //       $scope.notificationData = response;
    //       $scope.count = $scope.notificationData.length;
    //       if ($scope.count == undefined || $scope.count == []) {
    //         $scope.count = 0
    //       }
    //       // console.log($rootScope.count);
    //       UtilsFactory.setNotificationDetails(response);
    //       UtilsFactory.setNotificationCount($scope.count);
    //       if (response[0].data != 'Notification not found') {
    //         sendNotification(response[0]);
    //       }
    //       // $ionicPlatform.ready(function () {
    //       // function sendNotification(){
    //       //     var alarmTime = new Date();
    //       //     alarmTime.setMinutes(alarmTime.getMinutes() + 1);
    //       //     $cordovaLocalNotification.schedule({
    //       //         id: 1,
    //       //         title: 'Warning',
    //       //         text: 'Hello new notification!',
    //       //         every: 'minute'
    //       //     }).then(function (result) {
    //       //         console.log('Notification 1 triggered');
    //       //     });
    //       // };
    //       // });
    //       //  console.log("count in ctrl " + $scope.count);

    //       //broadcasting notification count
    //       $rootScope.$broadcast('counted', UtilsFactory.getNotificationCount());

    //       //function to store notification count
    //       $rootScope.$on('counted', function (event, obj) {
    //         // console.log("\n obj: " + (obj) + " event: " + (event));
    //         $rootScope.count = obj;
    //       });
    //       // window.location.reload();
    //       //  $state.reload();
    //     }).error(function (error) {
    //       console.log(error.err);
    //     })
    //   }
    //   else {
    //     $interval.cancel(notificationCall);
    //   }
    // }


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
      // if (angular.isDefined($rootScope.notificationCall)) {
      //   $interval.cancel($rootScope.notificationCall);
      // }
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
      console.log('notification ADDED, id: ' + id + ' state:' + state + ' json:' + json);
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

    // function sendNotification(response) {
    //   var notify_heading;
    //   console.log("inside notification" + angular.toJson(response));
    //   if (response.alarm_type == '0') {
    //     notify_heading = 'Panic';
    //   } else if (response.alarm_type == '1') {
    //     notify_heading = 'Tamper Sim';
    //   } else if (response.alarm_type == '2') {
    //     notify_heading = 'Tamper Top';
    //   } else if (response.alarm_type == '3') {
    //     notify_heading = 'Battery';
    //   } else if (response.alarm_type == '4') {
    //     notify_heading = 'Overspeed';
    //   } else if (response.alarm_type == '5') {
    //     notify_heading = 'Geofence';
    //   } else if (response.alarm_type == '6') {
    //     notify_heading = 'Sanity alarm';
    //   } else if (response.alarm_type == '7') {
    //     notify_heading = 'CONNECTION TO TRACKER INTERRUPTED';
    //   } else if (response.alarm_type == '8') {
    //     notify_heading = 'Robbery / Theft alarm';
    //   } else if (response.alarm_type == '9') {
    //     notify_heading = 'Undefined alarm_type';
    //   }

    //   console.log("id: " + response.devid + " title: " + response.vehicle_num);

    //   $cordovaLocalNotification.schedule({
    //     id: response.devid,
    //     title: response.vehicle_num,
    //     text: notify_heading,
    //   }).then(function (result) {
    //     console.log('Notification triggered');
    //   });
    // };
  })
