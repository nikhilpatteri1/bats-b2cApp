angular.module('vehiclestatistics', [])
    .controller('VehicleStatisticsCtrl', function ($scope, BatsServices, ionicToast, $rootScope, $state, $ionicModal, $timeout, PageConfig, UtilsFactory,
        Constants) {

        var inputParam = {};
        $scope.data = {};
        console.log("sadsad");
        BatsServices.activeDeviceList(inputParam).success(function (response) {
            //console.log(JSON.stringify(response));
            $scope.deviceList = response
             if (response.length==0) {
                console.log("inside if for no device");
                ionicToast.show('Active devices are not available', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }
            // else
            //     console.log("inside else for no device");
        }).error(function (error) {
            if (error.err == 'Origin Server returned 504 Status') {
                ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }
            else {
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }// ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
        // ***************** end of fetching devices *****************************
        // $rootScope.dateValue = new Date();
        if ($scope.deviceList === "[]") {
            ionicToast.show('Active device not available', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        }

        $scope.data.startdatetimeValue = new Date();
        $scope.data.enddatetimeValue = new Date();
        $scope.gotoVehicleStatistics = function (data, form) {
            if (data.startdatetimeValue == undefined) {
                data.startdatetimeValue = new Date();
            }
            if (data.enddatetimeValue == undefined) {
                data.enddatetimeValue = new Date();
            }
            console.log($rootScope.datetimeValue + "\n" + data.selectedvehicle + "\n" + data.startdatetimeValue + "\n" + data.enddatetimeValue);
            var startDate = moment(data.startdatetimeValue).valueOf();
            var endDate = moment(data.enddatetimeValue).valueOf();
            //console.log($scope.userid);
            var inputParam = { 'devid': data.selectedvehicle.devid, 'sts': startDate, 'ets': endDate }
            console.log(inputParam);
            BatsServices.vehicleStatistics(inputParam).success(function (response) {
                console.log(response);
                UtilsFactory.setVehicleStatitics(response);
                UtilsFactory.setDateVehicleStatistics(inputParam);
                $state.go(PageConfig.VEHICLE_STATISTICS_DETAIL);
            }).error(function (error) {
                // console.log(error);
                if (error.err == 'Origin Server returned 504 Status') {
                    ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else {
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                } //ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }
    })