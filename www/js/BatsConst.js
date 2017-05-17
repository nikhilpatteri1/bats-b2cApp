var batsconstants = angular.module('batsconstants', []);

batsconstants.constant('Constants', {
	X_AUTH_TOKEN : 'x_auth_token',
	APP_VERSION : "0.0.1",
	COUNTRIES : ["India"],
	STATES: ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", 
                               "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu"," Delhi"," Goa", "Gujarat", "Haryana", 
                               "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", 
                               "Maharashtra", "Manipur",  "Meghalaya", "Mizoram", "Nagaland"," Odisha", "Puducherry", "Punjab", "Rajasthan", 
                               "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh"," Uttarakhand", "West Bengal"],
    OPERATOR: ["Aircel","Airtel","BSNL","Idea","Jio","MTNL","MTS","Reliance GSM","Reliance Mobile","T24","Tata Docomo","Tata Indicom","Telenor","Vodafone","Videocon"],
	TIME_INTERVAL:  3000,
	TOST_POSITION : "top",
	accessToken : "token",
	ACCESS_TYPE : "accessType",
	USER_VO : "user_vo",
});
   

batsconstants.constant('PageConfig', {
	LOGIN: 'login',
	START: 'start',
	LIVE_TRACKING : 'bats.livetracking',
	FORGOT_PASSWORD : 'forgotpassword',
	CHANGE_PASSWORD : 'bats.changepassword',
	SIGNUP_STEP1:'signupstep1',
	SIGNUP_STEP2:'signupstep2',
	MANAGE_TRACKER: 'bats.managetracker',
	UPDATE_MARKER_DETAILS : 'bats.updatemarkerdetails',
	REPLAY_ROUTE:'bats.replayroute',
	EVENT_HISTORY:'bats.eventhistory',
	EVENT_HISTORY_DETAIL:'bats.eventhistorydetail',
	VEHICLE_STATISTICS:'bats.vehiclestatistics',
	VEHICLE_STATISTICS_DETAIL:'bats.vehiclestatisticsdetail',
	NAVIGATION:'bats.navigation',
	REPORT:'bats.report',
	MANAGE_MEMBER:'bats.managemember',
	LIVE_TRACKING_DETAILS:'bats.livetrackingdetails',
	ADD_MEMBER:'bats.addmember',
	EVENT_FILTER:'bats.eventfilter',	
	LIVE_TRACKING_DEVICES : 'bats.livetrackingdevices',
	REPLAY_ROUTE_DETAILS : 'bats.replayroutedetail',
	NOTIFICATION : 'bats.notification',
	GEOFENCE:'bats.geofence'
});
   

batsconstants.constant('Messages', {
	NOT_AUTHORIZED_MESSAGE : "Login to continue!",
	MEMBER_NOT_AUTHORIZED_MESSAGE : "Login to continue with admin/user account!",
});