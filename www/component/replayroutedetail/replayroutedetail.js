angular.module('replayroutedetail', [])
    .controller('ReplayRouteDetailCtrl', function ($scope, $rootScope, $state, $ionicModal, $timeout, PageConfig, UtilsFactory, BatsServices,
     Constants, ionicToast) {
    
	var dynamicMapHeight=window.screen.availHeight;
    $scope.mapHeight={
		height:parseInt(dynamicMapHeight)-133+"px"
	};

	$scope.backToReplayRoute=function(){
		$state.go(PageConfig.REPLAY_ROUTE);
	};

	$scope.showReplayMenu = false;

	$scope.availableOptions = [
     { name: 'slow', value: '0' }, 
     { name: 'medium', value: '1' }, 
     { name: 'high', value: '2' }
   	];
   	$scope.data = {selectedOption : $scope.availableOptions[0].value};

    $scope.showDatepicker=true;
	$scope.showTimeSlot=false;
	$scope.blankTable=true;
	
	$scope.todayDate=new Date();
	$scope.greyColor={color:"#637778"};
	$scope.whiteColor={color:"#fff"};
	var contentHeight=window.screen.availHeight-220;
	$scope.histcontentheight={"maxHeight":contentHeight}
	$scope.end = false;
	$rootScope.menuPos=15;
	var dev={};
	var maploadedInterval;
	var directionDisplay;
    var directionsService;
	var map;
	var historypolyline = null;
	var timerHandle = null;
	var step = 5; // metres
	var tick = 100; // milliseconds
	var poly;
	var poly2;
	var lastVertex = 0;
	var eol;
	var marker = new Array();
	var k=0;
	var setinterval;

	var svg = new Array();
	svg[0] = { path :"M26.068,7.719 C27.423,21.657 26.941,35.659 26.801,49.660 C26.765,52.945 23.953,55.681 20.511,55.727 C16.978,55.770 13.462,55.778 9.929,55.738 C6.486,55.697 3.672,52.944 3.640,49.660 C3.516,35.659 3.113,21.657 4.657,7.719 C5.083,4.446 7.639,1.760 10.572,1.739 C13.630,1.721 16.881,1.721 20.018,1.739 C23.034,1.760 25.695,4.446 26.068,7.719 L26.068,7.719 Z",fillColor : "rgb(237, 237, 237)"};
	svg[1] = { path : "M25.762,8.510 L20.921,2.204 C20.921,2.204 25.252,2.647 25.885,8.065 C26.517,13.483 25.762,8.510 25.762,8.510 ZM15.160,2.706 C12.355,2.772 10.092,2.853 10.085,2.450 C10.076,2.165 12.353,1.834 15.164,1.816 C17.968,1.902 20.240,2.220 20.248,2.466 C20.253,2.846 17.967,2.761 15.160,2.706 ZM4.815,8.074 C5.443,2.668 9.749,2.226 9.749,2.226 L4.937,8.518 C4.937,8.518 4.187,13.481 4.815,8.074 ZM5.000,47.349 L4.563,21.574 C4.563,21.574 9.613,34.691 5.000,47.349 ZM7.721,44.433 C7.865,44.256 8.144,44.114 8.372,44.086 L7.879,26.221 C7.668,26.129 7.434,25.911 7.299,25.650 C6.246,23.582 5.784,21.256 5.737,19.294 C5.700,18.027 6.392,17.124 7.323,16.364 C8.266,15.625 9.448,15.028 10.664,14.841 C13.663,14.447 16.725,14.440 19.798,14.794 C22.228,15.233 24.825,17.000 24.814,19.411 C24.761,21.376 24.325,23.625 23.296,25.754 C23.118,26.114 22.752,26.393 22.495,26.383 C18.058,26.218 12.293,26.214 8.082,26.268 C8.078,26.268 8.073,26.268 8.069,26.268 L8.559,44.083 C12.615,44.173 17.835,44.175 21.697,44.146 L22.187,26.376 L22.375,26.381 L21.885,44.149 C22.107,44.170 22.399,44.311 22.553,44.491 C23.529,45.647 23.957,46.947 24.001,48.043 C24.035,48.752 23.394,49.256 22.531,49.681 C21.656,50.094 20.560,50.428 19.432,50.532 C16.652,50.752 13.813,50.756 10.964,50.558 C8.711,50.313 6.303,49.325 6.313,47.978 C6.362,46.880 6.766,45.623 7.721,44.433 ZM25.938,21.591 L25.500,47.392 C20.891,34.722 25.938,21.591 25.938,21.591 Z", fillColor :"rgb(0, 0, 0)"};
	svg[2] = { path : "M25.122,54.823 L22.326,56.181 C22.187,56.249 22.449,55.545 22.710,54.987 L23.830,52.596 C23.909,52.427 24.031,52.230 24.113,52.136 L25.203,50.886 C25.331,50.739 25.452,50.678 25.470,50.765 L25.838,52.542 C25.993,53.290 25.636,54.572 25.122,54.823 ZM7.994,56.175 L5.193,54.808 C4.677,54.557 4.319,53.266 4.474,52.514 L4.844,50.726 C4.862,50.638 4.983,50.700 5.111,50.848 L6.203,52.105 C6.285,52.200 6.408,52.398 6.487,52.568 L7.610,54.974 C7.871,55.535 8.134,56.244 7.994,56.175 Z", fillColor : "rgb(255, 0, 0)"};
	svg[3] = { path : "M25.937,21.687 L25.937,19.750 L28.312,19.750 C29.348,19.750 30.187,20.589 30.187,21.625 L30.187,21.687 L25.937,21.687 ZM26.125,7.719 C25.751,4.446 23.075,1.760 20.044,1.739 C16.890,1.721 13.622,1.721 10.547,1.739 C7.599,1.760 5.029,4.446 4.601,7.719 C4.586,7.854 4.572,7.990 4.557,8.125 L4.422,8.125 C4.460,7.741 4.499,7.358 4.540,6.974 C4.969,3.541 7.542,0.723 10.495,0.702 C13.574,0.682 16.847,0.682 20.006,0.702 C23.042,0.723 25.721,3.541 26.096,6.974 C26.132,7.358 26.166,7.741 26.199,8.125 L26.164,8.125 C26.151,7.990 26.138,7.854 26.125,7.719 ZM4.563,21.687 L0.313,21.687 L0.313,21.625 C0.313,20.589 1.152,19.750 2.188,19.750 L4.563,19.750 L4.563,21.687 ZM9.901,55.738 C13.452,55.778 16.988,55.770 20.539,55.727 C23.812,55.684 26.518,53.233 26.832,50.188 L26.843,50.188 C26.840,50.449 26.837,50.711 26.835,50.973 C26.798,54.419 23.967,57.290 20.502,57.338 C16.945,57.383 13.404,57.391 9.847,57.350 C6.381,57.306 3.548,54.418 3.516,50.973 C3.514,50.711 3.511,50.449 3.509,50.188 L3.609,50.188 C3.919,53.234 6.627,55.699 9.901,55.738 Z", fillColor : "rgb(121, 121, 121)"};
	svg[4] = { path : "M24.837,18.830 C24.828,18.872 24.811,18.913 24.786,18.951 C24.786,18.952 24.785,18.953 24.784,18.955 C24.491,16.779 22.071,15.204 19.798,14.794 C16.725,14.440 13.663,14.447 10.664,14.841 C9.448,15.028 8.266,15.625 7.323,16.364 C6.429,17.094 5.758,17.956 5.738,19.145 C5.738,19.145 5.738,19.145 5.738,19.145 C5.713,19.107 5.695,19.066 5.686,19.024 C5.677,18.982 5.676,18.939 5.685,18.894 C6.276,15.191 7.255,10.228 9.521,3.606 C9.575,3.439 9.940,3.312 10.339,3.319 C13.562,3.374 16.941,3.366 20.142,3.287 C20.537,3.277 20.903,3.400 20.963,3.563 C22.183,6.915 23.071,9.715 23.639,12.193 C24.216,14.623 24.504,16.818 24.838,18.701 C24.846,18.745 24.845,18.789 24.837,18.830 ZM7.107,45.332 C7.202,45.144 7.304,44.956 7.417,44.768 C7.539,44.566 7.708,44.387 7.875,44.260 C7.959,44.196 8.042,44.145 8.119,44.111 C8.157,44.094 8.194,44.081 8.229,44.073 C8.246,44.069 8.263,44.066 8.280,44.064 C8.288,44.063 8.296,44.063 8.303,44.062 C8.311,44.062 8.319,44.062 8.326,44.062 C8.577,44.074 8.832,44.084 9.091,44.094 C8.879,44.090 8.669,44.086 8.463,44.081 C8.225,44.075 7.885,44.231 7.721,44.433 C7.483,44.729 7.279,45.030 7.107,45.332 ZM6.353,47.528 C6.333,47.680 6.320,47.831 6.313,47.978 C6.303,49.325 8.711,50.313 10.964,50.558 C13.813,50.756 16.652,50.752 19.432,50.532 C20.560,50.428 21.656,50.094 22.531,49.681 C23.243,49.330 23.804,48.925 23.958,48.395 C23.981,48.634 23.997,48.870 24.004,49.103 C24.007,49.241 24.008,49.377 24.007,49.512 C24.006,49.647 24.003,49.781 23.998,49.914 C23.976,50.443 23.925,50.949 23.860,51.414 C23.695,52.619 22.983,53.376 22.098,53.877 C21.223,54.358 20.166,54.609 19.108,54.606 C17.817,54.582 16.520,54.552 15.215,54.554 C14.889,54.555 14.562,54.557 14.234,54.560 C13.907,54.564 13.578,54.569 13.250,54.575 C12.592,54.588 11.932,54.607 11.268,54.626 C9.175,54.644 6.776,53.680 6.373,51.323 C6.302,50.860 6.244,50.364 6.216,49.845 C6.209,49.715 6.205,49.584 6.202,49.452 C6.199,49.319 6.199,49.186 6.201,49.051 C6.206,48.781 6.222,48.506 6.251,48.228 C6.274,47.997 6.308,47.763 6.353,47.528 Z", fillColor : "rgb(255, 255, 255)"};
	var icons = new Array();;
	for(i in svg){
		icons[i] = {path : svg[i].path, fillColor : svg[i].fillColor, scale: .7, strokeColor: 'white', strokeWeight: .10, fillOpacity: 1, offset: '5%',
			anchor: new google.maps.Point(10, 25) // orig 10,50 back of
		};
	}
  	var oldStep;
  // To Change Replay Speed level
	$scope.updateSpeed=function(choice){
		choice = parseInt(choice);
		switch (choice) {
			case 0:
				oldStep = {step: 1,tick:100};
				step=5;
				tick=100;
				break;
			case 1:
				oldStep = {step: 10,tick:50};
				step=10;
				tick=50;
				break;
			case 2:
				oldStep = {step: 50,tick:10};
				step=50;
				tick=10;
				break;	
			case 3:
				step=0;
				tick=1000;
				$scope.play = true;
				break;
			case 4:
				step=oldStep.step;
				tick=oldStep.tick;
				$scope.play = false;
				break;
		}
	};

	angular.element(document).ready(function () {
		$scope.initialize(); 
	});

	$scope.initialize=function () {
    	console.log("map");
		var styleMap = [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#bee4f4"},{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#000000"}]}];
	    var myOptions = {
	        zoom: 20,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    address = 'India';
	    geocoder = new google.maps.Geocoder();
	    geocoder.geocode( { 'address': address}, function(results, status) {
	    	map.fitBounds(results[0].geometry.viewport);
	    });	
	    map = new google.maps.Map(document.getElementById("replay_map"), myOptions);
	    google.maps.event.addListenerOnce(map, 'idle', function(){});
	    
		google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
	        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){});
	    });

	    google.maps.event.addListener(map, 'tilesloaded', function() {});
	    poly = new google.maps.Polyline({
	        path: [],
	        strokeColor: '#97dcc9',
	        strokeWeight: 4
	    });
	    poly2 = new google.maps.Polyline({
	        path: [],
	        strokeColor: '#FF0000',
	        strokeOpacity: 0.0,
	        strokeWeight: 0
	    });  
	}
	
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
	
	var dataFromReplay = UtilsFactory.getDataForReplay();
	$scope.timeSlots = dataFromReplay.values;

	$scope.getHistory = function (timeSlot) {
		$scope.showReplayMenu = true;
		oldStep = {step: 1,tick:100};
		$scope.initialize();
		$scope.end = false;
		$scope.replaySlot = timeSlot;
		var inputParam = { 'devid': dataFromReplay.devid, 'sts': timeSlot.sts, 'ets': timeSlot.ets };
		BatsServices.history(inputParam).success(function (response) {
			$scope.historyVal = response;
			if($scope.historyVal.values != "" ){
				displayHistory();
			}else{
				ionicToast.show('No history avilable for this Vehicle');
				clearMap();
				for(i in svg){marker[i].setMap(null);}
				if (setinterval) {
					clearTimeout(timerHandle);
				}
			}
		}).error(function (error){
			ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
		})
	};
	
	function displayHistory() {
		$scope.yoData=true;
		$scope.noData=false;
		var lat_tot = 0, lg_tot = 0, lat_avg = 0, lg_avg = 0;
		var histData = $scope.historyVal.values;
		var hist_len = histData.length;
		var polyPathArray = [];
		$scope.plottedData=[];
		var coordinates = [];		
		for(var inc = 0; inc < hist_len; inc++){
		  	executeHisory(histData[inc].lat,histData[inc].long,histData[inc].Velocity,histData[inc].ts,function(historyStatus){
                var arr = {};
    			var plottedObj={};
    			arr.lat = Number(historyStatus.latitude);
				arr.lng = Number(historyStatus.longitude);
				plottedObj.lat = Number(historyStatus.latitude);
				plottedObj.long = Number(historyStatus.longitude);
				plottedObj.Velocity = historyStatus.velocity;
				plottedObj.ts = historyStatus.timestamp;
				polyPathArray.push(arr);
				$scope.plottedData.push(plottedObj);
				lat_tot += Number(historyStatus.latitude);
				lg_tot += Number(historyStatus.longitude);
		  	});
		}
		function executeHisory(latitude,longitude,velocity,timestamp,mapHistory){
			var historyStatus={"latitude":latitude,"longitude":longitude,"velocity":velocity,"timestamp":timestamp};
			mapHistory(historyStatus);
		}
		
		if(polyPathArray.length == 0){
			$scope.yoData=false;
		}else{
			clearMap();
			bounds = new google.maps.LatLngBounds();
			var pts=[];
    	    var length = 0;
            var point = null;
			var myLatLng = {"lat":polyPathArray[0].lat,"lng":polyPathArray[0].lng};
			var icon1 = {
				url: 'img/startFlag.png', // url
				scaledSize: new google.maps.Size(38, 38), // scaled size
			};

			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: icon1,
				scale:0.1
			});

			var icon2 = {
				url: 'img/finishFlag.png', // url
				scaledSize: new google.maps.Size(38, 38), // scaled size
			};

			var myLatLng = {"lat":polyPathArray[polyPathArray.length-1].lat,"lng":polyPathArray[polyPathArray.length-1].lng};
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: icon2
			});

            for(var i=0;i<polyPathArray.length;i++){
            	pts[i]=new google.maps.LatLng(polyPathArray[i].lat,polyPathArray[i].lng)
            	if(i>0){
            		length += pts[i-1].distanceFrom(pts[i]);
            		if(isNaN(length)) {
					};
            	}
            	bounds.extend(pts[i]);
            	point = pts[parseInt(i/2)];
            }
            poly = new google.maps.Polyline({
            	map:map,
    	        path: pts,
    	        strokeColor: '#97dcc9',
    	        strokeWeight: 5
    	    });
    	    map.setZoom(16);
            map.fitBounds(bounds);
            startAnimation();  
		}
	};

	function clearMap(){
		poly.setMap(null);
		poly2.setMap(null);
	};

	function startAnimation() {  	  
    	if (timerHandle) {
			clearTimeout(timerHandle);
	    }
        eol=poly.Distance();
        map.setCenter(poly.getPath().getAt(0));
        if (marker[0]) {
        	for(i in svg){marker[i].setMap(null);}
        }
        marker = [];
        for(i in svg){
			marker[i] = new google.maps.Marker({
				position: poly.getPath().getAt(0),
				map: map,
				icon: icons[i]
			});
    	}
        poly2 = new google.maps.Polyline({path: [poly.getPath().getAt(0)], strokeColor:"#0000FF",strokeOpacity: 0.0, strokeWeight:0}); 
    	setinterval = setTimeout(function() {
			$scope.animate(50);
 		}, 2000);
	};
	function updatePoly(d) {
		if (poly2.getPath().getLength() > 20) {
			poly2= new google.maps.Polyline([poly.getPath().getAt(lastVertex - 1)]);
			poly2.setMap(null);
		}

		if (poly.GetIndexAtDistance(d) < lastVertex+2) {
			if (poly2.getPath().getLength()>1) {
				poly2.getPath().removeAt(poly2.getPath().getLength() - 1);
			}
			poly2.getPath().insertAt(poly2.getPath().getLength(), poly.GetPointAtDistance(d));
		} else {     
			poly2.getPath().insertAt(poly2.getPath().getLength(), poly.getPath().getAt(lastVertex++));
		}
	};

	$scope.animate = function(d) {
		if (d>eol) {	
			$scope.end = true;
			return;
		}
		var p = poly.GetPointAtDistance(d);
		map.panTo(p);
		var lastPosn = marker[0].getPosition();
		for(i in svg){marker[i].setPosition(p);}
		var heading = google.maps.geometry.spherical.computeHeading(lastPosn, p);
		for(i in svg){icons[i].rotation = heading;}
		for(i in svg){marker[i].setIcon(icons[i]);}
		updatePoly(d);
		timerHandle = setTimeout(function() {
			$scope.animate(d + step);
		}, tick);
	};

	// === first support methods that don't (yet) exist in v3
	google.maps.LatLng.prototype.distanceFrom = function (newLatLng) {
		var EarthRadiusMeters = 6378137.0; // meters
		var lat1 = this.lat();
		var lon1 = this.lng();
		var lat2 = newLatLng.lat();
		var lon2 = newLatLng.lng();
		var dLat = (lat2 - lat1) * Math.PI / 180;
		var dLon = (lon2 - lon1) * Math.PI / 180;
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = EarthRadiusMeters * c;
		return d;
	}

	google.maps.LatLng.prototype.latRadians = function () {
		return this.lat() * Math.PI / 180;
	}

	google.maps.LatLng.prototype.lngRadians = function () {
		return this.lng() * Math.PI / 180;
	}

	// === A method which returns the length of a path in metres ===
	google.maps.Polygon.prototype.Distance = function () {
		var dist = 0;
		for (var i = 1; i < this.getPath().getLength(); i++) {
			dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
		}
		return dist;
	}

	google.maps.Polygon.prototype.GetPointAtDistance = function (metres) {
		if (metres == 0) return this.getPath().getAt(0);
		if (metres < 0) return null;
		if (this.getPath().getLength() < 2) return null;
		var dist = 0;
		var olddist = 0;
		for (var i = 1;
		(i < this.getPath().getLength() && dist < metres); i++) {
			olddist = dist;
			dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
		}
		if (dist < metres) {
			return null;
		}
		var p1 = this.getPath().getAt(i - 2);
		var p2 = this.getPath().getAt(i - 1);
		var m = (metres - olddist) / (dist - olddist);
		return new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m);
	}

	// === A method which returns an array of GLatLngs of points a
	// given
	// interval along the path ===
	google.maps.Polygon.prototype.GetPointsAtDistance = function (metres) {
		var next = metres;
		var points = [];
		if (metres <= 0) return points;
		var dist = 0;
		var olddist = 0;
		for (var i = 1;
		(i < this.getPath().getLength()); i++) {
			olddist = dist;
			dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
			while (dist > next) {
				var p1 = this.getPath().getAt(i - 1);
				var p2 = this.getPath().getAt(i);
				var m = (next - olddist) / (dist - olddist);
				points.push(new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
				next += metres;
			}
		}
		return points;
	}

	// === A method which returns the Vertex number at a given
	// distance along
	// the path ===
	// === Returns null if the path is shorter than the specified
	// distance ===
	google.maps.Polygon.prototype.GetIndexAtDistance = function (metres) {
		// some awkward special cases
		if (metres == 0) return this.getPath().getAt(0);
		if (metres < 0) return null;
		var dist = 0;
		var olddist = 0;
		for (var i = 1;
		(i < this.getPath().getLength() && dist < metres); i++) {
			olddist = dist;
			dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
		}
		if (dist < metres) {
			return null;
		}
		return i;
	}
	
	// === Copy all the above functions to GPolyline ===
	google.maps.Polyline.prototype.Distance = google.maps.Polygon.prototype.Distance;
	google.maps.Polyline.prototype.GetPointAtDistance = google.maps.Polygon.prototype.GetPointAtDistance;
	google.maps.Polyline.prototype.GetPointsAtDistance = google.maps.Polygon.prototype.GetPointsAtDistance;
	google.maps.Polyline.prototype.GetIndexAtDistance = google.maps.Polygon.prototype.GetIndexAtDistance;
	/*------------------------------end of vehicle icon movement------------------------------*/

	function SortByts(x,y) {
		return ((x.ts == y.ts) ? 0 : ((x.ts > y.ts) ? 1 : -1 ));
	}
	
	$scope.givelt = function(lt,lg){
		var geocoder = new google.maps.Geocoder();
		var latLng = new google.maps.LatLng(lt,lg);
		geocoder.geocode({
				latLng: latLng
			}, 
			function(responses){     
				if (responses && responses.length > 0){        
					swal(responses[0].formatted_address);     
				}else{       
					swal('Not getting Any address for given latitude and longitude.');     
				}   
			}
		);
	}
	$(".spdCtrl").click(function() {
		$(".spdCtrl").removeClass("activeCtrl");
		$(this).addClass("activeCtrl");
	});

})