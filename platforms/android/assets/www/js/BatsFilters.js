angular.module('batsfilters', [])
.filter('eventTime', function(){
    return function(input){
        console.log(input)
        return moment(input).format('HH:MM, DDMMM');
    }
})