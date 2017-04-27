angular.module('replayroutedetail', [])
.controller('ReplayRouteDetailCtrl', function($scope, $rootScope, $state, $ionicModal, $timeout, PageConfig) {
   var map; 
    var latLng =  {lat: 12.850167, lng: 77.660329}; 
    var mapOptions = {
        center:latLng,
        zoom: 22,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 map = new google.maps.Map(document.getElementById("map"),mapOptions);


})