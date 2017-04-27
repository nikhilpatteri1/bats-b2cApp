angular.module('batscontrollers', [
  'login', 'start', 'livetracking',
  'forgotpassword', 'changepassword', 'managetracker',
  'signupstep1', 'signupstep2', 'updatemarkerdetails',
  'replayroute', 'eventhistory', 'vehiclestatistics',
  'eventhistorydetail', 'vehiclestatisticsdetail', 'navigation',
  'livetrackingdetails', 'report', 'addmember',
  'managemember', 'livetrackingdevices', 'eventhistoryfilter',
  'replayroutedetail', 'notification',
  'ion-datetime-picker', 'ion-place-tools', 'ionic-toast',
  'underscore', 'ngLoadingSpinner', 'gm'
])

  .controller('BatsCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $state, PageConfig, Constants,
    $ionicPopup, $interval, BatsServices, ionicToast) {

    $scope.openSetting = false;
    $scope.openSettingBar = function () {
        $scope.openSetting = !$scope.openSetting;
    }

    $scope.menuLink = 1;
    $scope.sidebarLinkColor = function (selectedMenuPageNumber) {
        $scope.menuLink = selectedMenuPageNumber;
    }

    $rootScope.interlogout = function () { 
        BatsServices.logout({}).success(function (response) {
            if (localStorage.getItem(Constants.USER_VO)) {
              localStorage.removeItem(Constants.USER_VO);
            }
            if (localStorage.getItem(Constants.accessToken)) {
              localStorage.removeItem(Constants.accessToken);
            }
            if (localStorage.getItem("choice")) {
              localStorage.removeItem("choice");
            }

            if(localStorage.getItem(Constants.ACCESS_TYPE)){
              localStorage.removeItem(Constants.ACCESS_TYPE)
            }
            $scope.menuLink = 1;
            $state.go(PageConfig.LOGIN);
        }).error(function (error) {
            ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
        
    }


    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Logout',
        template: 'Are you sure you want to log out from Bats?',
        cancelText: 'No',
        scope: $scope,
        okText: 'Yes',
      });
      confirmPopup.then(function (res) {
        if (res) {
          $rootScope.interlogout();
        }
      });
    }
  })
