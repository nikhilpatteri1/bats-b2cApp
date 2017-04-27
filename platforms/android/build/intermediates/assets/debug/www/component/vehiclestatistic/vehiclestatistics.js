angular.module('vehiclestatistics', [])
    .controller('VehicleStatisticsCtrl', function ($scope, BatsServices, ionicToast, $rootScope, $state, $ionicModal, $timeout, PageConfig, UtilsFactory, Constants) {

        $scope.dummyVehicle = ["BDT_LT_17-001", "BDT_LT_17-002", "BDT_LT_17-003", "BDT_LT_17-004"];

        $rootScope.dateValue = new Date();
        $rootScope.timeValue = new Date();
        $rootScope.datetimeValue = new Date();
        $scope.gotoVehicleStatistics = function (data, form) {
            if (data.startdatetimeValue == undefined) {
                data.startdatetimeValue = new Date();
            }
            if (data.enddatetimeValue == undefined) {
                data.enddatetimeValue = new Date();
            }
            console.log( $rootScope.datetimeValue + "\n" + data.selectedvehicle + "\n" + data.startdatetimeValue + "\n" + data.enddatetimeValue);
            var startDate = moment(data.startdatetimeValue).valueOf();
            var endDate = moment(data.enddatetimeValue).valueOf();
            //console.log($scope.userid);
            let inputParam = { 'devid': data.selectedvehicle, 'sts': startDate, 'ets': endDate }
            console.log(inputParam);
            BatsServices.vehicleStatistics(inputParam).success(function (response) {
                console.log(response);
                UtilsFactory.setVehicleStatitics(response);
                $state.go(PageConfig.VEHICLE_STATISTICS_DETAIL);
            }).error(function (error) {
                // console.log(error);
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }
    })