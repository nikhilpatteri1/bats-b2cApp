angular.module('eventhistory', [])
    .controller('EventHistoryCtrl', function ($scope, $rootScope, $ionicModal, $timeout, BatsServices, ionicToast, PageConfig, Constants, $state,
        UtilsFactory) {

        // $scope.dummyVehicle = ["BDT_LT_17-001", "BDT_LT_17-002","BDT_LT_17-003", "BDT_LT_17-004"];
        var inputParam = {};
        console.log("sadsad");
        BatsServices.activeDeviceList(inputParam).success(function (response) {
            //console.log(JSON.stringify(response));
            $scope.deviceList = response
        }).error(function (error) {
            ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
        // ***************** end of fetching devices *****************************

     
        $scope.data = {};
        $scope.data.startdatetimeValue = new Date();
        $scope.data.enddatetimeValue = new Date();
             $scope.gotoEventHistory = function (data, form) {
            if (form.$valid) {
                if (data.startdatetimeValue == undefined) {
                    data.startdatetimeValue = new Date();
                }
                if (data.enddatetimeValue == undefined) {
                    data.enddatetimeValue = new Date();
                }

                var startDate = moment(data.startdatetimeValue).valueOf();
                var endDate = moment(data.enddatetimeValue).valueOf();
                var inputParam = { 'devid': data.selectedvehicle.devid, 'sts': startDate, 'ets': endDate }
                UtilsFactory.setEventHistoryList(inputParam);
                $state.go(PageConfig.EVENT_HISTORY_DETAIL);
            }
        }

    })