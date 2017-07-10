angular.module('managetracker', [])
    .controller('ManageTrackerCtrl', function ($scope, $state, $ionicModal, $timeout, PageConfig, BatsServices, ionicToast, $interval,
        Constants, UtilsFactory) {
        var intervaltime = 15;
        function init() {
            var inputParam = {};
            BatsServices.deviceList(inputParam).success(function (response) {
                $scope.trackerList = response;
               // checkDeviceIsPending();
            }).error(function (error) {
                if (error.err == 'Origin Server returned 504 Status') {
                    ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else {
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }// ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            });
        }
        init();

        function checkDeviceIsPending() {
           // $scope.trackerList

            var status = _.findIndex($scope.trackerList, { status: 'Pending' });
            if (status != -1) {
                callDeviceLIstAPI();//  init();
                $scope.countingForActivation++;
            }
        }
        $scope.countingForActivation = 0;
        $scope.$on('manageTrackerList', function () {
            console.log("im redirection from activation" + $scope.countingForActivation);
            // $scope.countingForActivation=1;
            init();
            if ($scope.countingForActivation > 0) {
                intervaltime = intervaltime + $scope.time + 1;
                console.log("interval tie changed to " + intervaltime);
            } else {
                callDeviceLIstAPI();//  init();
            }
            $scope.countingForActivation++;

        })

        //function for keep calling devicelist api after activate device and page is manage tracker
        var deviceListAPi;
        $scope.time = 0;
        function callDeviceLIstAPI() {
            $scope.time = 0;
            console.log("inside manage tracker" + $scope.time);
            deviceListAPi = $interval(devlist, 20000);
            console.log("inside manage " + $scope.time);

        }
        // $scope.count = 0;
        function devlist() {
            $scope.time++;
            if ($state.current.name == PageConfig.MANAGE_TRACKER) {
                var inputParam = {};
                BatsServices.deviceList(inputParam).success(function (response) {
                    $scope.trackerList = response
                    console.log("inside " + $scope.time + " interval lenght " + $interval.length);
                    if ($scope.time === intervaltime) {
                        console.log("inside manage tracker interval end ");
                        init();
                        $interval.cancel(deviceListAPi);
                        $scope.countingForActivation = 0;
                    }
                }).error(function (error) {
                    if (error.err == 'Origin Server returned 504 Status') {
                        ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }
                    else {
                        ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }// ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                });
            } else {
                console.log(" change page inside manage tracker interval end ");
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