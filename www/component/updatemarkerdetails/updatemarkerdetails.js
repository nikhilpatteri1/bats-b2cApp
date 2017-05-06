angular.module('updatemarkerdetails', [])
.controller('UpdateMarkerDetailsCtrl', function($scope, $state, $ionicModal, $timeout, PageConfig, Constants,
    $ionicPopup, UtilsFactory, ionicToast, BatsServices) {
        $scope.updatemarkerdetialsForm = {};
        $scope.data = {};
        if(UtilsFactory.getManageTrackerDetails().length==0){
            $state.go(PageConfig.MANAGE_TRACKER);
        }
        $scope.tracker = UtilsFactory.getManageTrackerDetails();
        $scope.data = $scope.tracker;
        $ionicModal.fromTemplateUrl('templates/popup/updateMarker.html', function(modal) {
            $scope.updateMarkerModal = modal;
            }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

   if (UtilsFactory.getNotificationDetails()) {
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count = $scope.notificationData.length;
            console.log($scope.count);
            if($scope.count==undefined){
                $scope.count=0;
                $scope.notificationData=[];
            }
        }

    $scope.updateTracker = function(data, form){
       if(form.$valid){
           var inputParam = data;
           inputParam.devtype = data.vehicle_model;
            BatsServices.modifyMarker(inputParam).success(function (response) {
                $scope.updateMarkerModal.show();
            }).error(function (error) {
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
       }
    }
    
    $scope.backToManageTracker=function(){
     $state.go(PageConfig.MANAGE_TRACKER);
}

    $scope.closeModal = function(){
        $scope.updateMarkerModal.hide();
        $state.go(PageConfig.MANAGE_TRACKER);
    }

	
})