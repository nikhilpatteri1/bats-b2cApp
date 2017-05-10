angular.module('vehiclestatisticsdetail', [])
.controller('VehicleStatisticsDetailCtrl', function($scope,$rootScope, $state, $ionicModal, $timeout, PageConfig, 
    UtilsFactory, Constants, ChartFactory) {
     if (UtilsFactory.getNotificationDetails()) {
            console.log(UtilsFactory.getNotificationDetails());
            $scope.notificationData = UtilsFactory.getNotificationDetails();
            $scope.count = UtilsFactory.getNotificationCount();
            console.log($scope.count);
            if($scope.count==undefined){
                $scope.count=0;
                $scope.notificationData=[];
            }
        }

    
    if(UtilsFactory.getVehicleStatitics().length==0){
        $state.go(PageConfig.VEHICLE_STATISTICS)
    }
    $scope.vehicleStatistics = UtilsFactory.getVehicleStatitics();
    $scope.startEndDate= UtilsFactory.getDateVehicleStatistics();
  //  console.log($scope.startEndDate+"hi im device "+ $scope.vehicleStatistics.devtype);
    $scope.startdate=moment($scope.startEndDate.sts).format('DD/MM/YYYY, HH:MM');
  //  console.log($scope.startdate);
     $scope.enddate=moment($scope.startEndDate.ets).format('DD/MM/YYYY, HH:MM');
    console.log($scope.enddate);
    ChartFactory.solidGaugeChart.data("widgetId1", "#00ba88", parseInt($scope.vehicleStatistics.min_speed), 0, 200, "Min");
    ChartFactory.solidGaugeChart.data("widgetId2", "#f65e77", parseInt($scope.vehicleStatistics.max_speed), 0, 200, "Max");
    ChartFactory.solidGaugeChart.data("widgetId3", "#fbbf16", parseInt($scope.vehicleStatistics.avg_speed), 0, 200, "Avg");

    $scope.backToVehicleStatistics=function(){
        $state.go(PageConfig.VEHICLE_STATISTICS);
    }
})