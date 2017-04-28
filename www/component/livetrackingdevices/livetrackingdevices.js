angular.module('livetrackingdevices', [])
.controller('LiveTrackingDevicesCtrl', function ($scope, $ionicModal, $timeout, BatsServices, PageConfig, 
    UtilsFactory, $state, _, ionicToast) {

    let inputParam = {};
    BatsServices.activeDeviceList(inputParam).success(function (response) {
        $scope.trackerList = response;
        _.each($scope.trackerList, function(tracker,i){
            if(tracker.alarm_type == 0){
                $scope.trackerList[i].statusType = "Geofence";
            }  
            else  if(tracker.alarm_type == 1){
                $scope.trackerList[i].statusType = "Overspeed";
            }  
            else  if(tracker.alarm_type == 2){
                $scope.trackerList[i].statusType = "Geofence & Overspeed";
            }  
            else  if(tracker.alarm_type == 3){
                $scope.trackerList[i].statusType = "Normal";
            }
            else  if(tracker.alarm_type == 4){
                $scope.trackerList[i].statusType = "Out of N/W";
            }   
        })
        
        console.log($scope.trackerList);

    }).error(function (error) {
        ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
    })

    if(localStorage.getItem("choice")){
        $scope.choice = localStorage.getItem("choice");
    }

    $scope.gotoLiveTracking = function(choice){
        localStorage.setItem("choice", choice);
        $state.go(PageConfig.LIVE_TRACKING);
    }  
})