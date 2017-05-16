angular.module('managetracker', [])
    .controller('ManageTrackerCtrl', function ($scope, $state, $ionicModal, $timeout, PageConfig, BatsServices, ionicToast, $interval,
        Constants, UtilsFactory) {
        if (UtilsFactory.getNotificationDetails()) {
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count = UtilsFactory.getNotificationCount();
            console.log($scope.count);
            if ($scope.count == undefined) {
                $scope.count = 0;
                $scope.notificationData = [];
            }
        }

        function init() {
            var inputParam = {};
            BatsServices.deviceList(inputParam).success(function (response) {
                $scope.trackerList = response
            }).error(function (error) {
                ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            });
        }
        init();

        $scope.countingForActivation=0;
        $scope.$on('manageTrackerList', function () {
             console.log("im redirection from activation"+$scope.countingForActivation);
           // $scope.countingForActivation=1;
            init();
            if($scope.countingForActivation>0){

            }else{
                 callDeviceLIstAPI();//  init();
            }
            $scope.countingForActivation++;
           
        })

        //function for keep calling devicelist api after activate device and page is manage tracker
        var deviceListAPi;
        $scope.time = 0;
        function callDeviceLIstAPI() {
            $scope.time = 0;
            console.log("inside manage tracker"+$scope.time);
            deviceListAPi = $interval(devlist, 20000);
            console.log("inside manage " + $scope.time);

        }
        $scope.count = 0;
        function devlist() {
            $scope.time++;
            if ($state.current.name == PageConfig.MANAGE_TRACKER) {
                var inputParam = {};
                BatsServices.deviceList(inputParam).success(function (response) {
                    $scope.trackerList = response
                    console.log("inside " + $scope.time+" interval lenght "+$interval.length);
                    if ($scope.time === 15) {
                        console.log("inside manage tracker interval end ");
                        $interval.cancel(deviceListAPi);
                    }
                }).error(function (error) {
                    ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                });
            } else {
                console.log("inside manage tracker interval end ");
                $interval.cancel(deviceListAPi);
            }
        }


        $scope.gotoHome = function () {
            $state.go(PageConfig.LIVE_TRACKING);
        }

        $scope.addNewDevices = function () {
            $state.go(PageConfig.SIGNUP_STEP2);
        }

    })