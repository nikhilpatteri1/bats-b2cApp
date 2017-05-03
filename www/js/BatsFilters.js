angular.module('batsfilters', [])
.filter('eventTime', function(){
    return function(input){
        console.log(input)
        return moment(input).format('HH:MM, DDMMM');
    }
})

.filter('eventTimeDate', function(){
    return function(input){
        console.log(input)
        return moment(parseInt(input)).format('HH:MM:SS, DDMMMYYYY');
    }
})

.filter('filterAlarm', function() {
    return function(eventHistoryValues, filterList){
        var output = [];
        if(eventHistoryValues && filterList){
            for(var i=0;i<eventHistoryValues.length;i++){
                var item = eventHistoryValues[i];
                for(var j=0;j<filterList.length;j++){
                    var filterItem = filterList[j];
                    if(filterItem==item.alarm_type){
                        output.push(item);
                        break;
                    }
                }
            }
            return output;
        }
        if(output.length==0){
            return eventHistoryValues;
        }
    }
})