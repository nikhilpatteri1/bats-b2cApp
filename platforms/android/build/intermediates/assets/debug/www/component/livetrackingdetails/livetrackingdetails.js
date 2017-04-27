angular.module('livetrackingdetails', [])
    .controller('LiveTrackingDetailsCtrl', function ($scope, $ionicModal,UtilsFactory, $timeout,BatsServices) {

        // if (UtilsFactory.getLivetrackingDetails().length == 0) {
        // $state.go(PageConfig.LIVE_TRACKING)
        // }
        

        $scope.init = function(){
            $scope.data = UtilsFactory.getLivetrackingDetails();
            console.log($scope.data);
           
        }

        $scope.getColorBack =function(div){
//			console.log(div)
			
			if(div=="0"){
				setTimeout(function() {
				$scope.singleImg_url="../images/mapIcon/geofenceStatus.png";
				//$(".barStyleSingle").css("background-color", "#f44336");
				$scope.barTxt= "Crossed Geofence";
				$(".lvdstatusColor").css("background-color", "#710e9f");
				
				},7000);
			}
			else if(div=="1"){
				$scope.singleImg_url="../images/mapIcon/speed-limit.png";
				$scope.barTxt= "Crossed Speed";
				$(".lvdstatusColor").css("background-color", "#ffd500");
				//$(".barStyleSingle").css("background-color", "#ffde01");
			}
			else if(div=="2"){
				$scope.singleImg_url="../images/mapIcon/warning.png";
				$scope.barTxt= "Crossed Geofence and Speed";
				$(".lvdstatusColor").css("background-color", "#ff0000");
				//$(".barStyleSingle").css("background-color", "#e59305");
			}
			else if(div== "3"){
				$scope.singleImg_url="../images/mapIcon/normal.png";
				$scope.barTxt= "Normal State";
				$(".lvdstatusColor").css("background-color", "#7fbb01");
				//$(".barStyleSingle").css("background-color", "#000000");
			}
			else if(div== "4"){
				$scope.singleImg_url="../images/mapIcon/no-response.png";
				$scope.barTxt= "No-Response State";
				$(".lvdstatusColor").css("background-color", "#2d2d2d");
				//$(".barStyleSingle").css("background-color", "#0540E5");
			}
		}




        //$scope.status=0;//0,1,2,3,4
        if($scope.status==0){
            $scope.statusType='Geofence Cross';
        }
        else if($scope.status==1){
            $scope.statusType='OverSpeed';
        }
        else if($scope.status==2){
            $scope.statusType='Crossed Geofence and Speed';
        }
        else if($scope.status==3){
            $scope.statusType='Running Normal';
        }
        else if($scope.status==4){
            $scope.statusType='No Responce';
        }
        $scope.ts= '1492576783509';//$filter('asda')(value)
    })