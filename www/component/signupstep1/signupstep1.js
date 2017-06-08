angular.module('signupstep1', [])
.controller('SignupStep1Ctrl', function ($scope, $state, $ionicModal, $timeout, PageConfig, Constants, BatsServices,
		UtilsFactory, $ionicPopup, ionicToast) {
		
		$scope.countries = Constants.COUNTRIES;
		$scope.states = Constants.STATES;
		$scope.signupStep1Form = {};
		$scope.data = {};
		var usernameValidated = false;
		var emailValidated = false;
		// var max_length = 20;

		if(UtilsFactory.getSignUpData().length!=0){
			var userDetails = UtilsFactory.getSignUpData();
			$scope.data = {
				fName: userDetails.firstname,
				lName: userDetails.lastname,
				email: userDetails.email,
				phonenumber: userDetails.contact_no,
				password: userDetails.password,
				country: userDetails.country,
				state: userDetails.state
			};
			$scope.Validate = true;
		}else{
			$scope.Validate = false;
		}

		$scope.gotoNext = function (data, form) {
			$scope.Validate = true;	
			if(form.$valid){

				var phone_no = new String(data.phonenumber);
				var inputContact = {"contact_no":phone_no};
				var inputEmail = {"email":data.email};
				validateEmail();
				function validateEmail(){
						BatsServices.isEmailExist(inputEmail).success(function(response){
							if(!response.status){
								emailValidated = false;
								ionicToast.show(response.msg, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
							}else{
								emailValidated = true;
								validateUsername();
							}
						}).error(function(error){
							ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
						});
				}
				function validateUsername(){
						BatsServices.isUserNameExist(inputContact).success(function(response){
							if(!response.status){
								usernameValidated = false;
								ionicToast.show(response.msg, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
							}else{
								usernameValidated = true;
								callSecondPage();
							}
						}).error(function(error){
							ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
						});
				}

				function callSecondPage(){
					// console.log("values are: "+usernameValidated+" & "+emailValidated)
					if(usernameValidated && emailValidated){
						// console.log("inside goto");
						var inputparam = {"firstname":data.fName, "lastname":data.lName, "email":data.email,
							"contact_no": data.phonenumber, "password":data.password,"country":data.country, "state":data.state}
						UtilsFactory.setSignUpData(inputparam);
						$state.go(PageConfig.SIGNUP_STEP2);
					}
				}
			}
		}

		// $scope.$watch('data.fName', function(newVal, oldVal){
		// 	if(newVal.length>max_length){
		// 		$scope.data.fName = oldVal;
		// 	}
		// });
	})