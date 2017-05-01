angular.module('notification', [])
    .controller('NotificationCtrl', function ($scope, $rootScope, $state, $ionicModal, $timeout, PageConfig, UtilsFactory) {

        $scope.backToHistory=function(){
            console.log(navigator)
             navigator.app.backHistory();
        }

        if(UtilsFactory.getNotificationDetails()){
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
        }
    })