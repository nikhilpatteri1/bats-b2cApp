angular.module('notification', [])
  .controller('NotificationCtrl', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $timeout, PageConfig, UtilsFactory, _,
    BatsServices, ionicToast, Constants) {

    $scope.backToHistory = function () {
      console.log(navigator)
      navigator.app.backHistory();
    }
    $scope.noData = true;
    console.log(UtilsFactory.getNotificationDetails());
    if (UtilsFactory.getNotificationDetails()) {
      console.log("notification data "+UtilsFactory.getNotificationDetails());
      $scope.notificationData = UtilsFactory.getNotificationDetails();
      $rootScope.count = UtilsFactory.getNotificationCount();
      $scope.noData = false;
      $scope.speed=$scope.notificationData.speed_limit;
      console.log($rootScope.count +" util factory  "+UtilsFactory.getNotificationCount());
      if ($rootScope.count == undefined || $rootScope.count == 0) {
        $rootScope.count = 0;
        $scope.notificationData = [];
        $scope.noData = true;
      }
      $scope.temp = 0;
      
      UtilsFactory.setNotificationCount(undefined);
      UtilsFactory.setNotificationDetails([]);
    }
 $scope.speed;
    $scope.chexkAlarmType = function (alarm_type, velocity) {
      console.log("gdgj" +$scope.speed);
      if ( $scope.speed< velocity) {
        $scope.redSpeed = 1;
        console.log("red style applying " + $scope.redSpeed);
      }
      else{
         $scope.redSpeed = 0;
      }
      // console.log("geeta its me alarm type" + alarm_type);
      if (alarm_type == 0) {
        $scope.alarmType = "Panic";
        $scope.imageSrc = 'img/eventH/panic.png';
      }
      else if (alarm_type == 1) {
        $scope.alarmType = "Tamper Sim";
        $scope.imageSrc = 'img/eventH/sim-tamper.png';
      }
      else if (alarm_type == 2) {
        $scope.alarmType = "Tamper Top";
        $scope.imageSrc = 'img/eventH/tamper-top.png';
      }
      else if (alarm_type == 3) {
        $scope.alarmType = "Battery Low";
        $scope.imageSrc = 'img/eventH/battery.png';
      }
      else if (alarm_type == 4) {
        $scope.alarmType = "Overspeed";
        $scope.imageSrc = 'img/eventH/overspeed.png';
      }
      else if (alarm_type == 5) {
        $scope.alarmType = "Geofence";
        $scope.imageSrc = 'img/eventH/geofence.png';
      }
      else if (alarm_type == 6) {
        $scope.alarmType = "Sanity alarm";
        $scope.imageSrc = 'img/eventH/sanity.png';
      }
      else if (alarm_type == 7) {
        $scope.alarmType = "CONNECTION TO TRACKER INTERRUPTED";
        $scope.imageSrc = 'img/eventH/warning.png';
      }
      else if (alarm_type == 8) {
        $scope.alarmType = "Vehicle Moved / Theft ";
        $scope.imageSrc = 'img/eventH/theft.png';
      }
      else if (alarm_type == 9) {
        $scope.alarmType = "Warning";
        $scope.imageSrc = 'img/eventH/invalid.png';
      }
     // console.log(alarm_type + $scope.alarmType);
    }



    $scope.showAlert = function (lat, long) {
      var lat = parseFloat(lat);
      var lng = parseFloat(long);
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var alertPopup = $ionicPopup.alert({
              title: '',
              template: results[1].formatted_address,
              cssClass: 'ehdLatLonPopup'
            });
            alertPopup.then(function (res) {
            });
          }
        }
      });
    }
  })