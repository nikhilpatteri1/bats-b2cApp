angular.module('eventhistoryfilter', [])
    .controller('EventFilterCtrl', function ($scope, $ionicModal, $timeout, BatsServices, ionicToast, Constants, $state, PageConfig, _) {

        $scope.filter = [{'name' : 'Panic','type' : '0'},{'name' : 'Tamper Sim','type' : '1'},{'name' : 'Tamper Top','type' : '2'},
            {'name' : 'Battery','type' : '3'},{'name' : 'Overspeed','type' : '4'},{'name' : 'Geofence','type' : '5'},
            {'name' : 'Sanity alarm','type' : '6'}, {'name' : 'Robbery / theft alarm','type' : '8'}, {'name' : 'Undefined','type' : '9'}];
        $scope.formVal = {
            allCheck : true
        };
        $scope.gotoApplyFilter = function (data, form) {
            console.log("applied: "+data);
            $scope.selectedFilters = [];
            angular.forEach($scope.filter, function(filter){
                if(filter.value){$scope.selectedFilters.push(filter.type);}
            })
            $state.go(PageConfig.EVENT_HISTORY_DETAIL);
            console.log("arr: "+$scope.selectedFilters);
        }

        $scope.gotoEventHistoryDetail = function () {
            $state.go(PageConfig.EVENT_HISTORY_DETAIL);
        }

        for (let i = 0; i < 9; i++) {
            $scope.filter[i].value = true;
        }

        $scope.checkAll = function(){
            if($scope.formVal.allCheck){
                _.each($scope.filter, function(filter, i){$scope.filter[i].value = true;})
            }
            else {
                _.each($scope.filter, function(filter, i){$scope.filter[i].value = false;})
            }
        };

        $scope.checkAllFor = function(){
            let count = 0;
            $scope.formVal.allCheck = true;
            _.each($scope.filter, function(filter, i){
                if ($scope.filter[i].value){
                    count++;
                }
            })
            if(count != $scope.filter.length){
                $scope.formVal.allCheck = false;
            }else{
                $scope.formVal.allCheck = true;
            }
            $scope.$apply;
        };

    })