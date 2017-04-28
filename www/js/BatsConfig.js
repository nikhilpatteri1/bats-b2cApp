angular.module('batsconfig', [])
  .config(function ($stateProvider, $urlRouterProvider, PageConfig, $httpProvider, Constants) {

    $httpProvider.interceptors.push("BatsInterceptor");
    $stateProvider
      .state('bats', {
        url: '/bats',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'BatsCtrl'
      })

      .state(PageConfig.LOGIN, {
        url: '/login',
        templateUrl: 'component/login/login.html',
        controller: 'LoginCtrl'
      })

      .state(PageConfig.START, {
        url: '/start',
        templateUrl: 'component/start/start.html',
        controller: 'StartCtrl'
      })


      .state(PageConfig.FORGOT_PASSWORD, {
        url: '/forgotpassword',
        templateUrl: 'component/forgotpassword/forgotpassword.html',
        controller: 'ForgotPasswordCtrl'
      })

      .state(PageConfig.CHANGE_PASSWORD, {
        url: '/changepassword',
        views: {
          'menuContent': {
            templateUrl: 'component/changepassword/changePassword.html',
            controller: 'ChangePasswordCtrl'
          }
        }
      })

      .state(PageConfig.SIGNUP_STEP1, {
        url: '/signupstep1',
        templateUrl: 'component/signupstep1/signupstep1.html',
        controller: 'SignupStep1Ctrl'
      })

      .state(PageConfig.SIGNUP_STEP2, {
        url: '/addnewdevices',
        templateUrl: 'component/signupstep2/signupstep2.html',
        controller: 'SignupStep2Ctrl'
      })


      .state(PageConfig.EVENT_HISTORY, {
        url: '/eventhistory',
        views: {
          'menuContent': {
            templateUrl: 'component/eventhistory/eventhistory.html',
            controller: 'EventHistoryCtrl'
          }
        }
      })

      .state(PageConfig.EVENT_HISTORY_DETAIL, {
        url: '/eventhistorydetail',
        views: {
          'menuContent': {
            templateUrl: 'component/eventhistorydetail/eventhistorydetail.html',
            controller: 'EventHistoryDetailCtrl'
          }
        }
      })

       .state(PageConfig.EVENT_FILTER, {
        url: '/eventhistoryfilter',
        views: {
          'menuContent': {
            templateUrl: 'component/eventfilter/eventfilter.html',
            controller: 'EventFilterCtrl'
          }
        }
      })

      .state(PageConfig.REPLAY_ROUTE, {
        url: '/replayroute',
        views: {
          'menuContent': {
            templateUrl: 'component/replayroute/replayroute.html',
            controller: 'ReplayRouteCtrl'
          }
        }
      })

      .state(PageConfig.VEHICLE_STATISTICS, {
        url: '/vehiclestatistics',
        views: {
          'menuContent': {
            templateUrl: 'component/vehiclestatistic/vehiclestatistics.html',
            controller: 'VehicleStatisticsCtrl'
          }
        }
      })
      .state(PageConfig.NAVIGATION, {
        url: '/navigation',
        views: {
          'menuContent': {
            templateUrl: 'component/navigation/navigation.html',
            controller: 'NavigationCtrl'
          }
        }
      })


      .state(PageConfig.VEHICLE_STATISTICS_DETAIL, {
        url: '/vehiclestatisticsdetail',
        views: {
          'menuContent': {
            templateUrl: 'component/vehiclestatisticdetail/vehiclestatisticdetail.html',
            controller: 'VehicleStatisticsDetailCtrl'
          }
        }
      })

      .state(PageConfig.LIVE_TRACKING, {
        url: '/livetracking',
        views: {
          'menuContent': {
            templateUrl: 'component/livetracking/livetracking.html',
            controller: 'LiveTrackingCtrl'
          }
        }
      })

      .state(PageConfig.LIVE_TRACKING_DETAILS, {
        url: '/livetrackingdetails',
        views: {
          'menuContent': {
            templateUrl: 'component/livetrackingdetails/livetrackingdetails.html',
            controller: 'LiveTrackingDetailsCtrl'
          }
        }
      })
      .state(PageConfig.MANAGE_TRACKER, {
        url: '/managetracker',
        views: {
          'menuContent': {
            templateUrl: 'component/managetracker/managetracker.html',
            controller: 'ManageTrackerCtrl'
          }
        }
      })
      .state(PageConfig.UPDATE_MARKER_DETAILS, {
        url: '/updatemarkerdetails',
        views: {
          'menuContent': {
            templateUrl: 'component/updatemarkerdetails/updatemarkerdetails.html',
            controller: 'UpdateMarkerDetailsCtrl'
          }
        }
      })

      .state(PageConfig.MANAGE_MEMBER, {
        url: '/managemember',
        views: {
          'menuContent': {
            templateUrl: 'component/managemember/managemember.html',
            controller: 'ManageMemberCtrl'
          }
        }
      })

      .state(PageConfig.ADD_MEMBER, {
        url: '/addmember',
        views: {
          'menuContent': {
            templateUrl: 'component/addmember/addmember.html',
            controller: 'AddmemberCtrl'
          }
        }
      })
      .state(PageConfig.REPORT, {
        url: '/report',
        views: {
          'menuContent': {
            templateUrl: 'component/report/report.html',
            controller: 'ReportCtrl'
          }
        }
      })
      
      .state(PageConfig.LIVE_TRACKING_DEVICES, {
        url: '/livetrackingdevices',
        views: {
          'menuContent': {
            templateUrl: 'component/livetrackingdevices/livetrackingdevices.html',
            controller: 'LiveTrackingDevicesCtrl'
          }
        }
      })
      .state(PageConfig.REPLAY_ROUTE_DETAILS, {
        url: '/replayroutedetail',
        views: {
          'menuContent': {
            templateUrl: 'component/replayroutedetail/replayroutedetail.html',
            controller: 'ReplayRouteDetailCtrl'
          }
        }
      })
       .state(PageConfig.NOTIFICATION, {
        url: '/notification',
        views: {
          'menuContent': {
            templateUrl: 'component/notification/notification.html',
            controller: 'NotificationCtrl'
          }
        }
      });
      
      var _token = localStorage.getItem(Constants.accessToken)
     if(_token == undefined || _token == null){
        $urlRouterProvider.otherwise('/login');
     }
     else{
        $urlRouterProvider.otherwise('/bats/livetracking');
     }
        		

        
  });
