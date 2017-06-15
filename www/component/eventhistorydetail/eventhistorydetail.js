angular.module('eventhistorydetail', [])
  .controller('EventHistoryDetailCtrl', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $timeout, PageConfig, UtilsFactory, _,
    BatsServices, ionicToast, Constants) {

    if (UtilsFactory.getEventHistoryList().length == 0) {
      $state.go(PageConfig.EVENT_HISTORY)
    }
    $scope.gotoFilter = function () {
      $state.go(PageConfig.EVENT_FILTER);
    }
    if (UtilsFactory.getNotificationDetails()) {
      //  console.log(UtilsFactory.getNotificationDetails());
      $scope.notificationData = UtilsFactory.getNotificationDetails();
      $scope.count = UtilsFactory.getNotificationCount();
      //  console.log($scope.count);
      if ($scope.count == undefined) {
        $scope.count = 0;
        $scope.notificationData = [];
      }
    }
    $scope.speed;
    $scope.noData = false;
    // $scope.filterList = UtilsFactory.getHistoryFilterList();
    $scope.init = function () {
      // *********************** filter checking *****************************
      if (UtilsFactory.getHistoryFilterList().length != 0) {
        $scope.filterList = UtilsFactory.getHistoryFilterList();
      } else {
        $scope.filterList = [0,1,2,3,4,5,6,7,8,9,10];
      }
 // ***********************end  filter checking *****************************

      $scope.eventHistoryValueslist = UtilsFactory.getEventHistoryList();
      // console.log($scope.eventHistoryValueslist);
      $scope.eventHistoryValues=$scope.eventHistoryValueslist.values;
       if ($scope.eventHistoryValues.length==0) {
        $scope.noData = true;
        
      }else{
        $scope.noData = false;
        // $scope.eventHistoryValues = UtilsFactory.setEventHistoryList();
         $scope.speed = $scope.eventHistoryValues.speed_limit;
      }
     
    }

    $scope.chexkAlarmType = function (alarm_type, velocity) {

      // console.log("gdgj" +$scope.speed);
      // if ( $scope.speed< velocity) {
      //   $scope.redSpeed = 1;
      // //  console.log("red style applying " + $scope.redSpeed);
      // }
      // else{
      //    $scope.redSpeed = 0;

      // }

      // console.log("geeta its me alarm type" + alarm_type);
      if (alarm_type == '0') {
        $scope.alarmType = "Panic";
        $scope.imageSrc = 'img/eventH/panic.png';
      }else if (alarm_type == '1') {
        $scope.alarmType = "Tamper Sim";
        $scope.imageSrc = 'img/eventH/sim-tamper.png';
      }else if (alarm_type == '2') {
        $scope.alarmType = "Tamper Top";
        $scope.imageSrc = 'img/eventH/tamper-top.png';
      }else if (alarm_type == '3') {
        $scope.alarmType = "Battery Low";
        $scope.imageSrc = 'img/eventH/battery.png';
      }else if (alarm_type == '4') {
        $scope.alarmType = "Overspeed";
        $scope.imageSrc = 'img/eventH/overspeed.png';
      }else if (alarm_type == '5') {
        $scope.alarmType = "Geofence";
        $scope.imageSrc = 'img/eventH/geofence.png';
      }else if (alarm_type == '6') {
        $scope.alarmType = "Sanity alarm";
        $scope.imageSrc = 'img/eventH/sanity.png';
      }else if (alarm_type == '7') {
        $scope.alarmType = "Connection to tracker interrupted";
        $scope.imageSrc = 'img/eventH/warning.png';
      }else if (alarm_type == '8') {
        $scope.alarmType = "Vehicle Moved / Theft ";
        $scope.imageSrc = 'img/eventH/theft.png';
      }else if (alarm_type == '9') {
        $scope.alarmType = "Tracker sim changed";
        $scope.imageSrc = 'img/eventH/sim-tamper.png';
      }else if (alarm_type == '10') {
        $scope.alarmType = "Warning";
        $scope.imageSrc = 'img/eventH/invalid.png';
      }
      // console.log(alarm_type + $scope.alarmType);
    }


    $scope.backToEventHistory = function () {
      $state.go(PageConfig.EVENT_HISTORY);
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