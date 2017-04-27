angular.module('updatemarkerdetails', [])
.controller('UpdateMarkerDetailsCtrl', function($scope, $state, $ionicModal, $timeout, PageConfig, Constants,
    $ionicPopup, UtilsFactory, ionicToast, BatsServices) {
        $scope.updatemarkerdetialsForm = {};
       
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

  
    $scope.updateTracker = function(data, form){
       if(form.$valid){
           let inputParam = data;
           inputParam.vehicle_model = "data"  
        BatsServices.modifyMarker(inputParam).success(function (response) {
                $scope.updateMarkerModal.show();
            }).error(function (error) {
                ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
       }
    }

    $scope.closeModal = function(){
        $scope.updateMarkerModal.hide();
        $state.go(PageConfig.MANAGE_TRACKER);
    }

	
})