angular.module('addmember', [])
.controller('AddmemberCtrl', function ($scope, BatsServices, PageConfig, $state, Constants, 
    ionicToast, UtilsFactory, $rootScope) {
    
    $scope.AddMemberForm = {};
    $scope.data = {};
    $scope.passwordHide = false;

    if(UtilsFactory.getEditMemberDetails().length!=0){
        console.log(UtilsFactory.getEditMemberDetails());
        $scope.data = UtilsFactory.getEditMemberDetails();
        $scope.data.contact_no = parseInt($scope.data.contact_no); 
        $scope.passwordHide = true;
    }
    $scope.backToManageMember=function(){
        if( UtilsFactory.getEditMemberDetails().length!=0){
             UtilsFactory.setEditMemberDetails([]);
        }
        $state.go(PageConfig.MANAGE_MEMBER);  
    }

    $scope.gotoCreate=function(data,form){
        var inputParam = { 'firstname': data.firstname, 'lastname': data.lastname,'email':data.email,
            'contact_no':""+data.contact_no,'desc':data.desc,'password':data.password, 'uid':data.uid}
        if(!$scope.passwordHide){
            BatsServices.createUser(inputParam).success(function (response) {
                $rootScope.$emit('addMemberDone', response);
                $state.go(PageConfig.MANAGE_MEMBER);
                if( UtilsFactory.getEditMemberDetails().length!=0){
                    UtilsFactory.setEditMemberDetails([]);
                } 
            }).error(function (error) {
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }
        else{
            BatsServices.updateUser(inputParam).success(function (response) {
                $rootScope.$emit('addMemberDone', response);
                $state.go(PageConfig.MANAGE_MEMBER); 
                if( UtilsFactory.getEditMemberDetails().length!=0){
                    UtilsFactory.setEditMemberDetails([]);
                }
            }).error(function (error) {
                    ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }  
    }
})