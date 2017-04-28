angular.module('vehiclestatisticsdetail', [])
.controller('VehicleStatisticsDetailCtrl', function($scope,$rootScope, $state, $ionicModal, $timeout, PageConfig, 
    UtilsFactory, Constants, ChartFactory) {
    
    
    if(UtilsFactory.getVehicleStatitics().length==0){
        $state.go(PageConfig.VEHICLE_STATISTICS)
    }
    $scope.vehicleStatistics = UtilsFactory.getVehicleStatitics();
    $scope.startEndDate= UtilsFactory.getDateVehicleStatistics();
    console.log($scope.startEndDate);
    $scope.startdate=moment($scope.startEndDate.sts).format('DD/MM/YYYY, HH:MM');
    console.log($scope.startdate);
     $scope.enddate=moment($scope.startEndDate.ets).format('DD/MM/YYYY, HH:MM');
    console.log($scope.enddate);
    ChartFactory.solidGaugeChart.data("widgetId1", "#00ba88", parseInt($scope.vehicleStatistics.min_speed), 0, 200, "Min");
    ChartFactory.solidGaugeChart.data("widgetId2", "#f65e77", parseInt($scope.vehicleStatistics.max_speed), 0, 200, "Max");
    ChartFactory.solidGaugeChart.data("widgetId3", "#fbbf16", parseInt($scope.vehicleStatistics.avg_speed), 0, 200, "Avg");

    $scope.backToVehicleStatistics=function(){
        $state.go(PageConfig.VEHICLE_STATISTICS);
    }
})