angular.module('livetrackingdetails', [])
	.controller('LiveTrackingDetailsCtrl', function ($scope, $ionicModal, UtilsFactory, $timeout, BatsServices, $state, PageConfig, ChartFactory) {

		if (UtilsFactory.getNotificationDetails()) {
			console.log(UtilsFactory.getNotificationDetails());
			$scope.notificationData = UtilsFactory.getNotificationDetails();
			$scope.count = UtilsFactory.getNotificationCount();
			console.log($scope.count);
			if ($scope.count == undefined) {
				$scope.count = 0;
				$scope.notificationData=[];
			}
		}

		$scope.init = function () {
			$scope.selectedDevice = localStorage.getItem("choice");
			console.log($scope.selectedDevice);
			if (UtilsFactory.getLivetrackingDetails().length != 0) {
				$scope.data = UtilsFactory.getLivetrackingDetails();
			}
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