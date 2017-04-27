angular.module('eventhistoryfilter', [])
    .controller('EventFilterCtrl', function ($scope, $ionicModal, $timeout, BatsServices, ionicToast, Constants, $state, PageConfig, _) {

        $scope.filter = [{'name' : 'Panic'},{'name' : 'Tamper Sim'},{'name' : 'Tamper Top'},{'name' : 'Battery'},{'name' : 'Overspeed'},
            {'name' : 'Geofence'},{'name' : 'Sanity alarm'}, {'name' : 'Robbery / theft alarm'}, {'name' : 'Undefined'}];
        $scope.allCheck = true;
        $scope.gotoApplyFilter = function (data, form) {
            $state.go(PageConfig.EVENT_HISTORY_DETAIL);
        }

        $scope.gotoEventHistoryDetail = function () {
            $state.go(PageConfig.EVENT_HISTORY_DETAIL);
        }

        for (let i = 0; i < 9; i++) {
            $scope.filter[i].value = true;
        }

        $scope.checkAll = function (allCheck) {
            if (allCheck) {
               
                _.each($scope.filter, function(filter, i){$scope.filter[i].value = true;})
            }
            else {
                _.each($scope.filter, function(filter, i){$scope.filter[i].value = false;})
            }
            console.log($scope.allCheck)
        }

        $scope.checkAllFor = function () {
            console.log($scope.allCheck);
            let count = 0;
            $scope.allCheck = true;
             $('#forCheckAll').attr('checked', true);
            _.each($scope.filter, function(filter, i){
                if ($scope.filter[i].value) {count++;}
            })
            if (count != $scope.filter.length) {
                $scope.allCheck = false;
                 $('#forCheckAll').attr('checked', false);
            }
            $scope.$apply;
            console.log($scope.allCheck);
        }

    })