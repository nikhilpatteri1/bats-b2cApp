angular.module('updatemarkerdetails', [])
    .controller('UpdateMarkerDetailsCtrl', function ($scope, $state, $ionicModal, $timeout, PageConfig, Constants,
        $ionicPopup, UtilsFactory, ionicToast, BatsServices) {
        $scope.updatemarkerdetialsForm = {};
        $scope.speedlimintcheck=0;
        
        $scope.data = {};
        $scope.geofence = {
            checked: false
        };
        if (UtilsFactory.getManageTrackerDetails().length == 0) {
            $state.go(PageConfig.MANAGE_TRACKER);
        }
        $scope.tracker = UtilsFactory.getManageTrackerDetails();
        if ($scope.tracker.geofence != null) {
            if ($scope.tracker.geofence.length != 0) {
                $scope.geofence.checked = true;
                UtilsFactory.setPolygonPath($scope.tracker.geofence);
            } else {
                $scope.geofence.checked = false;
                UtilsFactory.setPolygonPath([]);
            }
        } else {
            $scope.geofence.checked = false;
        }
        $scope.data = $scope.tracker;
        if($scope.data.speed_limit>200){
            $scope.speedlimintcheck=1;
        }
        $ionicModal.fromTemplateUrl('templates/popup/updateMarker.html', function (modal) {
            $scope.updateMarkerModal = modal;
        }, {
                scope: $scope,
                animation: 'slide-in-up'
            });

        //    if (UtilsFactory.getNotificationDetails()) {
        //             $scope.notificationData = UtilsFactory.getNotificationDetails();
        //             $scope.count = UtilsFactory.getNotificationCount();
        //             if($scope.count==undefined){
        //                 $scope.count=0;
        //                 $scope.notificationData=[];
        //             }
        //         }

        $scope.gotoGeofence = function () {
            $state.go(PageConfig.GEOFENCE);
        }
        $scope.updateTracker = function (data, form, geofence) {
            if (geofence) {
                UtilsFactory.setUpdateTrackerDetails(data);
                $state.go(PageConfig.GEOFENCE);
            } else {
                if (form.$valid) {
                    var inputParam = data;
                    inputParam.geofence = [];
                    inputParam.devtype = data.vehicle_model;
                    BatsServices.modifyMarker(inputParam).success(function (response) {
                        $scope.updateMarkerModal.show();
                    }).error(function (error) {
                        if (error.err == 'Origin Server returned 504 Status') {
                            ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                        }
                        else {
                            ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                        }// ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    })
                }
            }
        }

        $scope.backToManageTracker = function () {
            $state.go(PageConfig.MANAGE_TRACKER);
        }

        $scope.closeModal = function () {
            $scope.updateMarkerModal.hide();
            $state.go(PageConfig.MANAGE_TRACKER);
        }


    })