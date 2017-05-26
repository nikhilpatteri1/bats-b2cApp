angular.module('notificationbell', [])
    .controller('notificationbellCtrl', function ($scope, $ionicModal, $timeout, UtilsFactory, $state, PageConfig, BatsServices,
        ionicToast, $interval, Constants, $cordovaSQLite, $rootScope) {
        console.log("inside notification bell");
        //$scope.count;
        //  $scope.fristTime = 0;
        //   $scope.notification = {
        //       count: 0
        //   };

        $rootScope.notificationCall;
        console.log($rootScope.count);
        var notificationArrray = [];

        $scope.hidecount = function () {
            $rootScope.count = 0;
        }


        if (UtilsFactory.getNotificationcallFirst() >= 1) {
            console.log("im not calling again");
        } else {
            UtilsFactory.setNotificationcallFirst(1);
            $rootScope.count = 0;
            $rootScope.notificationCall = $interval(callNotificationinterval, 15000);
        }

        function callNotificationinterval() {
            notificationArrray = [];
            $scope.oldcount = 0;
            console.log("yes im running " + $scope.count);
            var query_select = "select * from Notification";
            $cordovaSQLite.execute(db, query_select, []).then(function (res) {
                var select = [];
                console.log("fetching notification " + angular.toJson(res));
                for (var i = 0; i < res.rows.length; i++) {
                    console.log()
                    select = JSON.parse(res.rows.item(i).data);
                    console.log("select" + JSON.stringify(select));
                    $scope.oldcount = $scope.oldcount + select.length;
                    console.log($scope.oldcount);
                    for (var j = 0; j < select.length; j++) {
                        console.log(" i = " + j + " " + select[j]);
                        notificationArrray.push(select[j]);
                    }
                }
                console.log("its notification array" + JSON.stringify(notificationArrray));
                if ($rootScope.count < $scope.oldcount) {
                    $rootScope.count = $scope.oldcount;
                    UtilsFactory.setNotificationDetails(notificationArrray);
                    UtilsFactory.setNotificationCount($scope.count);
                    console.log($rootScope.count);
                } else if ($scope.oldcount == 0) {
                    $rootScope.count = 0;
                    UtilsFactory.setNotificationCount($rootScope.count);
                }
            }, function (err) {
                console.log("somthing went wrong with fetching notification\n" + err);
               
            });

            console.log($rootScope.count);
            
            //   $scope.$apply();
        }
    });