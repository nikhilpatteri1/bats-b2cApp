angular.module('eventhistorydetail', [])
  .controller('EventHistoryDetailCtrl', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $timeout, PageConfig, UtilsFactory) {

    if (UtilsFactory.getEventHistoryList().length == 0) {
      $state.go(PageConfig.EVENT_HISTORY)
    }
    $scope.gotoFilter = function () {
      $state.go(PageConfig.EVENT_FILTER);
    }
    $scope.eventHistoryList = {
      devid: "BDT_LT_17-003", vehicle_num: "BDT_LT_17-003", vehicle_model: "",
      values: [{
        "ts": 1492576783509, "long": 77.6574397087097, "alarm_type": 0, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 2492576443509, "long": 77.6574397087097, "alarm_type": 1, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 3492576483509, "long": 77.6574397087097, "alarm_type": 2, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 4492576483509, "long": 77.6574397087097, "alarm_type": 3, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 5492576483509, "long": 77.6574397087097, "alarm_type": 4, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 6492576483509, "long": 77.6574397087097, "alarm_type": 5, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 7492576483509, "long": 77.6574397087097, "alarm_type": 6, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 8492576483509, "long": 77.6574397087097, "alarm_type": 7, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 9492576483509, "long": 77.6574397087097, "alarm_type": 8, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }, {
        "ts": 1492576483509, "long": 77.6574397087097, "alarm_type": 9, "lat": 12.851134339255756, "Vol": 50,
        "Velocity": '50km'
      }]
    };

    $scope.status = "Overspeed";
    $scope.lat = "12.21234";
    $scope.lng = "14.322222";
    $scope.speed = "72KMH"

    //  Displaying event history table
    $scope.eventHistoryValues = $scope.eventHistoryList.values;
    console.log($scope.eventHistoryValues);
    for (let i in $scope.eventHistoryValues) {

    }
    // for(var i=0;i<)














    function GetAddress() {
      var lat = parseFloat(document.getElementById("txtLatitude").value);
      var lng = parseFloat(document.getElementById("txtLongitude").value);
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            alert("Location: " + results[1].formatted_address);
          }
        }
      });
    }


    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: '',
        template: 'Geeta singh Rajput,sagar ,MadhyaPradesh,470001'
      });
      alertPopup.then(function (res) {
        //  $state.go(PageConfig.EVENT_HISTORY_DETAIL);
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
  })