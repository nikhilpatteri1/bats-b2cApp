angular.module('managetracker', [])
.controller('ManageTrackerCtrl', function($scope, $state, $ionicModal, $timeout, PageConfig, BatsServices, ionicToast,
    Constants) {

    let inputParam = {};
    console.log("sadsad");
    BatsServices.deviceList(inputParam).success(function (response) {
        $scope.trackerList = response
    }).error(function (error) {
        ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
    })
  
    $scope.gotoHome = function(){
        $state.go(PageConfig.LIVE_TRACKING);
    }

    $scope.addNewDevices  = function(){
        $state.go(PageConfig.SIGNUP_STEP2);
    }
  
})