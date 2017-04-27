angular.module('managemember', [])
    .controller('ManageMemberCtrl', function ($scope, $ionicModal, UtilsFactory, $timeout, BatsServices, ionicToast, Constants, $state, PageConfig) {
        $scope.data = {};
        BatsServices.userList({}).success(function (response) {
            console.log(response);
            $scope.memberList = response;
            console.log($scope.memberList);
            UtilsFactory.setEditMemberDetails($scope.memberList);
        }).error(function (error) {
            // console.log(error);
            ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })

        //   { "token" : <token>, "firstname" : <first name>, "lastname" : <last  name>, "email" : <email>, "contact_no": <contact num>,    "desc": <desc>, "uid": <User id> }

        $scope.updateUser = function (uid) {
            //      let inputParam = { 'firstname': data.fName, 'lastname': data.lName,'email':data.email,'contact_no':""+data.phonenumber,'desc':data.username,'uid':uid}
            //                console.log(uid);
            //       BatsServices.updateUser(inputParam).success(function (response) {
            //     console.log(response);
            //     $scope.memberList=response;
            // }).error(function (error) {
            //    // console.log(error);
            //     ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            // })
            $scope.data = UtilsFactory.getEditMemberDetails();
            console.log($scope.data);
            $state.go(PageConfig.ADD_MEMBER);
        }
        $scope.addNewMember = function () {
            $state.go(PageConfig.ADD_MEMBER);
        }

    })