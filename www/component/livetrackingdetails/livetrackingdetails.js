angular.module('livetrackingdetails', [])
	.controller('LiveTrackingDetailsCtrl', function ($scope, $ionicModal, UtilsFactory, $timeout, BatsServices, $state, PageConfig, ChartFactory) {

		// if (UtilsFactory.getLivetrackingDetails().length == 0) {
		// $state.go(PageConfig.LIVE_TRACKING)
		// }
		//  ChartFactory.solidGaugeChartData.data("widgetId2", "#fbbf16", parseInt(45), 0, 200, "Avg");

		if (UtilsFactory.getNotificationDetails()) {
			console.log(UtilsFactory.getNotificationDetails());
			$scope.notificationData = UtilsFactory.getNotificationDetails();
			$scope.count = $scope.notificationData.length;
			console.log($scope.count);
			if ($scope.count == undefined) {
				$scope.count = 0;
			}
		}



		$scope.init = function () {
			$scope.selectedDevice = localStorage.getItem("choice");
			console.log($scope.selectedDevice);
			if (UtilsFactory.getLivetrackingDetails().length != 0) {
				$scope.data = UtilsFactory.getLivetrackingDetails();
			}
			$scope.values = $scope.data[0];
			//	$scope.v=$scope.values.devtype;
			console.log("vehicle data: " + angular.toJson($scope.values.speed_limit));
			console.log($scope.values);
			$scope.status = $scope.data[0].values.type;
			if ($scope.status == 0) {
				$scope.statusType = 'Geofence Cross';
			}
			else if ($scope.status == 1) {
				$scope.statusType = 'OverSpeed';
			}
			else if ($scope.status == 2) {
				$scope.statusType = 'Crossed Geofence and Speed';
			}
			else if ($scope.status == 3) {
				$scope.statusType = 'Running Normal';
			}
			else if ($scope.status == 4) {
				$scope.statusType = 'No Responce';
			}
			$scope.ts = $scope.data[0].values.ts;//$filter('asda')(value)

			angular.element(document).ready(function () {
				var chart = {
					type: 'solidgauge'
				};
				var title = null;

				var pane = {
					center: ['50%', '85%'],
					size: '140%',
					startAngle: -90,
					endAngle: 90,
					background: {
						backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
						innerRadius: '60%',
						outerRadius: '100%',
						shape: 'arc'
					}
				};

				var tooltip = {
					enabled: false
				};

				// the value axis
				var yAxis = {
					stops: [
						[0.1, '#55BF3B'], // green
						[0.5, '#DDDF0D'], // yellow
						[0.9, '#DF5353'] // red
					],
					lineWidth: 0,
					minorTickInterval: null,
					tickPixelInterval: 400,
					tickWidth: 0,
					title: {
						y: -70
					},
					labels: {
						y: 16
					},
					min: 0,
					max: 200,
					title: {
						text: 'Speed'
					}
				};

				var plotOptions = {
					solidgauge: {
						dataLabels: {
							y: 5,
							borderWidth: 0,
							useHTML: true
						}
					}
				};

				var credits = {
					enabled: false
				};

				var series = [{
					name: 'Speed',
					data: [0],
					dataLabels: {
						format: '<div style="text-align:center"><span style="font-size:25px;color:' +
						((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
						'<span style="font-size:12px;color:silver">km/h</span></div>'
					},
					tooltip: {
						valueSuffix: ' km/h'
					}
				}];

				var json = {};
				json.chart = chart;
				json.title = title;
				json.pane = pane;
				json.tooltip = tooltip;
				json.yAxis = yAxis;
				json.credits = credits;
				json.series = series;
				$('#container-speed').highcharts(json);

				var chartFunction = function () {
					// Speed
					var chart = $('#container-speed').highcharts();
					var point;
					var newVal;
					var inc;

					if (chart) {
						point = chart.series[0].points[0];
						point.update($scope.data[0].values.Velocity);
					}
				};
				setInterval(chartFunction, 2000);
			});
		}
		$scope.backToLivetracking = function () {
			$state.go(PageConfig.LIVE_TRACKING)
		}
	})
// 	$scope.Options = {

//     chart: {
//         type: 'gauge',
//         plotBackgroundColor: null,
//         plotBackgroundImage: null,
//         plotBorderWidth: 0,
//         plotShadow: false
//     },

//     title: {
//         text: 'Speedometer'
//     },

//     pane: {
//         startAngle: -150,
//         endAngle: 150,
//         background: [{
//             backgroundColor: {
//                 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
//                 stops: [
//                     [0, '#FFF'],
//                     [1, '#333']
//                 ]
//             },
//             borderWidth: 0,
//             outerRadius: '109%'
//         }, {
//             backgroundColor: {
//                 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
//                 stops: [
//                     [0, '#333'],
//                     [1, '#FFF']
//                 ]
//             },
//             borderWidth: 1,
//             outerRadius: '107%'
//         }, {
//             // default background
//         }, {
//             backgroundColor: '#DDD',
//             borderWidth: 0,
//             outerRadius: '105%',
//             innerRadius: '103%'
//         }]
//     },

//     // the value axis
//     yAxis: {
//         min: 0,
//         max: 200,

//         minorTickInterval: 'auto',
//         minorTickWidth: 1,
//         minorTickLength: 10,
//         minorTickPosition: 'inside',
//         minorTickColor: '#666',

//         tickPixelInterval: 30,
//         tickWidth: 2,
//         tickPosition: 'inside',
//         tickLength: 10,
//         tickColor: '#666',
//         labels: {
//             step: 2,
//             rotation: 'auto'
//         },
//         title: {
//             text: 'km/h'
//         },
//         plotBands: [{
//             from: 0,
//             to: 120,
//             color: '#55BF3B' // green
//         }, {
//             from: 120,
//             to: 160,
//             color: '#DDDF0D' // yellow
//         }, {
//             from: 160,
//             to: 200,
//             color: '#DF5353' // red
//         }]        
//     },

//     series: [{
//         name: 'Speed',
//         data: [60],
//         tooltip: {
//             valueSuffix: ' km/h'
//         }
//     }]

//   };
//   setInterval(function () {
//     $scope.Options.series[0].data = [0 + Math.floor(Math.random() * (200 - 0 + 1))];
//     console.log('FROM CONTROLLER', $scope.Options.series[0].data);
//   }, 10000);


// angular.element(document).ready(function() {  
//    var chart = {      
//       type: 'solidgauge'
//    };
//    var title = null;

//    var pane = {
//       center: ['50%', '85%'],
//       size: '140%',
//       startAngle: -90,
//       endAngle: 90,
//       background: {
//          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
//          innerRadius: '60%',
//          outerRadius: '100%',
//          shape: 'arc'
//       }
//    };

//    var tooltip = {
//       enabled: false
//    };

//    // the value axis
//    var yAxis = {
//       stops: [
//          [0.1, '#55BF3B'], // green
//          [0.5, '#DDDF0D'], // yellow
//          [0.9, '#DF5353'] // red
//       ],
//       lineWidth: 0,
//       minorTickInterval: null,
//       tickPixelInterval: 400,
//       tickWidth: 0,
//       title: {
//          y: -70
//       },
//       labels: {
//          y: 16
//       },
// 	  min: 0,
//       max: 200,
//       title: {
//          text: 'Speed'
//       }
//    };	  

//    var plotOptions = {
//       solidgauge: {
//          dataLabels: {
//             y: 5,
//             borderWidth: 0,
//             useHTML: true
//          }
//       }
//    };

//    var credits = {
//       enabled: false
//    };

//    var series = [{
//       name: 'Speed',
//       data: [0],
//       dataLabels: {
//          format: '<div style="text-align:center"><span style="font-size:25px;color:' +
//          ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
//          '<span style="font-size:12px;color:silver">km/h</span></div>'
//       },
//       tooltip: {
//          valueSuffix: ' km/h'
//       }
//    }];

//    var json = {};   
//    json.chart = chart; 
//    json.title = title;       
//    json.pane = pane; 
//    json.tooltip = tooltip; 
//    json.yAxis = yAxis; 
//    json.credits = credits; 
//    json.series = series;     
//    $('#container-speed').highcharts(json);   


//    // the value axis
//    yAxis = {
//       stops: [
//          [0.1, '#55BF3B'], // green
//          [0.5, '#DDDF0D'], // yellow
//          [0.9, '#DF5353'] // red
//       ],
//       lineWidth: 0,
//       minorTickInterval: null,
//       tickPixelInterval: 400,
//       tickWidth: 0,
//       title: {
//          y: -70
//       },
//       labels: {
//          y: 16
//       },
// 	  min: 0,
//       max: 5,
//       title: {
//          text: 'RPM'
//       }
//    };	  

//    series = [{
//       name: 'RPM',
//       data: [1],
//       dataLabels: {
//          format: '<div style="text-align:center"><span style="font-size:25px;color:' +
//          ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
//          '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
//       },
//       tooltip: {
//          valueSuffix: ' revolutions/min'
//       }
//    }];

//    json.yAxis = yAxis;   
//    json.series = series;     
//    $('#container-rpm').highcharts(json);  

//    var chartFunction = function() {
//       // Speed
//       var chart = $('#container-speed').highcharts();
//       var point;
//       var newVal;
//       var inc;

//       if (chart) {
//          point = chart.series[0].points[0];
//         //  inc = Math.round((Math.random() - 0.5) * 100);
//         //  newVal = point.y + inc;

//         //  if (newVal < 0 || newVal > 200) {
//         //     newVal = point.y - inc;
//         //  }
//         //  point.update(newVal);
// 		point.update($scope.data[0].values.Velocity);
//       }

//       // RPM
//       chart = $('#container-rpm').highcharts();
//       if (chart) {
//          point = chart.series[0].points[0];
//          inc = Math.random() - 0.5;
//          newVal = point.y + inc;

//          if (newVal < 0 || newVal > 5) {
//             newVal = point.y - inc;
//          }

//          point.update(newVal);
//       }
//    };   

//    // Bring life to the dials
//    setInterval(chartFunction, 2000);
// });

//         $scope.getColorBack = function (div) {
// 		//			console.log(div)

// 		if (div == "0") {
// 			setTimeout(function () {
// 				$scope.singleImg_url = "../images/mapIcon/geofenceStatus.png";
// 				//$(".barStyleSingle").css("background-color", "#f44336");
// 				$scope.barTxt = "Crossed Geofence";
// 				$(".lvdstatusColor").css("background-color", "#710e9f");

// 			}, 7000);
// 		}
// 		else if (div == "1") {
// 			$scope.singleImg_url = "../images/mapIcon/speed-limit.png";
// 			$scope.barTxt = "Crossed Speed";
// 			$(".lvdstatusColor").css("background-color", "#ffd500");
// 			//$(".barStyleSingle").css("background-color", "#ffde01");
// 		}
// 		else if (div == "2") {
// 			$scope.singleImg_url = "../images/mapIcon/warning.png";
// 			$scope.barTxt = "Crossed Geofence and Speed";
// 			$(".lvdstatusColor").css("background-color", "#ff0000");
// 			//$(".barStyleSingle").css("background-color", "#e59305");
// 		}
// 		else if (div == "3") {
// 			$scope.singleImg_url = "../images/mapIcon/normal.png";
// 			$scope.barTxt = "Normal State";
// 			$(".lvdstatusColor").css("background-color", "#7fbb01");
// 			//$(".barStyleSingle").css("background-color", "#000000");
// 		}
// 		else if (div == "4") {
// 			$scope.singleImg_url = "../images/mapIcon/no-response.png";
// 			$scope.barTxt = "No-Response State";
// 			$(".lvdstatusColor").css("background-color", "#2d2d2d");
// 			//$(".barStyleSingle").css("background-color", "#0540E5");
// 		}
// 		//$scope.status=0;//0,1,2,3,4
// 		if ($scope.status == 0) {
// 			$scope.statusType = 'Geofence Cross';
// 		}
// 		else if ($scope.status == 1) {
// 			$scope.statusType = 'OverSpeed';
// 		}
// 		else if ($scope.status == 2) {
// 			$scope.statusType = 'Crossed Geofence and Speed';
// 		}
// 		else if ($scope.status == 3) {
// 			$scope.statusType = 'Running Normal';
// 		}
// 		else if ($scope.status == 4) {
// 			$scope.statusType = 'No Responce';
// 		}
// 		$scope.ts = '1492576783509';//$filter('asda')(value)
// 	}




//         //$scope.status=0;//0,1,2,3,4
//         if($scope.status == 0) {
// 	$scope.statusType = 'Geofence Cross';
// }
// else if ($scope.status == 1) {
// 	$scope.statusType = 'OverSpeed';
// }
// else if ($scope.status == 2) {
// 	$scope.statusType = 'Crossed Geofence and Speed';
// }
// else if ($scope.status == 3) {
// 	$scope.statusType = 'Running Normal';
// }
// else if ($scope.status == 4) {
// 	$scope.statusType = 'No Responce';
// }