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
      console.log(UtilsFactory.getNotificationDetails());
      $scope.notificationData = UtilsFactory.getNotificationDetails();
      $scope.count = $scope.notificationData.length;
      console.log($scope.count);
      if ($scope.count == undefined) {
        $scope.count = 0;
        $scope.notificationData = [];
      }
    }

    // $scope.filterList = UtilsFactory.getHistoryFilterList();
    $scope.init = function () {
      if (UtilsFactory.getHistoryFilterList().length != 0) {
        $scope.filterList = UtilsFactory.getHistoryFilterList();
      } else {
        $scope.filterList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
      let inputParam = UtilsFactory.getEventHistoryList();
      BatsServices.eventHistory(inputParam).success(function (response) {
        $scope.eventHistoryValues = response.values;
      }).error(function (error) {
        ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
      })
    }


    $scope.chexkAlarmType = function (alarm_type) {
      console.log("geeta its me alarm type" + alarm_type);
      if (alarm_type == 0) {
        $scope.alarmType = "Panic";
      }
      else if (alarm_type == 1) {
        $scope.alarmType = "Tamper Sim";
      }
      else if (alarm_type == 2) {
        $scope.alarmType = "Tamper Top";
      }
      else if (alarm_type == 3) {
        $scope.alarmType = "Battery ";
      }
      else if (alarm_type == 4) {
        $scope.alarmType = "Overspeed";
      }
      else if (alarm_type == 5) {
        $scope.alarmType = "Geofence";
      }
      else if (alarm_type == 6) {
        $scope.alarmType = "Sanity alarm";
      }
      else if (alarm_type == 7) {
        $scope.alarmType = "CONNECTION TO TRACKER INTERRUPTED";
      }
      else if (alarm_type == 8) {
        $scope.alarmType = "Robbery / theft alarm";
      }
      else if (alarm_type == 9) {
        $scope.alarmType = "Warning";
      }
      console.log(alarm_type + $scope.alarmType);
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