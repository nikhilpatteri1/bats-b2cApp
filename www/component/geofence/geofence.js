angular.module('geofence', [])
  .controller('GeoFenceCtrl', function ($scope, UtilsFactory, $state, PageConfig, $ionicPopup, $ionicModal, BatsServices,
        ionicToast, Constants) {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var latLng = new google.maps.LatLng(12.8501040, 77.6585636);
    var radius = [];
    var all_polygons = [];
    var polygon_completed = false;
    var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: '',
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            }
        });
    var polygonDrawing = new google.maps.Polygon({
            fillColor: '#fbf9ff',
            fillOpacity: 0.1,
            strokeWeight: 1,
            clickable: false,
            editable: true,
            zIndex: 1
        });

    // **************************notification part********************
    if (UtilsFactory.getNotificationDetails()) {
        $scope.notificationData = UtilsFactory.getNotificationDetails();
        $scope.count = UtilsFactory.getNotificationCount();
        if ($scope.count == undefined) {
            $scope.count = 0;
            $scope.notificationData = [];
        }
    }

    $scope.backToUpdateTracker = function () {
        $state.go(PageConfig.UPDATE_MARKER_DETAILS)
    }
    // ************************** END notification part******************** 

    $ionicModal.fromTemplateUrl('templates/popup/updateMarker.html', function(modal) {
        $scope.updateMarkerModal = modal;
    },{
        scope: $scope,
        animation: 'slide-in-up'
    });

    /**initialization function for map loading **/
    $scope.init = function(){
        angular.element(document).ready(function () {
            var map = new google.maps.Map(document.getElementById('geoMap'), {
                zoom: 15,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: false,
                streetViewControl: false
            });

            drawingManager.setMap(map);

            google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
                drawingManager.setOptions({
                    drawingControl: false
                });
                var pathObj = polygon.getPaths();
                radius = pathObj.b[0].b;
                UtilsFactory.setPolygonPath(radius);
            });

            google.maps.event.addListener(drawingManager, 'overlaycomplete', function(polygon) {
                all_polygons.push(polygon);
                polygon_completed = true;
                drawingManager.setDrawingMode(null);
            });

            map.addListener('click', function(){
                $scope.clearMap();
                polygon_completed = false;
            });

            if(UtilsFactory.getPolygonPath().length!=0){
                var polyPaths = UtilsFactory.getPolygonPath();
                radius = polyPaths;
                polygonDrawing = new google.maps.Polygon({
                    paths: polyPaths
                });
                polygonDrawing.setMap(map);
                drawingManager.setOptions({
                    drawingControl: false
                });
            }

            $scope.clearMap = function(){
                radius = [];
                for(var i=0;i<all_polygons.length;i++){
                    all_polygons[i].overlay.setMap(null);
                }
                all_polygons = [];
                if(polygonDrawing){
                    polygonDrawing.setMap(null);
                    polygonDrawing = null;
                }
                drawingManager.setOptions({
                    drawingControl: true
                });
            }
        });
    }

    /** function for update of geofence map **/
    $scope.updateGeoFence = function(){
        if(radius!='' || UtilsFactory.getPolygonPath().length!=0){
            var data = UtilsFactory.getUpdateTrackerDetails();
            data.geofence = radius;
            BatsServices.modifyMarker(data).success(function (response) {
                $scope.updateMarkerModal.show();
            }).error(function (error) {
                 if(error.err=='Origin Server returned 504 Status'){
                     ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else{
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
               // ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }else{
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

    $scope.closeModal = function(){
        $scope.updateMarkerModal.hide();
        $state.go(PageConfig.MANAGE_TRACKER);
    };

    $scope.showInfo = function(){
        var alertPopup = $ionicPopup.alert({
                            cssClass: 'info-popup',
                            template: '<div class="info-popup"><img width="100%" height="100%" src="img/geofence-info.gif"></div>',
                            buttons: [{
                                text: 'Close',
                                type: 'button-balanced'
                            }]
                        });
    };
});