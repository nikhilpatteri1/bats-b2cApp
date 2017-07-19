(function(){
    angular.module('ngLoadingSpinner', ['angularSpinner'])
    .directive('usSpinner',function ($http, $rootScope, $ionicLoading, $state, PageConfig){
        return {
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };
                console.log($http.cofig)
                scope.$watch(scope.isLoading, function (loading)
                {
                    if(loading && !$state.is(PageConfig.LIVE_TRACKING)){
                    		$ionicLoading.show({
                        		noBackdrop: false,
                        	    template: "<img src='img/waiting_spinner32.gif' width=60 height=40  />",
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