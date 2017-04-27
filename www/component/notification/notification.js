angular.module('notification', [])
    .controller('NotificationCtrl', function ($scope, $rootScope, $state, $ionicModal, $timeout, PageConfig, UtilsFactory) {

        $scope.backToHistory=function(){
            console.log(navigator)
             navigator.app.backHistory();
        }
    })