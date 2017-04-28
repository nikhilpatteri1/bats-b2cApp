angular.module('signupstep2', [])
.controller('SignupStep2Ctrl', function($scope, $state, $ionicModal, $timeout, $ionicPopup, PageConfig, Constants,
    UtilsFactory, BatsServices, ionicToast) {

    $scope.simCarriers = Constants.OPERATOR;
    $scope.data = [];
    $scope.signupStep2Form = {};
    $scope._token = localStorage.getItem(Constants.accessToken);
    if(UtilsFactory.getSignUpData().length==0 && $scope._token == undefined ){
        $state.go(PageConfig.SIGNUP_STEP1)
    }
    console.log('$scope.editMarkerData')
    if(UtilsFactory.getEditMarkerDetails().length!=0){
        $scope.editMarkerData = UtilsFactory.getEditMarkerDetails();
        console.log($scope.editMarkerData)
        
        $scope.data = [{'devid': $scope.editMarkerData.devid, 't_sim_provider': $scope.editMarkerData.sim_service_provider,
            't_sim_cn' : $scope.editMarkerData.device_sim_cn }]
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


$scope.backToStep1=function(){
    $state.go(PageConfig.SIGNUP_STEP1);
}
$scope.backToManageTracker=function(){
    if( UtilsFactory.getEditMarkerDetails().length!=0){
        UtilsFactory.setEditMarkerDetails([]);
    }
     $state.go(PageConfig.MANAGE_TRACKER);
}
    $scope.gotoRegister = function(data, form){
        if(form.$valid){
            if( UtilsFactory.getEditMarkerDetails().length!=0){
                    UtilsFactory.setEditMarkerDetails([]);
                } 
             if($scope._token!=undefined || $scope._token!=null){
                var inputParam =  {'trackers' : data};
                BatsServices.addnewdevices(inputParam).success(function (response) {
                   $state.go(PageConfig.MANAGE_TRACKER);
                }).error(function (error) {
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
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
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
             }
           
        }
	}
})