angular.module('managemember', [])
.controller('ManageMemberCtrl', function ($scope, $ionicModal, UtilsFactory, $timeout, BatsServices, ionicToast,
         Constants, $state, PageConfig, $rootScope) {
        
        $scope.data = {};
         if (UtilsFactory.getNotificationDetails()) {
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count = $scope.notificationData.length;
            console.log($scope.count);
            if($scope.count==undefined){
                $scope.count=0;
                $scope.notificationData=[];
            }
        }

        $scope.init = function(){
            BatsServices.userList({}).success(function (response) {
                $scope.memberList = response;
            }).error(function (error) {
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            });
        }

        $rootScope.$on('addMemberDone', function(event){
            $scope.init();
        })
        
        $scope.updateUser = function (member) {
            UtilsFactory.setEditMemberDetails(member);
            $state.go(PageConfig.ADD_MEMBER);
        }

        $scope.addNewMember = function () {
            $state.go(PageConfig.ADD_MEMBER);
        }

})