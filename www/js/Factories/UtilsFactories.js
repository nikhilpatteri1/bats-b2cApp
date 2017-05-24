angular.module('utilsfactory', [])
    .factory('UtilsFactory', function () {
        var signUpData = [];
        var manageTrackerDetails = [];
        var eventHistoryList = [];
        var vehicleStatitics = [];
        var editMemberDetails = [];
        var editMarkerDetails = [];
        var dataForReplay = [];
        var dateVehicleStatistics = [];
         var livetrackingDetails = [];
         var notificationDetails = [];
         var historyFilterList = [];
         var notificationCount;
         var polygonPath = [];
         var notificationcallFirst=[];
        return {
            setSignUpData: function (data) {
                signUpData = data;
            },
            getSignUpData: function () {
                return signUpData;
            },
            setManageTrackerDetails: function (data) {
                manageTrackerDetails = data;
            },
            getManageTrackerDetails: function () {
                return manageTrackerDetails;
            },
            setEventHistoryList: function (data) {
                eventHistoryList = data;
            },
            getEventHistoryList: function () {
                return eventHistoryList;
            },
            setVehicleStatitics: function (data) {
                vehicleStatitics = data;
            },
            getVehicleStatitics: function () {
                return vehicleStatitics;
            },
            setEditMemberDetails: function (data) {
                editMemberDetails = data;
            },
            getEditMemberDetails: function () {
                return editMemberDetails;
            },
            setEditMarkerDetails: function (data) {
                editMarkerDetails = data;
            },
            getEditMarkerDetails: function () {
                return editMarkerDetails;
            },

            setDataForReplay: function (data) {
                dataForReplay = data;
            },
            getDataForReplay: function () {
                return dataForReplay;
            },

            setDateVehicleStatistics: function (data) {
                dateVehicleStatistics = data;
            },
            getDateVehicleStatistics: function () {
                return dateVehicleStatistics;
            },
            setLivetrackingDetails: function(data){
                livetrackingDetails = data;
            },
            getLivetrackingDetails :function(){
                return livetrackingDetails;
            },

             setNotificationDetails: function(data){
                notificationDetails = data;
            },
            getNotificationDetails :function(){
                return notificationDetails;
            },
            getHistoryFilterList : function(){
                return historyFilterList;
            },
            setHistoryFilterList : function(data){
                historyFilterList = data;
            }
            ,
            getNotificationCount : function(){
                return notificationCount;
            },
            setNotificationCount : function(data){
                notificationCount = data;
            },
            getPolygonPath : function(){
                return polygonPath;
            },
            setPolygonPath : function(data){
                polygonPath = data;
            }

            ,
            getNotificationcallFirst : function(){
                return notificationcallFirst;
            },
            setNotificationcallFirst : function(data){
                notificationcallFirst = data;
            }

        }
    });