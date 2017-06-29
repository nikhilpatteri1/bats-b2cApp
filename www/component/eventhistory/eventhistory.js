angular.module('eventhistory', [])
    .controller('EventHistoryCtrl', function ($scope, $rootScope, $ionicModal, $timeout, BatsServices, ionicToast, PageConfig, Constants, $state,
        UtilsFactory) {

        // $scope.dummyVehicle = ["BDT_LT_17-001", "BDT_LT_17-002","BDT_LT_17-003", "BDT_LT_17-004"];
        var inputParam = {};
        // console.log("sadsad");
        BatsServices.activeDeviceList(inputParam).success(function (response) {
            //console.log(JSON.stringify(response));
            $scope.deviceList = response
             if (response) {
                console.log("inside if for no device");
                ionicToast.show('Active devices are not available', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }
        }).error(function (error) {
            ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
        // ***************** end of fetching devices *****************************


        $scope.data = {};
        if($scope.data.startdatetimeValue==undefined){
             $scope.data.startdatetimeValue = new Date();
        }
      //  $scope.data.startdatetimeValue = new Date();
        $scope.data.enddatetimeValue = new Date();
        $scope.gotoEventHistory = function (data, form) {
            if (form.$valid) {
                if (data.startdatetimeValue == undefined) {
                    data.startdatetimeValue = new Date();
                }
                if (data.enddatetimeValue == undefined) {
                    data.enddatetimeValue = new Date();
                }
                UtilsFactory.setHistoryFilterList([]);       
                var startDate = moment(data.startdatetimeValue).valueOf();
                var endDate = moment(data.enddatetimeValue).valueOf();
                var inputParam = { 'devid': data.selectedvehicle.devid, 'sts': startDate, 'ets': endDate }
                // UtilsFactory.setSelectedEventHistoryDetails(inputParam);
                BatsServices.eventHistory(inputParam).success(function (response) {
                    // $scope.eventHistoryValues = response.values;
                    // $scope.speed = response.speed_limit;
                    UtilsFactory.setEventHistoryList(response);
                    $state.go(PageConfig.EVENT_HISTORY_DETAIL);
                    //console.log("\n gdgj" +$scope.speed+$scope.eventHistoryValues);
                    // if ($scope.eventHistoryValues.length == 0) {
                    //     $scope.noData = true;
                    // }
                }).error(function (error) {
                    if (error.err == 'Origin Server returned 504 Status') {
                        ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }
                    else {
                        ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }
                    //ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
            }

            // var startDate = moment(data.startdatetimeValue).valueOf();
            // var endDate = moment(data.enddatetimeValue).valueOf();
            // var inputParam = { 'devid': data.selectedvehicle.devid, 'sts': startDate, 'ets': endDate }
            // UtilsFactory.setEventHistoryList(inputParam);
            // $state.go(PageConfig.EVENT_HISTORY_DETAIL);
        }


    })