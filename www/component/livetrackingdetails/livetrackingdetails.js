angular.module('livetrackingdetails', [])
	.controller('LiveTrackingDetailsCtrl', function ($scope, $ionicModal, UtilsFactory, $timeout, BatsServices, $state, PageConfig, ChartFactory) {

		$scope.init = function () {
			var inputParam = {};
			
			$scope.selectedDevice = localStorage.getItem("choice");
			console.log($scope.selectedDevice);
			if (UtilsFactory.getLivetrackingDetails().length != 0) {
				$scope.data = UtilsFactory.getLivetrackingDetails();
			}
			inputParam={'devid':$scope.data[0].devid};
			 BatsServices.deviceInfo(inputParam).success(function (response) {
                  $scope.deviceInfo = response
				  console.log("device info "+angular.toJson($scope.deviceInfo));
            }).error(function (error) {
				 if(error.err=='Origin Server returned 504 Status'){
                     ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else{
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
               // ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
			$scope.values = $scope.data[0];
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

			}
		$scope.backToLivetracking = function () {
			$state.go(PageConfig.LIVE_TRACKING)
		}
	})