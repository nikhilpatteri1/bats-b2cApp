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