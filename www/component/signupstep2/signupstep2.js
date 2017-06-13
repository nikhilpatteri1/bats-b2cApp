angular.module('signupstep2', [])
    .controller('SignupStep2Ctrl', function ($scope, $state, $ionicModal, $timeout, $ionicPopup, PageConfig, Constants,
        UtilsFactory, BatsServices, ionicToast) {

        $scope.simCarriers = Constants.OPERATOR;
        $scope.data = [];
        $scope.signupStep2Form = {};
        $scope._token = localStorage.getItem(Constants.accessToken);
        if (UtilsFactory.getSignUpData().length == 0 && $scope._token == undefined) {
            $state.go(PageConfig.SIGNUP_STEP1)
        }
        if (UtilsFactory.getEditMarkerDetails().length != 0) {
            $scope.editMarkerData = UtilsFactory.getEditMarkerDetails();
            // $scope.data = [{
            //     'devid': $scope.editMarkerData.devid, 't_sim_provider': $scope.editMarkerData.sim_service_provider,
            //     't_sim_cn': parseInt($scope.editMarkerData.device_sim_cn)
            // }]
            $scope.data = $scope.editMarkerData;
            // console.log("data: "+angular.toJson($scope.data));
        }
        $scope.trackers = [{ id: 1 }];
        $scope.addTracker = function () {
            var newItemNo = $scope.trackers.length + 1;
            $scope.trackers.push({ 'id': newItemNo });
        }

        $scope.removeTracker = function (i) {
            $scope.trackers.splice(i, 1);
            delete $scope.data[i];
        }

        $scope.backToStep1 = function () {
            console.log("data: "+angular.toJson($scope.data));
            UtilsFactory.setEditMarkerDetails($scope.data);
            $state.go(PageConfig.SIGNUP_STEP1);
        }

        $scope.backToManageTracker = function () {
            if (UtilsFactory.getEditMarkerDetails().length != 0) {
                UtilsFactory.setEditMarkerDetails([]);
            }
            $state.go(PageConfig.MANAGE_TRACKER);
        }

        $scope.gotoRegister = function (data, form) {
            if (form.$valid) {
                if (UtilsFactory.getEditMarkerDetails().length != 0) {
                    UtilsFactory.setEditMarkerDetails([]);
                }
                if ($scope._token != undefined || $scope._token != null) {
                    if ($scope.editMarkerData == undefined) {
                        var inputParam = { 'trackers': data };
                        BatsServices.addnewdevices(inputParam).success(function (response) {
                            $state.go(PageConfig.MANAGE_TRACKER);
                        }).error(function (error) {
                            if (error.err == 'Origin Server returned 504 Status') {
                                ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                            }
                            else {
                                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                            }
                        })

                    }
                    else {
                        var inputParam = { 'devid': data[0].devid, 't_sim_provider': data[0].t_sim_provider, 't_sim_cn': "" + data[0].t_sim_cn };
                        BatsServices.editTracker(inputParam).success(function (response) {
                            $state.go(PageConfig.MANAGE_TRACKER);
                        }).error(function (error) {
                            if (error.err == 'Origin Server returned 504 Status') {
                                ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                            }
                            else {
                                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                            }
                        })
                    }
                }
                else {
                    var inputParam = UtilsFactory.getSignUpData();
                    inputParam.trackers = data;
                    BatsServices.register(inputParam).success(function (response) {
                        var alertPopup = $ionicPopup.alert({
                            title: '',
                            template: '<div class="suPopupContent">User Id & Password will be your registered mobile number and password</div>'
                            + '<div class="suPopupContent">Please use it for Login</div>'
                        });
                        alertPopup.then(function (res) {
                            $state.go(PageConfig.LOGIN);
                        });
                    }).error(function (error) {
                        if (error.err == 'Origin Server returned 504 Status') {
                            ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                        }
                        else {
                            ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                        }
                    })
                }
            }
        }
    })