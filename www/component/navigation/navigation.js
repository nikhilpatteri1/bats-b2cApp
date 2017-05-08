angular.module('navigation', [])
.controller('NavigationCtrl', function($scope, $state, $ionicModal, $timeout, $ionicPopup, PageConfig,Constants, $window) {
    
  // $scope.showDuration = false;
  var defaultDistText = '0 hour 0 mins';
  var defaultDurtext = '0 km';
  setDurationText();
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var distanceMatrixService = new google.maps.DistanceMatrixService;
  var lat, lng, latLng;
  $scope.initMap = function() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 3600000
    });

    function onSuccess(position){
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      latLng = new google.maps.LatLng(lat, lng);

      //load map when the page is ready
      angular.element(document).ready(function () {
          var map = new google.maps.Map(document.getElementById('navMap'), {
            zoom: 7,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          directionsDisplay.setMap(map);
      });
    };

    function onError(error){
      alert("Unable to get device location");
    };

    $scope.onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay, distanceMatrixService);
      disableTap();
    };
  };


  //function to swap your and drop location
  $scope.swapLocation = function(){
    var tempStart = document.getElementById('start').value;
    document.getElementById('start').value = document.getElementById('end').value;
    document.getElementById('end').value = tempStart;
    calculateAndDisplayRoute(directionsService, directionsDisplay, distanceMatrixService);
  };

  //function for navigate button click
  $scope.startNavigate = function(){
    var startloc = document.getElementById('start').value;
    var endloc = document.getElementById('end').value;
    if(startloc!='' && endloc!=''){
      if(ionic.Platform.isAndroid() || ionic.Platform.isWebView()){
        var link = ""+"http://maps.google.com/maps?saddr="+startloc+" &daddr="+endloc;
        window.location = link;
      }
      if(ionic.Platform.isIOS() || ionic.Platform.isIPad()){
        var link = ""+"http://maps.apple.com/maps?saddr="+startloc+"&daddr="+endloc;
        window.location = link;
      }
    }
  };

  function disableTap() {
    var container = document.getElementsByClassName('pac-container');
    angular.element(container).attr('data-tap-disabled', 'true');
  }

  function setDurationText(){
    $scope.totalDistance = defaultDistText;
    $scope.totalDuration = defaultDurtext;
    if(!$scope.$$phase){
      $scope.$apply();
    }
  }


  function calculateAndDisplayRoute(directionsService, directionsDisplay, distanceMatrixService) {
    //google API for routing in the map
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('end').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        setDurationText();
        console.log('Directions request failed due to ' + status);
      }
    });

    //google API for getting distance and duration from the map
    distanceMatrixService.getDistanceMatrix({
      origins: [document.getElementById('start').value],
      destinations: [document.getElementById('end').value],
      travelMode: 'DRIVING' 
    }, function(response, status){
      if(status ==='OK'){
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if(element.status === 'OK'){
              var distance = element.distance.text;
              var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
            }
          }
        }
        $scope.totalDistance = distance;
        $scope.totalDuration = duration;
      }else{
        setDurationText();
      }
      if(angular.isUndefined(distance) || angular.isUndefined(duration)){
        setDurationText();
      }
      $scope.$apply();
    });
  }
});