angular.module('eventhistoryfilter', [])
    .controller('EventFilterCtrl', function ($scope, $ionicModal, $timeout, BatsServices, ionicToast, Constants, $state, PageConfig, _, UtilsFactory) {

        $scope.filter = [{'name' : 'Panic','type' : '0','value' : true},{'name' : 'Tamper Sim','type' : '1','value' : true},
            {'name' : 'Tamper Top','type' : '2','value' : true},{'name' : 'Battery','type' : '3','value' : true},
            {'name' : 'Overspeed','type' : '4','value' : true},{'name' : 'Geofence','type' : '5','value' : true},
            {'name' : 'Sanity alarm','type' : '6','value' : true},{'name' : 'Connection to tracker interrupted','type' : '7','value' : true},
            {'name' : 'Robbery / theft alarm','type' : '8','value' : true},{'name' : 'Undefined','type' : '9','value' : true}];
        $scope.formVal = {
            allCheck: true
        };

        if(UtilsFactory.getHistoryFilterList().length!=0){
            $scope.selectedFilters = UtilsFactory.getHistoryFilterList();
            for (let i = 0; i < 10; i++) {
                $scope.filter[i].value = false;
            }
            if($scope.selectedFilters.length<10){
                $scope.formVal = {
                    allCheck : false
                };
            }
            for(var i=0;i<$scope.selectedFilters.length;i++){
                var filterItem = $scope.selectedFilters[i];
                for(var j=0;j<$scope.filter.length;j++){
                    var filterVal = $scope.filter[j];
                    if(filterItem==filterVal.type){
                        $scope.filter[j].value = true;
                    }
                }
            }
        }else{
            $scope.selectedFilters = [0,1,2,3,4,5,6,7,8,9];
        }

        $scope.gotoApplyFilter = function (data, form) {
            $scope.selectedFilters = [];
            angular.forEach($scope.filter, function (filter) {
                if (filter.value) { $scope.selectedFilters.push(filter.type); }
            })
            $state.go(PageConfig.EVENT_HISTORY_DETAIL);
            UtilsFactory.setHistoryFilterList($scope.selectedFilters);
        }

        if (UtilsFactory.getNotificationDetails()) {
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count = $scope.notificationData.lenght;
            console.log($scope.count);
        }


        $scope.gotoEventHistoryDetail = function () {
            $state.go(PageConfig.EVENT_HISTORY_DETAIL);
        }

        // for (let i = 0; i < 9; i++) {
        //     $scope.filter[i].value = true;
        // }

        $scope.checkAll = function () {
            if ($scope.formVal.allCheck) {
                _.each($scope.filter, function (filter, i) { $scope.filter[i].value = true; })
            }
            else {
                _.each($scope.filter, function (filter, i) { $scope.filter[i].value = false; })
            }
        };

        $scope.checkAllFor = function () {
            let count = 0;
            $scope.formVal.allCheck = true;
            _.each($scope.filter, function (filter, i) {
                if ($scope.filter[i].value) {
                    count++;
                }
            })
            if (count != $scope.filter.length) {
                $scope.formVal.allCheck = false;
            } else {
                $scope.formVal.allCheck = true;
            }
            $scope.$apply;
        };

    })