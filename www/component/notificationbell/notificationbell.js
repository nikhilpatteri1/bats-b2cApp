angular.module('notificationbell', [])
    .controller('notificationbellCtrl', function ($scope, $ionicModal, $timeout, UtilsFactory, $state, PageConfig, BatsServices,
        ionicToast, $interval, Constants, $cordovaSQLite, $rootScope) {
        console.log("inside notification bell");
        //$scope.count;
        //  $scope.fristTime = 0;
        //   $scope.notification = {
        //       count: 0
        //   };

        var notificationCall;
        console.log($scope.count);


        $scope.hidecount = function () {
            $scope.count = 0;
        }
        if (UtilsFactory.getNotificationcallFirst() >= 1) {
            console.log("im not calling again");
        } else {
            UtilsFactory.setNotificationcallFirst(1);
            $scope.count = 0;

            notificationCall = $interval(callNotificationinterval, 20000);

            //  UtilsFactory.setNotificationcallFirst(1);
            //   $scope.fristTime++;
        }

        // if ($state.current.name != PageConfig.LIVE_TRACKING) { 
        //         $interval.cancel(notificationCall);
        // }

        // var temp = 0;
        function callNotificationinterval() {
            $scope.oldcount = 0;
            console.log("yes im running " + $scope.count);
            var query_select = "select * from Notification";
            $cordovaSQLite.execute(db, query_select, []).then(function (res) {
                var select = [];
                console.log("fetching notification " + angular.toJson(res));
                for (var i = 0; i < res.rows.length; i++) {
                    select = JSON.parse(res.rows.item(i).data);
                    console.log("select" + (select));
                    $scope.oldcount = $scope.oldcount + select.length;
                    console.log($scope.oldcount);
                }
                if ($scope.count < $scope.oldcount) {
                    $scope.count = $scope.oldcount;
                    console.log($scope.count);
                } else if ($scope.oldcount == 0) {
                    $scope.count = 0;
                }
            }, function (err) {
                // alert("Insert Token in DB err -> " +
                // JSON.stringify(err));
            });


            //     $scope.notificationData = response;
            //   $scope.count = $scope.notificationData.length;
            if ($scope.count == undefined || $scope.count == []) {
                $scope.count = 0;
            }

            console.log($scope.countt);
            // UtilsFactory.setNotificationDetails(response);
            UtilsFactory.setNotificationCount($scope.count);
            //   $scope.$apply();
        }
    });