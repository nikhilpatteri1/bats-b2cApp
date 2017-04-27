angular.module('forgotpassword', [])
.controller('ForgotPasswordCtrl', function ($scope, $ionicModal, $timeout, BatsServices, ionicToast, PageConfig,Constants,$state) {
    $scope.data = {};
    $scope.gotoResetPassword = function (data, form) {
        // console.log($scope.email);
        // console.log($scope.userid);
        let inputParam = { 'email': data.email }
        BatsServices.forgotPassword(inputParam).success(function (response) {
            var alertPopup = $ionicPopup.alert({
                title: '',
                template: responce.msg
            });
            alertPopup.then(function (res) {
                $state.go(PageConfig.LOGIN);
                //  console.log('Thank you for not eating my delicious ice cream cone');
            });
        }).error(function (error) {
            // console.log(error);
            ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
    }


    $scope.backToLogin=function(){
        // console.log("im inside of back button");
            $state.go(PageConfig.LOGIN);
    }
})