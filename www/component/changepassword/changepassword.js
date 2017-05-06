angular.module('changepassword', [])
    .controller('ChangePasswordCtrl', function ($scope, $ionicModal, $timeout, BatsServices, ionicToast, PageConfig, Constants, $state, $ionicPopup) {
        $scope.gotoChangePassword = function (data, form) {
            // console.log($scope.email);
            // console.log($scope.userid);"currentpassword" : <present pwd>, "newpassword": <New pwd >, 
            $scope.result = false;
           // var token = '6tmpVy4wk1FIIB7m';//localStorage.getItem('token');                     
            var inputParam = { 'currentpassword': data.currentPass, 'newpassword': data.newPassword};
            BatsServices.changePassword(inputParam).success(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: response.status
                });
                alertPopup.then(function (res) {
                    // $state.go(PageConfig.LOGIN);
                    //  console.log('Thank you for not eating my delicious ice cream cone');
                });
            }).error(function (error) {
                // console.log(error);
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }

        $scope.result = angular.equals($scope.currentPass, $scope.newPassword);
        console.log( $scope.result);


    })
