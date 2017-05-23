angular.module('geofence', [])
  .controller('GeoFenceCtrl', function ($scope, $ionicModal, $timeout, UtilsFactory, $state, PageConfig, BatsServices, $ionicPlatform, 
    ionicToast, $interval, Constants, $cordovaGeolocation) {

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var latLng = new google.maps.LatLng(12.8501040, 77.6585636);

      // **************************notification part********************
      if (UtilsFactory.getNotificationDetails()) {
        // console.log(UtilsFactory.getNotificationDetails());
        $scope.notificationData = UtilsFactory.getNotificationDetails();
        $scope.count = UtilsFactory.getNotificationCount();
        // console.log($scope.count);
        if ($scope.count == undefined) {
          $scope.count = 0;
          $scope.notificationData = [];
        }
      }

      $scope.backToUpdateTracker = function () {
        $state.go(PageConfig.UPDATE_MARKER_DETAILS)
      }
      // ************************** END notification part******************** 

      /**initialization function for map loading **/
      $scope.init = function(){
        angular.element(document).ready(function () {
            var map = new google.maps.Map(document.getElementById('geoMap'), {
              zoom: 15,
              center: latLng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon']
            },
            markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
            circleOptions: {
              fillColor: '#ffff00',
              fillOpacity: 1,
              strokeWeight: 5,
              clickable: false,
              editable: true,
              zIndex: 1
            }
          });
          drawingManager.setMap(map);
        });
      }
});