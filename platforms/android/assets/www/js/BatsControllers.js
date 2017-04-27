angular.module('batscontrollers', [
                                    'login',
                                    'start',
                                    'livetracking',
                                    'forgotpassword',
                                    'changepassword',
                                    'managetracker',
                                    'signupstep1',
                                    'signupstep2',
                                    'updatemarkerdetails',
                                    'replayroute',
                                    'eventhistory',
                                    'vehiclestatistics',
                                    'eventhistorydetail',
                                    'vehiclestatisticsdetail',
                                    'navigation',
                                    'livetrackingdetails',
                                    'report',
                                    'addmember',
                                    'managemember',
                                     "ion-datetime-picker",
                                    'ion-place-tools',
                                    'report','addmember','managemember',
                                    'ionic-toast',
                                    'livetrackingdevices',
                                    'eventhistoryfilter',
                                    'replayroutedetail'
])

.controller('BatsCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state, PageConfig, Constants, 
  $ionicPopup) {

  $scope.openSetting = false;
  $scope.openSettingBar = function(){
    $scope.openSetting = !$scope.openSetting;
  }

  $scope.menuLink = 1;
	$scope.sidebarLinkColor = function(selectedMenuPageNumber) {
		$scope.menuLink = selectedMenuPageNumber;
	}

    $rootScope.interlogout = function(){
      if($cookies.get('username')){
        $cookies.remove('username');
      }
      if($cookies.get(Constants.accessToken)){
        $cookies.remove(Constants.accessToken);
      }
      $scope.menuLink = 1;
      $state.go(PageConfig.LOGIN);
  }
  

  $scope.logout = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Logout', 
        template: 'Are you sure you want to log out from Bats?',
        cancelText: 'No',
        scope: $scope,
        okText:  'Yes',
      });
      confirmPopup.then(function(res) {
        if(res) {
            $rootScope.interlogout();
        } 
      });
  }
})
