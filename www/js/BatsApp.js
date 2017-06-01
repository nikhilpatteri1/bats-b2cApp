  var db = null;
  angular.module('bats', ['ionic', 'batsconstants', 'batsconfig', 'batsinterceptor', 'batsservices', 'batsdirective',
  'batscontrollers', 'batsfilters', 'batsfactory', 'ngCordova'])
  .run(function ($ionicPlatform, Constants, $rootScope, $state, ionicToast, PageConfig,  Messages, $ionicPopup, $cordovaSQLite, $cordovaLocalNotification) {
  
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
        
      }
         
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

        // Check for network connection
    // if(window.Connection) {
    //   if(navigator.connection.type == Connection.NONE) {
    //     $ionicPopup.confirm({
    //       title: 'No Internet Connection',
    //       content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
    //     })
    //     .then(function(result) {
    //       if(!result) {
    //         ionic.Platform.exitApp();
    //       }
    //     });
    //   }
    // }
      
      db = $cordovaSQLite.openDB({name:"BATS.db",iosDatabaseLocation:'default'});
	 	  $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Token (token varchar)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Notification (data text)");
    });

// ********************** internet checking******************************
// $scope.internetAvailable=false;  
//     $scope.interCheckInterval=$interval(function(){
//     	console.log("checking Internet connection in netCheck");
//         var type = $cordovaNetwork.getNetwork()
//        // alert("type " + type);
//         var isOnline = $cordovaNetwork.isOnline()
//         //alert("isOnline " + isOnline);
//         var isOffline = $cordovaNetwork.isOffline()
//         //alert("isOffline " + isOffline);    
//         // listen for Online event
//         $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
//             var onlineState = networkState;
//            /* alert("redirecting to login page");
//             $window.location.redirect='index.html';*/
//         });+
//           // listen for Offline event
//         $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
//             var offlineState = networkState;
//          });
//     	if(isOnline){
//     		$scope.internetAvailable=true;
//     		console.log("internet available"+$scope.internetAvailable);
//     		$interval.cancel($scope.interCheckInterval);
//     		$window.location.href='index.html';    	
//     	}
//     },10*1000);
//  $scope.refresh=function(){
// 	  //alert("checking Internet connection in netCheck");
// 	    var type = $cordovaNetwork.getNetwork()
// 	   // alert("type " + type);
// 	    var isOnline = $cordovaNetwork.isOnline()
// 	    //alert("isOnline " + isOnline);
// 	    var isOffline = $cordovaNetwork.isOffline()
// 	    //alert("isOffline " + isOffline);    
// 	    // listen for Online event
// 	    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
// 	        var onlineState = networkState;
// 	       /* alert("redirecting to login page");
// 	        $window.location.redirect='index.html';*/
// 	    });
// 	      // listen for Offline event
// 	    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
// 	        var offlineState = networkState;
// 	     });
//     if(isOnline){
//         //alert("redirecting");
//         $window.location.href='index.html';
//         //navigator.app.loadUrl("file:///android_asset/www/net.html");
//     }
//     else{
//       $ionicPopup.confirm({
//           title: 'No Internet Connection',
//           content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
//         });
//     }      //alert("checked Internet connection");    
//     }




    $rootScope.$on("400", function (event, message) {
      $rootScope.interlogout();
      ionicToast.show(message, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
    });

    if (localStorage.getItem(Constants.ACCESS_TYPE) != null) {
      $rootScope.accessType = localStorage.getItem(Constants.ACCESS_TYPE);
    }
    if (localStorage.getItem(Constants.USER_VO) != null) {
      $rootScope.userName = JSON.parse(localStorage.getItem(Constants.USER_VO)).firstname;
      $rootScope.email = JSON.parse(localStorage.getItem(Constants.USER_VO)).email;
    }
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

      if (localStorage.getItem(Constants.accessToken) == null) {
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

      if ($rootScope.accessType == "member") {
        if (localStorage.getItem(Constants.accessToken) != null) {
          if (next.name == PageConfig.MANAGE_TRACKER || next.name == PageConfig.UPDATE_MARKER_DETAILS ||
            next.name == PageConfig.REPLAY_ROUTE || next.name == PageConfig.VEHICLE_STATISTICS ||
            next.name == PageConfig.VEHICLE_STATISTICS_DETAIL || next.name == PageConfig.NAVIGATION ||
            next.name == PageConfig.REPORT || next.name == PageConfig.MANAGE_MEMBER ||
            next.name == PageConfig.ADD_MEMBER || next.name == PageConfig.REPLAY_ROUTE_DETAILS) {
            event.preventDefault();
           // ionicToast.show(Messages.MEMBER_NOT_AUTHORIZED_MESSAGE, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            $state.go(PageConfig.LIVE_TRACKING);
          }
        }
      }
    });

    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($state.current.name == PageConfig.START) {
        var confirmPopup = $ionicPopup.confirm({
          title: "Exit",
          template: "Are you sure want to exit ?",
          cancelText: "No",
          scope: $rootScope,
          okText: "Yes",
        });
        confirmPopup.then(function (res) {
          if (res) {
            navigator.app.exitApp();
          }
        });
      }
      else if ($state.current.name == PageConfig.SIGNUP_STEP1 ||
        $state.current.name == PageConfig.LOGIN) {
        $state.go(PageConfig.START);
      }
      else if ($state.current.name == PageConfig.LIVE_TRACKING) {
        navigator.app.exitApp();// $state.go(PageConfig.START);
      }
      // else ($state.current.name==PageConfig.MANAGE_TRACKER || $state.current.name==PageConfig.REPLAY_ROUTE
      //   || $state.current.name==PageConfig.VEHICLE_STATISTICS || $state.current.name==PageConfig.NAVIGATION
      //   || $state.current.name==PageConfig.REPORT || $state.current.name==PageConfig.MANAGE_MEMBER){
      else {
        $state.go(PageConfig.LIVE_TRACKING);
      }
      // else{
      // 	navigator.app.backHistory();
      // }
    }, 100);
  })

