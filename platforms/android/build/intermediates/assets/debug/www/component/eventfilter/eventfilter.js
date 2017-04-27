angular.module('eventhistoryfilter', [])
.controller('EventFilterCtrl', function ($scope, $ionicModal, $timeout, BatsServices, ionicToast, Constants, $state, PageConfig) {

    $scope.filter = [];
    $scope.allCheck = false;
    $scope.gotoApplyFilter=function(data,form){
            $state.go(PageConfig.EVENT_HISTORY_DETAIL); 
    }

    $scope.gotoEventHistoryDetail=function(){
        $state.go(PageConfig.EVENT_HISTORY_DETAIL);
    }

    for(let i = 0;i<9 ; i++){
        console.log($scope.filter[i]);
        $scope.filter[i] = false;
    }
    
    $scope.checkAll = function(allCheck){
        console.log($scope.filter);
        if(allCheck){
            for(let i in $scope.filter){
                console.log($scope.filter[i]);
                $scope.filter[i] = true;
            }
        }
        else{
             for(let i in $scope.filter){
                $scope.filter[i] = false;
            }
        }
    }

    $scope.checkAllFor = function(){
        let count = 0;
         $scope.allCheck = true;
        for(let i in $scope.filter){
                if($scope.filter[i]){
                    count++;
                }
        }
        console.log(count, $scope.filter, count === $scope.filter.length)
        if(count != $scope.filter.length){
            $scope.allCheck = false;
        }
        else{
           
        }
         console.log(count, $scope.allCheck)
    }

})