angular.module('managemember', [])
.controller('ManageMemberCtrl', function ($scope, $ionicModal, UtilsFactory, $timeout, BatsServices, ionicToast, $ionicPopup,
         Constants, $state, PageConfig, $rootScope, $ionicPopover) {
        
    $scope.data = {};

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
        $scope.popover.hide();
        UtilsFactory.setEditMemberDetails(member);
        $state.go(PageConfig.ADD_MEMBER);
    }

    $scope.deleteUser = function(member){
        $scope.popover.hide();

        var confirmPopup = $ionicPopup.confirm({
                title: 'Cofirm',
                template: 'Are you sure you want to delete this member?',
                cancelText: 'No',
                scope: $scope,
                okText: 'Yes',
            });
        confirmPopup.then(function (res) {
            if (res) {
                var inputParam = {'uid': member.uid};
                BatsServices.deleteUser(inputParam).success(function(response){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Member Deleted',
                        template: '<div class="pwdSuccessPopup">Member has been successfully deleted</div>'
                    });
                    alertPopup.then(function (res) {
                        $state.go(PageConfig.MANAGE_MEMBER);
                    });
                    BatsServices.userList({}).success(function (response) {
                        $scope.memberList = response;
                    }).error(function (error) {
                        ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                    });
                }).error(function(){
                    console.log("error while deleting user");
                })
            }
        });
    }

    $scope.addNewMember = function () {
        $state.go(PageConfig.ADD_MEMBER);
    }

    $ionicPopover.fromTemplateUrl('templates/popover/edit_member.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event, member) {
        $scope.selectedMember = member;
        $scope.popover.show($event);
    };

})