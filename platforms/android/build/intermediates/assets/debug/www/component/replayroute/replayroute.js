angular.module('replayroute', [])
.controller('ReplayRouteCtrl', function($scope, $rootScope, $state, $ionicModal, $timeout, PageConfig) {
$scope.dummyVehicle=["001","002"];
//  $scope.regex = '/^[a-zA-Z0-9]+$/';
// 	$scope.gotoHome = function(){
// 		$state.go(PageConfig.LIVE_TRACKING);
// 	}

// 	$scope.gotoFogotPassword = function(){
// 		$state.go(PageConfig.FORGOT_PASSWORD);
// 	}
$rootScope.dateValue = new Date();
    $rootScope.timeValue = new Date();
    $rootScope.datetimeValue = new Date();
    
  
})