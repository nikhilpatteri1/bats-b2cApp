angular.module('livetrackingdevices', [])
    .controller('LiveTrackingDevicesCtrl', function ($scope, $ionicModal, $timeout, BatsServices, PageConfig, Constants,
        UtilsFactory, $state, _, ionicToast) {

        var inputParam = {};
        BatsServices.activeDeviceList(inputParam).success(function (response) {
            $scope.trackerList = response;
             if (response.length==0) {
                console.log("inside if for no device");
                ionicToast.show('Active devices are not available', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }
            _.each($scope.trackerList, function (tracker, i) {
                if (tracker.alarm_type == '0') {
                    $scope.trackerList[i].statusType = "Geofence";
                }
                else if (tracker.alarm_type == '1') {
                    $scope.trackerList[i].statusType = "Overspeed";
                }
                else if (tracker.alarm_type == '2') {
                    $scope.trackerList[i].statusType = "Geofence & Overspeed";
                }
                else if (tracker.alarm_type == '3') {
                    $scope.trackerList[i].statusType = "Normal";
                }
                else if (tracker.alarm_type == '4') {
                    $scope.trackerList[i].statusType = "Out of N/W";
                } else {
                    $scope.trackerList[i].statusType = "Out of N/W";
                    tracker.alarm_type = '4';
                }
            })

           // console.log($scope.trackerList);

        }).error(function (error) {
            if (error.err == 'Origin Server returned 504 Status') {
                ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }
            else {
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }// ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })

        if (localStorage.getItem("choice")) {
            $scope.choice = localStorage.getItem("choice");
        }

        $scope.gotoLiveTracking = function (choice) {
            localStorage.setItem("choice", choice);
            $state.go(PageConfig.LIVE_TRACKING);
        }
    })