angular.module('replayroute', [])
    .controller('ReplayRouteCtrl', function ($scope, $rootScope, $state, $ionicModal, $timeout, PageConfig, BatsServices, Constants, ionicToast,
        UtilsFactory) {


        $scope.data = {};
        $scope.data.startdatetimeValue = new Date();
      
        function init() {
            var inputParam = {};
            BatsServices.activeDeviceList(inputParam).success(function (response) {
                //console.log(JSON.stringify(response));
                $scope.deviceList = response;
                if (response.length==0) {
                    console.log("inside if for no device");
                    ionicToast.show('Active devices are not available', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
            }).error(function (error) {
                if (error.err == 'Origin Server returned 504 Status') {
                    ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else {
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }// ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
            // ***************** end of fetching devices *****************************
        }
        init();

        $scope.gotoReplayRoute = function (data, form) {
            if (form.$valid) {
                var inputParam = { "devid": data.selectedvehicle.devid, "slots": getSlotes(data.startdatetimeValue) };
                BatsServices.historyExist(inputParam).success(function (response) {
                    console.log(JSON.stringify(response));
                    // if(true){
                    //     UtilsFactory.setDataForReplay(response);
                    //     $state.go(PageConfig.REPLAY_ROUTE_DETAILS);
                    // }


                    if (response.values[0].data == true || response.values[1].data == true || response.values[2].data == true || response.values[3].data == true) {
                        UtilsFactory.setDataForReplay(response);
                        $state.go(PageConfig.REPLAY_ROUTE_DETAILS);
                    }
                    else {
                        ionicToast.show("No data avialable for the Selected date");
                    }




                }).error(function (error) {
                    if (error.err == 'Origin Server returned 504 Status') {
                        ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }
                    else {
                        ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }//ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
            }

        }

        function getSlotes(date) {
            console.log(date)
            return [{ "sts": setTimeStamp(date, 00, 00, 00), "ets": setTimeStamp(date, 05, 59, 59) },
            { "sts": setTimeStamp(date, 06, 00, 00), "ets": setTimeStamp(date, 11, 59, 59) },
            { "sts": setTimeStamp(date, 12, 00, 00), "ets": setTimeStamp(date, 17, 59, 59) },
            { "sts": setTimeStamp(date, 18, 00, 00), "ets": setTimeStamp(date, 23, 59, 59) }];
        }

        function setTimeStamp(selectDateTS, hr, mins, sec) {
            var timeStamp = new Date(selectDateTS);
            timeStamp.setHours(hr);
            timeStamp.setMinutes(mins);
            timeStamp.setSeconds(sec);
            return timeStamp.valueOf();
        }
    })