angular.module('login', [])
.controller('LoginCtrl', function($scope, $state, $ionicModal, BatsServices, ionicToast, Constants, $ionicPopup, 
    $timeout, PageConfig) {

    if(window.localStorage.getItem(Constants.accessToken)){
        window.localStorage.removeItem(Constants.accessToken)
    }

    $scope.regex = '/^[a-zA-Z0-9]+$/';
    $scope.Validate = false;
        $scope.gotoHome = function(data, form){
            $scope.Validate = true;
            let inputParam = {'user_id':data.userid, 'password':data.password }
                BatsServices.login(inputParam).success(function (response) {
                    localStorage.setItem(Constants.accessToken, response.token);

                    $state.go(PageConfig.LIVE_TRACKING);
                    
                }).error(function (error) {
                    ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
        }

	$scope.gotoFogotPassword = function(){
		$state.go(PageConfig.FORGOT_PASSWORD);
	}

  
})