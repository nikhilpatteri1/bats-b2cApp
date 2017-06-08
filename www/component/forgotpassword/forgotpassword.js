angular.module('forgotpassword', [])
.controller('ForgotPasswordCtrl', function ($scope, $ionicModal, $timeout, BatsServices, ionicToast, PageConfig,Constants,$state) {
    $scope.data = {};


      $ionicModal.fromTemplateUrl('templates/popup/forgotPass.html', function(modal) {
            $scope.forgotpassword = modal;
            }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
        
    $scope.gotoResetPassword = function (data, form) {
        // console.log($scope.email);
        // console.log($scope.userid);
        var inputParam = { 'email': data.email }
        BatsServices.forgotPassword(inputParam).success(function (response) {
             $scope.forgotpassword.show();
                
        }).error(function (error) {
            // console.log(error);
             if(error.err=='Origin Server returned 504 Status'){
                     ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else{
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
           // ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
    }


    $scope.closeModal = function(){
        $scope.forgotpassword.hide();
        $state.go(PageConfig.LOGIN);
    }
    $scope.backToLogin=function(){
        // console.log("im inside of back button");
            $state.go(PageConfig.LOGIN);
    }
})