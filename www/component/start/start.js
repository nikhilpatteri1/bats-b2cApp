angular.module('start', [])
.controller('StartCtrl', function($scope, $state, $ionicModal, $timeout, PageConfig, Constants) {
  

    if(localStorage.getItem(Constants.accessToken)){
        localStorage.removeItem(Constants.accessToken)
    }

    if(localStorage.getItem(Constants.ACCESS_TYPE)){
        localStorage.removeItem(Constants.ACCESS_TYPE)
    }

	// if(localStorage.getItem(Constants.X_AUTH_TOKEN) != undefined || localStorage.getItem(Constants.X_AUTH_TOKEN) != null ){
	// 		$state.go(PageConfig.LIVE_TRACKING);
	// }
	
	$scope.gotoLogin = function(){
		$state.go(PageConfig.LOGIN);
	}

		$scope.gotoSignup = function(){
		$state.go(PageConfig.SIGNUP_STEP1);
	}
})