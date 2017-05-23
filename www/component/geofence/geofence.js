angular.module('geofence', [])
  .controller('GeoFenceCtrl', function ($scope, UtilsFactory, $state, PageConfig, $ionicPopup) {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var latLng = new google.maps.LatLng(12.8501040, 77.6585636);
    var radius = [];

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
            drawingMode: '',
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon']
            },
            PolygonOptions : {
              fillColor: '#fbf9ff',
              fillOpacity: 0.1,
              strokeWeight: 1,
              clickable: false,
              editable: true,
              zIndex: 1
            }
          });
          drawingManager.setMap(map);

          google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
            radius = polygon.getPaths();
            console.log("radius: "+angular.toJson(radius.b[0].b));
            UtilsFactory.setPolygonPath(radius);
          });

          if(UtilsFactory.getPolygonPath().length!=0){
            var polyPaths = UtilsFactory.getPolygonPath();
            var currentPolygon = new google.maps.Polygon({
              paths: polyPaths,
              clickable: false,
              editable: true, 
              strokeOpacity: 0.8,
              strokeWeight: 3,
              fillColor: '#fbf9ff',
              fillOpacity: 0.35
            });
            currentPolygon.setMap(map);
          }
        });
    }

    /** function for update of geofence map **/
    $scope.updateGeoFence = function(){
        console.log("checking first: "+radius);
        if(radius!='' || UtilsFactory.getPolygonPath().length!=0){
            console.log("inside if true");
            $state.go(PageConfig.UPDATE_MARKER_DETAILS);
        }else{
            console.log("inside if false");
            var confirmPopup = $ionicPopup.confirm({
                title: 'Cofirm',
                template: 'Are you sure you want to exit from GeoFence?',
                cancelText: 'No',
                scope: $scope,
                okText: 'Yes',
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $state.go(PageConfig.UPDATE_MARKER_DETAILS);
                }
            });
        }
    }
});