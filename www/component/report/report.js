angular.module('report', [])
    .controller('ReportCtrl', function ($scope, $rootScope, $ionicModal, $timeout,$ionicPopup, BatsServices, ionicToast, PageConfig, Constants, $state,
        UtilsFactory) {
        //***************************** for fetching device list*****************************
        var inputParam = {};
        console.log("sadsad");
        BatsServices.activeDeviceList(inputParam).success(function (response) {
            //console.log(JSON.stringify(response));
            $scope.deviceList = response
        }).error(function (error) {
            ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
        // ***************** end of fetching devices *****************************
        $rootScope.dateValue = new Date();
        $rootScope.timeValue = new Date();
        $rootScope.datetimeValue = new Date();
        $scope.gotoReport = function (data, form) {
            var alertPopup = $ionicPopup.alert({
                            title: '',
                            template: '<div class="suPopupContent">This feature not implemented </div>'
                            
                        });
                        // alertPopup.then(function (res) {
                        //     $state.go(PageConfig.LOGIN);
                        // });
            // BatsServices.deviceList(inputParam).success(function (response) {
            //     //console.log(JSON.stringify(response));
            //     $scope.deviceList = response
            // }).error(function (error) {
            //     ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            // })
        }

         if (UtilsFactory.getNotificationDetails()) {
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count = UtilsFactory.getNotificationCount();
            console.log($scope.count);
            if($scope.count==undefined){
                $scope.count=0;
                $scope.notificationData=[];
            }
        }

    })