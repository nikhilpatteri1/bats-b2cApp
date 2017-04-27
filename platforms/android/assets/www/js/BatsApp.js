angular.module('bats', ['ionic', 'batsconstants', 'batsconfig', 'batsinterceptor', 'batsservices', 'batsdirective', 
  'batscontrollers', 'batsfilters', 'batsfactory'])
.run(function($ionicPlatform, Constants, $rootScope, $state, ionicToast, PageConfig, Messages) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on("400", function (event, message) {
		$rootScope.interlogout();
    ionicToast.show(message, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
  });

  if(localStorage.getItem(Constants.ACCESS_TYPE)!=null){
    		$rootScope.accessType = localStorage.getItem(Constants.ACCESS_TYPE);
  }
  if(localStorage.getItem(Constants.USER_VO)!=null){
      $rootScope.userName = JSON.parse(localStorage.getItem(Constants.USER_VO)).firstname;
      $rootScope.email = JSON.parse(localStorage.getItem(Constants.USER_VO)).email;
  } 
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
   
      if (localStorage.getItem(Constants.accessToken)==null)  {
		      if (next.name == PageConfig.LIVE_TRACKING || next.name == PageConfig.MANAGE_TRACKER || 
              next.name == PageConfig.UPDATE_MARKER_DETAILS || next.name == PageConfig.REPLAY_ROUTE || 
		    		  next.name == PageConfig.EVENT_HISTORY || next.name == PageConfig.EVENT_HISTORY_DETAIL || 
              next.name == PageConfig.VEHICLE_STATISTICS || next.name == PageConfig.VEHICLE_STATISTICS_DETAILS || 
              next.name == PageConfig.NAVIGATION || next.name == PageConfig.REPORT || 
              next.name == PageConfig.MANAGE_MEMBER || next.name == PageConfig.LIVE_TRACKING_DETAILS || 
		    		  next.name == PageConfig.ADD_MEMBER || next.name == PageConfig.CHANGE_PASSWORD ||
              next.name == PageConfig.EVENT_FILTER || next.name == PageConfig.LIVE_TRACKING_DEVICES ||
              next.name == PageConfig.REPLAY_ROUTE_DETAILS) {
		    	      event.preventDefault();
                //  alert("bats", next.name)
                ionicToast.show(Messages.NOT_AUTHORIZED_MESSAGE, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
			          $state.go(PageConfig.LOGIN);
		      }
		    }

    if($rootScope.accessType=="member"){
        if (localStorage.getItem(Constants.accessToken)!=null)  {
		      if (next.name == PageConfig.MANAGE_TRACKER || next.name == PageConfig.UPDATE_MARKER_DETAILS || 
            next.name == PageConfig.REPLAY_ROUTE || next.name == PageConfig.VEHICLE_STATISTICS || 
		    		next.name == PageConfig.VEHICLE_STATISTICS_DETAIL || next.name == PageConfig.NAVIGATION ||
            next.name == PageConfig.REPORT || next.name == PageConfig.MANAGE_MEMBER ||
            next.name == PageConfig.ADD_MEMBER || next.name == PageConfig.REPLAY_ROUTE_DETAILS) {
		    	    event.preventDefault();
              ionicToast.show(Messages.MEMBER_NOT_AUTHORIZED_MESSAGE, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
			        $state.go(PageConfig.LIVE_TRACKING);
		      }
		    }
    }
	});
})

