angular.module('report', [])
    .controller('ReportCtrl', function ($scope, $rootScope, $ionicModal, $timeout,$ionicPopup, BatsServices, ionicToast, PageConfig, Constants, $state,
        UtilsFactory, $cordovaFileTransfer, $cordovaFileOpener2) {

        var storagePath;
        var reportParam = {};
        var options = {
            'Content-type' : 'application/pdf'
        };
        $scope.years = ['2017'];
        $scope.months = [{'id':'1','month':'January'},
                            {'id':'2','month':'February'},
                            {'id':'3','month':'March'},
                            {'id':'4','month':'April'},
                            {'id':'5','month':'May'},
                            {'id':'6','month':'June'},
                            {'id':'7','month':'July'},
                            {'id':'8','month':'August'},
                            {'id':'9','month':'September'},
                            {'id':'10','month':'October'},
                            {'id':'11','month':'November'},
                            {'id':'12','month':'December'}];
        var inputParam = {};
        //***************************** for fetching device list******************
        BatsServices.activeDeviceList(inputParam).success(function (response) {
            $scope.deviceList = response;
        }).error(function (error) {
            ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
        // ***************** end of fetching devices *****************************

        if (ionic.Platform.isIOS()){
            storagePath = cordova.file.cacheDirectory + "/temp";
        }else if(ionic.Platform.isAndroid()){
            storagePath = cordova.file.externalRootDirectory + "/yourapp/temp";
        }

        $scope.gotoReport = function (data, form) {
            reportParam = {
                devid: data.selectedvehicle.devid,
                year: data.year,
                month: data.month.id
            }
            BatsServices.report(reportParam).success(function (response){
                if(!response.err){
                    downloadFile(response);
                }
            }).error(function(error){
                ionicToast.show('Please select a different date.', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }

        /* get access to the file & download file */
        function downloadFile(fileEntryContent){
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                fs.root.getFile(reportParam.devid, { create: true, exclusive: false }, function (fileEntry) {
                    writeFile(fileEntry, fileEntryContent);
                }, function(error){
                    // console.log("error on 1");
                });
            }, function(error){
                // console.log("error on 2nd");
            });
        }

        function writeFile(fileEntry, dataObj){
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function() {
                    $cordovaFileOpener2.open(
                        fileEntry.nativeURL,
                        'application/pdf'
                    ).then(function() {
                        // file opened successfully
                    }, function(err) {
                        // An error occurred. Show a message to the user
                    });
                };

                fileWriter.onerror = function (e) {
                    // console.log("Failed file write: " + e.toString());
                };

                // If data object is not passed in, create a new Blob instead.
                if (!dataObj) {
                    dataObj = new Blob(['some file data'], { type: 'application/pdf' });
                }
                fileWriter.write(dataObj);
            });
        }
})