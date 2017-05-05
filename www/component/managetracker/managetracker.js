angular.module('managetracker', [])
.controller('ManageTrackerCtrl', function($scope, $state, $ionicModal, $timeout, PageConfig, BatsServices, ionicToast,
    Constants, UtilsFactory) {
 if (UtilsFactory.getNotificationDetails()) {
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count = $scope.notificationData.length;
            console.log($scope.count);
            if($scope.count==undefined){
                $scope.count=0;
            }
        }

    function init(){
        let inputParam = {};
        BatsServices.deviceList(inputParam).success(function (response) {
            $scope.trackerList = response
        }).error(function (error) {
            ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        });
    }
    init();

    $scope.$on('manageTrackerList', function(){
        init();
    })

    $scope.gotoHome = function(){
        $state.go(PageConfig.LIVE_TRACKING);
    }

    $scope.addNewDevices  = function(){
        $state.go(PageConfig.SIGNUP_STEP2);
    }
  
})