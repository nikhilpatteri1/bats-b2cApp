angular.module('changepassword', [])
    .controller('ChangePasswordCtrl', function ($scope, BatsServices, ionicToast, PageConfig, Constants, $state, $ionicPopup) {
        
    $scope.gotoChangePassword = function (data, form) {
        $scope.result = false;
        // var token = '6tmpVy4wk1FIIB7m';//localStorage.getItem('token');                     
        var inputParam = { 'currentpassword': data.currentPass, 'newpassword': data.newPassword};
        BatsServices.changePassword(inputParam).success(function (response) {
            var alertPopup = $ionicPopup.alert({
                title: 'Change Password',
                template: '<div class="pwdSuccessPopup">Password changed successfully</div>'
            });
            alertPopup.then(function (res) {
                $state.go(PageConfig.LIVE_TRACKING);
            });
        }).error(function (error) {
             if(error.err=='Origin Server returned 504 Status'){
                     ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else{
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
          //  ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
    }
    $scope.result = angular.equals($scope.currentPass, $scope.newPassword);
});
