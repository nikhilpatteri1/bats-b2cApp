angular.module('geofence', [])
    .controller('GeoFenceCtrl', function ($scope, $ionicModal, $timeout, UtilsFactory, $state, PageConfig, BatsServices,
        ionicToast, $interval, Constants, $cordovaGeolocation) {
        // var options = { timeout: 10000, enableHighAccuracy: true };

        // $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        //     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        //     var mapOptions = {
        //         center: latLng,
        //         zoom: 15,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP
        //     };

        //     $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // }, function (error) {
        //     console.log("Could not get location");
        // });

console.log("inside geofence");
var div = document.getElementById("map");
var map = window.plugin.google.maps.Map.getMap(div, {
  'mapType': window.plugin.google.maps.MapTypeId.ROADMAP,
  'controls': {
    'compass': true,
    //'myLocationButton': true,
    'indoorPicker': true,
    'zoom': true
  },
  'gestures': {
    'scroll': true,
    'tilt': true,
    'rotate': true,
    'zoom': true
  },
  'styles': [
    {
      featureType: "all",
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { hue: "#00ffee" },
        { saturation: 50 }
      ]
    },{
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ],
  'camera' : {
    target: {
      lat: 37.422375,
      lng: -122.084207
    },
    zoom: 10
  },
  'preferences': {
    'zoom': {
      'minZoom': 10,
      'maxZoom': 18
    },
    'building': false
  }
});
map.one(window.plugin.google.maps.event.MAP_READY, function() {
  console.log("--> map_canvas2 : ready.");
});

//   map.one(window.plugin.google.maps.event.MAP_READY, function() {
// console.log("--> map_canvas1 : ready.");
//     // const GORYOKAKU_POINTS = [
//     //   {"lat": 41.79883, "lng": 140.75675},
//     //   {"lat": 41.799240000000005, "lng": 140.75875000000002},
//     //   {"lat": 41.797650000000004, "lng": 140.75905},
//     //   {"lat": 41.79637, "lng": 140.76018000000002},
//     //   {"lat": 41.79567, "lng": 140.75845},
//     //   {"lat": 41.794470000000004, "lng": 140.75714000000002},
//     //   {"lat": 41.795010000000005, "lng": 140.75611},
//     //   {"lat": 41.79477000000001, "lng": 140.75484},
//     //   {"lat": 41.79576, "lng": 140.75475},
//     //   {"lat": 41.796150000000004, "lng": 140.75364000000002},
//     //   {"lat": 41.79744, "lng": 140.75454000000002},
//     //   {"lat": 41.79909000000001, "lng": 140.75465},
//     //   {"lat": 41.79883, "lng": 140.75673}
//     // ];
//     // map.addPolygon({
//     //   'points': GORYOKAKU_POINTS,
//     //   'strokeColor' : '#AA00FF',
//     //   'strokeWidth': 5,
//     //   'fillColor' : '#880000'
//     // }, function(polygon) {
//     //   map.animateCamera({
//     //     'target': polygon.getPoints()
//     //   });
//     // });

//   });
//});







































        // var directionsDisplay = new google.maps.DirectionsRenderer;
        // $scope.initMap = function () {
        //     navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        //         enableHighAccuracy: true,
        //         maximumAge: 3600000
        //     });

        //     function onSuccess(position) {
        //         lat = position.coords.latitude;
        //         lng = position.coords.longitude;
        //         latLng = new google.maps.LatLng(lat, lng);

        //         //load map when the page is ready
        //         angular.element(document).ready(function () {
        //             var map = new google.maps.Map(document.getElementById('geoMap'), {
        //                 zoom: 7,
        //                 center: latLng,
        //                 mapTypeId: google.maps.MapTypeId.ROADMAP
        //             });
        //             directionsDisplay.setMap(map);
        //         });
        //     };

        //     function onError(error) {
        //       //  alert("Unable to get device location");
        //     };
        // };





        // // Declare vaariable 
        // // $scope.token = $localStorage.data;
        // $scope.deviceloaded = true;

        // $scope.showTrafficLayerBtn = false;
        // $scope.hideTrafficLayerBtn = true;
        // $scope.singleDeviceZoomed = true;
        // $scope.headings;
        // var map;
        // var directionDisplay;
        // var directionsService;
        // var stepDisplay;
        // var markers = [];
        // var marker = new Array();
        // var myPolygon;
        // var position;
        // var polyline;
        // var poly2;
        // var speed = 0.000005,
        //     wait = 1;
        // var infowindow = null;
        // var timerHandle = null;
        // var storedltlng = {};
        // var trafficLayer = new google.maps.TrafficLayer();
        // var Colors = ["#FF0000", "#00FF00", "#0000FF"];
        // var svg = new Array();
        // var icons = new Array();
        // var vehicleType;
        // var multiBounds;




        // if (UtilsFactory.getNotificationDetails()) {
        //     // console.log(UtilsFactory.getNotificationDetails());
        //     $scope.notificationData = UtilsFactory.getNotificationDetails();
        //     $scope.count = UtilsFactory.getNotificationCount();
        //     // console.log($scope.count);
        //     if ($scope.count == undefined) {
        //         $scope.count = 0;
        //         $scope.notificationData = [];
        //     }
        // }

        // $scope.backToUpdateTracker = function () {
        //     $state.go(PageConfig.UPDATE_MARKER_DETAILS)
        // }

        // $scope.init = function () {
        //     $scope.initialize();
        //     var dynamicMapHeight = window.screen.availHeight;
        //     $scope.mapHeight = { height: parseInt(dynamicMapHeight) - 43 + "px" };
        //     // console.log($scope.mapHeight, localStorage.getItem("choice"));
        // };


        // $scope.httpLoading = false;

        // $scope.initialize = function () {
        //     var $map = $('#map');
        //     infowindow = new google.maps.InfoWindow({
        //         size: new google.maps.Size(150, 50)
        //     });
        //     var styleMap = [{ "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#bee4f4" }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "hue": "#ff0000" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "hue": "#ff0000" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "hue": "#ff0000" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "color": "#000000" }] }];
        //     var myOptions = {
        //         zoom: 16,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         zoomControl: false
        //     };
        //     // console.log(document.getElementById("map_canvas"));

        //     map = new google.maps.Map(document.getElementById("map"), myOptions);

        //     // address = 'India';
        //     // // address = 'Trinidad and Tobago'
        //     // geocoder = new google.maps.Geocoder();
        //     // geocoder.geocode( { 'address': address}, function(results, status) {
        //     //     map.fitBounds(results[0].geometry.viewport);
        //     //  });	

        //     // Instantiate a directions service.
        //     directionsService = new google.maps.DirectionsService();
        //     // Create a renderer for directions and bind it to the map.
        //     var rendererOptions = {
        //         map: map
        //     };
        //     directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        //     polyline = new google.maps.Polyline({
        //         path: [],
        //         strokeColor: '#FF0000',
        //         strokeWeight: 0
        //     });
        //     poly2 = new google.maps.Polyline({
        //         path: [],
        //         strokeColor: '#FF0000',
        //         strokeWeight: 0
        //     });
        //     /*
        //     * google map default zoom_changed event
        //     * */
        //     $scope.zoomlevel = 16;
        //     google.maps.event.addListener(map, 'zoom_changed', function () {
        //         setTimeout(function () {
        //             $scope.zoomlevel = map.getZoom();
        //         }, 80);
        //         if ($scope.zoomlevel < 16 || $scope.zoomlevel > 17) {
        //             // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ZOOM & DEVICEID<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        //             // console.log($scope.zoomlevel);
        //             $scope.singleDeviceZoomed = false;


        //             // if (angular.isDefined(singleDeviceInterval)) {
        //             // 	$interval.cancel(singleDeviceInterval);
        //             // } 
        //             //else if (angular.isDefined(multiDeviceInterval)) {
        //             // 	$interval.cancel(multiDeviceInterval);
        //             // }
        //         }
        //     });
        // };

        // google.maps.event.addDomListener(window, 'load', $scope.initialize);

    });