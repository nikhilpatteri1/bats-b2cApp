(function(){
    angular.module('ngLoadingSpinner', ['angularSpinner'])
    .directive('usSpinner',function ($http, $rootScope, $ionicLoading, $state, PageConfig){
        return {
            link: function (scope, elm, attrs)
            {
                $rootScope.spinnerActive = false;
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (loading)
                {
                    $rootScope.spinnerActive = loading;
                    if(loading){
                    		$ionicLoading.show({
                        		noBackdrop: false,
                        	    template: "<img src='img/newLoading.gif' />",
                        	    hideOnStageChange: false
                        	});
                    }else{
                    	 $ionicLoading.hide();
                    }
                });
            }
        };

    });
}).call(this);