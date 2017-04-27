angular.module('actioncarddirective', [])
.directive('actionCard', function () {
    var getTemplate = function () {
        var template = 'templates/actioncard.html';
        return template;
    };

    var actionController = function($scope, $state, $ionicModal, $rootScope, PageConfig, UtilsFactory, BatsServices,
        ionicToast, Constants) {
        console.log($scope.tracker)
        $scope.getActionTemplateUrl = function(){
            return getTemplate();
        }
        
        $scope.updatemarker = function(tracker){
            UtilsFactory.setManageTrackerDetails(tracker);
            $state.go(PageConfig.UPDATE_MARKER_DETAILS)
        }

        $scope.activateDevice = function(tracker){
            let inputParam = {'devlist': [tracker.devid]}
            BatsServices.activateDevice(inputParam).success(function (response) {
                    // localStorage.setItem(Constants.accessToken, response.token);
                    console.log(response)
                    // $state.go(PageConfig.LIVE_TRACKING);
                    
                }).error(function (error) {
                    ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
        }
        

    };
   
    return {
        template: '<ng-include src="getActionTemplateUrl()"/>',
        restrict: 'E',
        controller: actionController,
        scope: {
            tracker: '=tracker'
        }
    };
});