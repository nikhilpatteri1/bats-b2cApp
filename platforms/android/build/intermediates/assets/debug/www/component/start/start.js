angular.module('start', [])
.controller('StartCtrl', function($scope, $state, $ionicModal, $timeout, PageConfig, Constants) {
  

	if(localStorage.getItem(Constants.X_AUTH_TOKEN) != undefined || localStorage.getItem(Constants.X_AUTH_TOKEN) != null ){
			$state.go(PageConfig.LIVE_TRACKING);
	}
	
	$scope.gotoLogin = function(){
		$state.go(PageConfig.LOGIN);
	}

		$scope.gotoSignup = function(){
		$state.go(PageConfig.SIGNUP_STEP1);
	}
})