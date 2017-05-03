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
        console.log("values:"+eventHistoryValues+" "+filterList);
        var output = [];
        if(eventHistoryValues && filterList){
            // console.log("inside filter: "+eventHistoryValues+" filter: "+filterList);
            angular.forEach(eventHistoryValues, function (input) {
                // console.log("outside if: "+angular.toJson(input));
                if(filterList.indexOf(input.alarm_type) !== -1){
                    output.push(input);
                    // console.log("inside if: "+angular.toJson(input));
                }
            });
        }
        // console.log("returning: "+angular.toJson(output));
        return output;
    }
})