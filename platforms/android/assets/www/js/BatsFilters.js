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