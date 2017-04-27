angular.module('addmember', [])
.controller('AddmemberCtrl', function ($scope, $ionicModal, $timeout,BatsServices, PageConfig, $state, Constants, ionicToast) {
    $scope.AddMemberForm = {};
    $scope.data = {};
        $scope.backToManageMember=function(){
            console.log("hi ");
             $state.go(PageConfig.MANAGE_MEMBER);  
        }
        /* { "token" : <token>, "firstname" : <first name>, "lastname": <lastname>, 
                                        "password" : <password>, "email" : <email>,
                                        "contact_no": <Contact Num>, "desc": <Description> }
*/


        $scope.gotoCreate=function(data,form){
             let inputParam = { 'firstname': data.fName, 'lastname': data.lName,'email':data.email,'contact_no':""+data.phonenumber,'desc':data.username,'password':data.password}
             console.log(inputParam);
            BatsServices.createUser(inputParam).success(function (response) {
                console.log(responce); 
                $scope.memberdetails=responce;
                $state.go(PageConfig.MANAGE_MEMBER); 
            }).error(function (error) {
                 ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
           
        }
        // $scope.gotoResetPassword=function(){
        // console.log($scope.email);
        // console.log($scope.userid);

        // BatsServices.login({}).success(function (response) {
        // }).error(function (error) {
        // })
        // }
    })