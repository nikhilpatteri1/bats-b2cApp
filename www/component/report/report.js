angular.module('report', [])
    .controller('ReportCtrl', function ($scope, $rootScope, $ionicModal, $timeout,$ionicPopup, BatsServices, ionicToast, PageConfig, Constants, $state,
        UtilsFactory, $cordovaFileTransfer, $cordovaFileOpener2) {
        //***************************** for fetching device list*****************************
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
        // console.log("sadsad");
        BatsServices.activeDeviceList(inputParam).success(function (response) {
            //console.log(JSON.stringify(response));
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
        // console.log("path is: "+storagePath);

        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            // console.log(cordova.file);
        }

        // $rootScope.dateValue = new Date();
        // $rootScope.timeValue = new Date();
        // $rootScope.datetimeValue = new Date();
        $scope.gotoReport = function (data, form) {
            // console.log("inside click: "+angular.toJson(data));
            reportParam = {
                devid: data.selectedvehicle.devid,
                year: data.year,
                month: data.month.id
            }

            // console.log("report param is: "+angular.toJson(reportParam));
            BatsServices.report(reportParam).success(function (response){
                // console.log("report donwloaded"+angular.toJson(response));
                // var responseFile = new Blob([response], { type: 'application/pdf' });
                // console.log("response: "+response);
                if(!response.err){
                    downloadFile(response);
                }

            }).error(function(error){
                console.log("error found:");
                ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
            // var alertPopup = $ionicPopup.alert({
            //                 title: '',
            //                 template: '<div class="suPopupContent">This feature not implemented </div>'
                            
            //             });
                        // alertPopup.then(function (res) {
                        //     $state.go(PageConfig.LOGIN);
                        // });
        }
        // $scope.setMonth = function(value){
        //     console.log("changed month: "+value);
        // }

        function downloadFile(fileEntryContent){
            // console.log("file downloaded");
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                // console.log('file system open: ' + fs.name);
                fs.root.getFile(reportParam.devid, { create: true, exclusive: false }, function (fileEntry) {
                    // console.log("fileEntry is file?" + fileEntry.isFile.toString());
                    writeFile(fileEntry, fileEntryContent);
                }, function(error){
                    // console.log("error on 1");
                });

            }, function(error){
                // console.log("error on 2nd");
            });
        }

        function writeFile(fileEntry, dataObj) {
            // console.log("write called:");
            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function() {
                    // console.log("Successful file write...");
                    // console.log("Location is: "+angular.toJson(fileEntry));
                    // readFile(fileEntry);
                    // window.open(fileEntry.nativeURL, '_system', 'location=yes,enableViewportScale=yes,hidden=no');
                    // console.log("ref variable: "+ref);
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

                // If data object is not passed in,
                // create a new Blob instead.
                if (!dataObj) {
                    dataObj = new Blob(['some file data'], { type: 'application/pdf' });
                }

                fileWriter.write(dataObj);
            });
        }
})