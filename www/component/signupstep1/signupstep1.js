angular.module('signupstep1', [])
.controller('SignupStep1Ctrl', function ($scope, $state, $ionicModal, $timeout, PageConfig, Constants, BatsServices,
		UtilsFactory, $ionicPopup) {
		
		$scope.countries = Constants.COUNTRIES;
		$scope.states = Constants.STATES;
		$scope.signupStep1Form = {};
		$scope.data = {};

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
				var inputparam = {"firstname":data.fName, "lastname":data.lName, "email":data.email,
    				"contact_no": data.phonenumber, "password":data.password,"country":data.country, "state":data.state}
				UtilsFactory.setSignUpData(inputparam);
				$state.go(PageConfig.SIGNUP_STEP2);
			}
		}
	})