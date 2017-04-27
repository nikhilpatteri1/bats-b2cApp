angular.module('addmarkerdirective', [])
.directive('addMarker', function () {
    var getTemplate = function () {
        var template = 'templates/addMarker.html';
        return template;
    };

    var actionController = function($scope, $state, $ionicModal, $rootScope, PageConfig) {

        $scope.getActionTemplateUrl = function(){
            return getTemplate();
        }
        
        $scope.updatemarker = function(){
            $state.go(PageConfig.UPDATE_MARKER_DETAILS)
        }

    };
   
    return {
        template: '<ng-include src="getActionTemplateUrl()"/>',
        restrict: 'E',
        controller: actionController,
        scope: {
            action: '=action'
        }
    };
});