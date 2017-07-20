angular.module('report', [])
    .controller('ReportCtrl', function ($scope, $rootScope, BatsServices, ionicToast, PageConfig, Constants, $state,
        UtilsFactory) {

        var reportParam = {};
        var bytes;
        var fileName;
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


        $scope.gotoReport = function (data, form) {
            reportParam = {
                devid: data.selectedvehicle.devid,
                year: data.year,
                month: data.month.id
            }
            fileName = reportParam.devid+'.pdf';
            BatsServices.report(reportParam).success(function (response){
                if(!response.err){
                    bytes = new Uint8Array(response);
                    writePDFToFile(fileName, bytes);
                }
            }).error(function(error){
                ionicToast.show('Please select a different Month.', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            })
        }


        function writePDFToFile(fileName, data){
            try{
                window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(directoryEntry){
                    directoryEntry.getFile(fileName, { create: true }, function(fileEntry){
                        fileEntry.createWriter(function(fileWriter){
                            fileWriter.onwriteend = function(e){
                                cordova.plugins.fileOpener2.open(cordova.file.externalApplicationStorageDirectory + fileName, 'application/pdf',{
                                    error: function(e){
                                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                                    },
                                    success: function () {
                                        console.log('file opened successfully');
                                    }
                                });
                            };

                            fileWriter.onerror = function(e){
                                alert(e);
                            };

                            var blob = new Blob([data], { type: 'application/pdf' });
                            fileWriter.write(blob);

                        }, function onerror(e){
                            alert(e);
                        });
                    }, function onerror(e){

                        alert(e);
                    });
                },function onerror(e){            
                    alert(e);
                });
            }catch(e){
                alert(e);
            }
        }
})