angular.module('batsinterceptor', [])
.factory("BatsInterceptor", function ($q, $rootScope, Constants) {
  return {
	  response: function (response) {
          return response || $q.when(response);
      },
      responseError: function (rejection) {
        //   if (rejection.status == 0 || rejection.status == -1) {
        //       rejection.message = 'Server is temporarily down or you are not connected to the internet. Please try again in a while or check your connection.';
        //       $rootScope.$broadcast('SERVER_ERROR:SERVER_DOWN', rejection.message);
        //   }
        console.log(rejection)
          if (rejection.data!==null && rejection.data!=undefined &&  (rejection.status == 400 || rejection.status == 500)) {
        	  if(rejection.data.err == 'Expired Session' || rejection.data.Err == 'Internal Server Error'){
        		  $rootScope.$broadcast(400, "Session has expired, please login to continue.");
              }
          }
        
          return $q.reject(rejection);
      },
      request: function(config) {
    	// var token = window.localStorage.getItem(Constants.accessToken);
    	// config.headers.Authorization = 'Bearer ' + token;

  //  console.log(config)
    if(config.data)
      config.data.token = $cookies.get(Constants.accessToken);
      // console.log(config)
    	return config;
    }
  }
});
