angular.module('eventhistorydetail', [])
.controller('EventHistoryDetailCtrl', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $timeout, PageConfig, UtilsFactory, _, 
    BatsServices, ionicToast, Constants) {

    if (UtilsFactory.getEventHistoryList().length == 0) {
      $state.go(PageConfig.EVENT_HISTORY)
    }
    $scope.gotoFilter = function () {
      $state.go(PageConfig.EVENT_FILTER);
    }
        $scope.init = function(){
      let inputParam = UtilsFactory.getEventHistoryList();
      console.log("inputParam");
      console.log(inputParam);
      BatsServices.eventHistory(inputParam).success(function (response) {
        $scope.eventHistoryValues = response.values;
      }).error(function (error) {
          ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
      })
    }

    $scope.showAlert = function (lat,long) {
      var lat = parseFloat(lat);
      var lng = parseFloat(long);
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var alertPopup = $ionicPopup.alert({
              title: '',
              template:  results[1].formatted_address,
              cssClass:'ehdLatLonPopup'
            });
            alertPopup.then(function (res) {
            });
          }
        }
      });
    }
  })