angular.module('eventhistory', [])
.controller('EventHistoryCtrl', function ($scope, $rootScope, $ionicModal, $timeout, BatsServices, ionicToast, PageConfig, Constants, $state, 
        UtilsFactory) {

        $scope.dummyVehicle = ["BDT_LT_17-001", "BDT_LT_17-002","BDT_LT_17-003", "BDT_LT_17-004"];


        $rootScope.dateValue = new Date();
        $rootScope.timeValue = new Date();
        $rootScope.datetimeValue = new Date();
         $rootScope.startDatetimeValue = new Date();
        $scope.data = {};
        //  { "token" :<token>, "devid": <devid>, "sts" : <time in msec>, "ets" : <time in msec> }


        $scope.gotoEventHistory = function (data, form) {
            if(data.startdatetimeValue==undefined){
                data.startdatetimeValue = new Date();
            }
            if(data.enddatetimeValue==undefined){
                data.enddatetimeValue = new Date();
            }

            console.log( $rootScope.startDatetimeValue+$rootScope.datetimeValue +"\n"+ data.selectedvehicle +"\n"+ data.startdatetimeValue +"\n"+ data.enddatetimeValue);
            var startDate= moment(data.startdatetimeValue).valueOf();
             var endDate= moment(data.enddatetimeValue).valueOf();
            //console.log($scope.userid);
            let inputParam = { 'devid': data.selectedvehicle, 'sts': startDate, 'ets': endDate }
            console.log(inputParam);
            BatsServices.eventHistory(inputParam).success(function (response) {
                console.log(response);
                UtilsFactory.setEventHistoryList(response);
                $state.go(PageConfig.EVENT_HISTORY_DETAIL);
            }).error(function (error) {
                // console.log(error);
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }


    })