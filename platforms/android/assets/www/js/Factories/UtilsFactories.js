angular.module('utilsfactory', [])
.factory('UtilsFactory', function () {
    var signUpData = [];
    var manageTrackerDetails = [];
    var eventHistoryList = [];
    var vehicleStatitics=[];
    var editMemberDetails=[];
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
      
    }
});