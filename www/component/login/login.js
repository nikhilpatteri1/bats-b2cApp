angular.module('login', [])
    .controller('LoginCtrl', function ($scope, $state, $ionicModal, BatsServices, ionicToast, Constants, $ionicPopup, $cordovaSQLite,
        $timeout, PageConfig, $rootScope, $cordovaNetwork) {

        if (localStorage.getItem(Constants.accessToken)) {
            localStorage.removeItem(Constants.accessToken)
        }

        if (localStorage.getItem(Constants.ACCESS_TYPE)) {
            localStorage.removeItem(Constants.ACCESS_TYPE)
        }

        if (localStorage.getItem(Constants.USER_VO)) {
            localStorage.removeItem(Constants.USER_VO)
        }

        $scope.Validate = false;

        $scope.gotoHome = function (data, form) {

            var connectionType = $cordovaNetwork.getNetwork();
            if (connectionType != 'none') {
                console.log("connection type: " + connectionType);
                $scope.Validate = true;
                var inputParam = { 'user_id': data.userid, 'password': data.password }
                BatsServices.login(inputParam).success(function (response) {
                    localStorage.setItem(Constants.accessToken, response.token);
                    var type = response.token.charAt(9);
                    if (type == 0) { type = "factory"; }
                    else if (type == 1) { type = "admin"; }
                    else if (type == 2) { type = "member"; }
                    // $rootScope.callNotification();
                    localStorage.setItem(Constants.ACCESS_TYPE, type);
                    localStorage.setItem(Constants.USER_VO, JSON.stringify(response));
                    if (localStorage.getItem(Constants.ACCESS_TYPE) != null) {
                        $rootScope.accessType = localStorage.getItem(Constants.ACCESS_TYPE);
                    }
                    if (localStorage.getItem(Constants.USER_VO) != null) {
                        $rootScope.userName = JSON.parse(localStorage.getItem(Constants.USER_VO)).firstname;
                        $rootScope.email = JSON.parse(localStorage.getItem(Constants.USER_VO)).email;
                    }
                    token_login = window.localStorage.getItem("token");
                    var query_insert = "INSERT INTO Token (token) VALUES (?)";
                    $cordovaSQLite.execute(db, query_insert, [token_login]).then(function (res) {
                        console.log("inserting token into db from login.js");
                        $state.go(PageConfig.MANAGE_TRACKER);
                    }, function (err) {
                        // alert("Insert Token in DB err -> " +
                        // JSON.stringify(err));
                    });
                    // $state.go(PageConfig.MANAGE_TRACKER);
                }).error(function (error) {
                    if (error.err == 'Origin Server returned 504 Status') {
                        ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }
                    else {
                        ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    }// ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                })
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'No Internet Connection',
                    template: '<div class="pwdSuccessPopup">Sorry, no Internet connectivity detected. Please reconnect and try again.</div>'
                });
            }
        }

        $scope.gotoFogotPassword = function () {
            $state.go(PageConfig.FORGOT_PASSWORD);
        }


    })