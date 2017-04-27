angular.module('vehiclestatisticsdetail', [])
.controller('VehicleStatisticsDetailCtrl', function($scope,$rootScope, $state, $ionicModal, $timeout, PageConfig, 
    UtilsFactory, Constants, ChartFactory) {
    if(UtilsFactory.getVehicleStatitics().length==0){
        $state.go(PageConfig.VEHICLE_STATISTICS)
    }
    $scope.vehicleStatistics = UtilsFactory.getVehicleStatitics();
    console.log($scope.vehicleStatistics);
    ChartFactory.solidGaugeChart.data("widgetId1", "#00ba88", 100, 0, 200, "Min");
    ChartFactory.solidGaugeChart.data("widgetId2", "#f65e77", 100, 0, 200, "Max");
    ChartFactory.solidGaugeChart.data("widgetId3", "#fbbf16", 100, 0, 200, "Avg");
})