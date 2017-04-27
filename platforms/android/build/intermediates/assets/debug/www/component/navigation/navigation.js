angular.module('navigation', [])
.controller('NavigationCtrl', function($scope, $state, $ionicModal, $timeout, $ionicPopup, PageConfig,Constants) {
    
  $scope.showDuration = false;
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var distanceMatrixService = new google.maps.DistanceMatrixService;
  $scope.initMap = function() {
    // var directionsService = new google.maps.DirectionsService;
    // var directionsDisplay = new google.maps.DirectionsRenderer;
    // var distanceMatrixService = new google.maps.DistanceMatrixService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    
    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay, distanceMatrixService);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
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
    console.log("navigate clicked");
  };


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
        //window.alert('Directions request failed due to ' + status);
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
          console.log("results: "+angular.toJson(results));
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if(element.status === 'OK'){
              var distance = element.distance.text;
              var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
              $scope.showDuration = true;
            }
          }
          $scope.totalDistance = distance;
          $scope.totalDuration = duration; 
        }
      }
      $scope.$apply();
    });
  }
});