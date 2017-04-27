angular.module('livetrackingdevices', [])
.controller('LiveTrackingDevicesCtrl', function ($scope, $ionicModal, $timeout,BatsServices) {

    let inputParam = {};
    $scope.trackerList = {};
    console.log("sadsad");
    BatsServices.deviceList(inputParam).success(function (response) {
        $scope.trackerList = response
    }).error(function (error) {
        ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
    })
        
})