angular.module('notificationbell', [])
    .controller('notificationbellCtrl', function ($scope, $ionicModal, $timeout, UtilsFactory, $state, PageConfig, BatsServices,
        ionicToast, $interval, Constants, $cordovaSQLite, $rootScope) {
        console.log("inside notification bell");
        // $scope.count;
      //  $scope.fristTime = 0;
      $scope.notification = {
          count: 0
      };
        
        var notificationCall;
        console.log($scope.notification.count);

        if (UtilsFactory.getNotificationcallFirst()>=1) {
            console.log("im not calling again");
        } else {
            UtilsFactory.setNotificationcallFirst(1);
            $scope.notification.count=1;
            notificationCall = $interval(callNotificationinterval, 20000);
           
          //  UtilsFactory.setNotificationcallFirst(1);
         //   $scope.fristTime++;
        }
       
        // if ($state.current.name != PageConfig.LIVE_TRACKING) { 
        //         $interval.cancel(notificationCall);
        // }


        function callNotificationinterval() {
            //    check notification is availble
             
           $scope.notification.count=$scope.notification.count+1;
            console.log("yes im running " + $scope.notification.count);



            //     $scope.notificationData = response;
            //   $scope.count = $scope.notificationData.length;
              if ($scope.notification.count == undefined || $scope.notification.count == []) {
                $scope.notification.count = 0;
              }

            console.log($scope.notification.count);
            // UtilsFactory.setNotificationDetails(response);
            UtilsFactory.setNotificationCount($scope.notification.count);
              $scope.$apply();
        }
    });