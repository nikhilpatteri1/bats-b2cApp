angular.module('notification', [])
    .controller('NotificationCtrl', function ($scope, $rootScope, $state, $ionicModal, $timeout, PageConfig, UtilsFactory) {

        $scope.backToHistory=function(){
            console.log(navigator)
             navigator.app.backHistory();
        }
        $scope.noData=true;
        console.log(UtilsFactory.getNotificationDetails());
        if(UtilsFactory.getNotificationDetails()){
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count=$scope.notificationData.length;
            $scope.noData=false;
            console.log($scope.count);
            if($scope.count==undefined||$scope.count==0){
              $scope.count=0;
              $scope.notificationData=[];
              $scope.noData=true;
            }
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