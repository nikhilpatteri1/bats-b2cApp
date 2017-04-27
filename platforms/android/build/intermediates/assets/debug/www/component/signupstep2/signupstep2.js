angular.module('signupstep2', [])
.controller('SignupStep2Ctrl', function($scope, $state, $ionicModal, $timeout, $ionicPopup, PageConfig, Constants,
    UtilsFactory, BatsServices, ionicToast) {

    $scope.simCarriers = Constants.OPERATOR;
    $scope.data = [];
    console.log($scope.data)
    $scope.signupStep2Form = {};
    $scope._token = window.localStorage.getItem(Constants.accessToken);
    if(UtilsFactory.getSignUpData().length==0 && $scope._token == undefined ){
        $state.go(PageConfig.SIGNUP_STEP1)
    }
    $scope.trackers = [{id: 1}];
    $scope.addTracker = function(){
        var newItemNo = $scope.trackers.length + 1;
        $scope.trackers.push({'id': newItemNo});
    }

    $scope.removeTracker = function(i){
        $scope.trackers.splice(i, 1);
        $scope.data[i] = {};
    }

    $scope.gotoRegister = function(data, form){
        if(form.$valid){
             if($scope._token!=undefined || $scope._token!=null){
                var inputParam =  {'trackers' : data};
                BatsServices.addnewdevices(inputParam).success(function (response) {
                   $state.go(PageConfig.MANAGE_TRACKER);
                }).error(function (error) {
                    ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
             }
             else{
                var inputParam =  UtilsFactory.getSignUpData();
                inputParam.trackers = data;
                BatsServices.register(inputParam).success(function (response) {
                    var alertPopup = $ionicPopup.alert({
                        title: '',
                        template: '<div class="suPopupContent">User Id & Password will be sent to your registered mobile and email</div>'
                            +'<div class="suPopupContent">Please use it for Login</div>'
                    });
                    alertPopup.then(function (res) {
                        $state.go(PageConfig.LOGIN);
                    });
                }).error(function (error) {
                    ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
             }
           
        }
	}
})