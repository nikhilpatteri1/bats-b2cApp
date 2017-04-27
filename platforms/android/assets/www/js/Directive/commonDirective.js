angular.module('commondirective', [])
.directive('tooltip', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (attrs.title) {
                var $element = $(element);
                console.log($element, attrs)
                $element.attr("title", attrs.title)
                $element.tooltipster({
                    animation: attrs.animation,
                    trigger: "click",
                    position: "right",
                    positionTracker: true,
                    maxWidth: 1500,
                    contentAsHTML: true
                });
            }
        }
    };
})

.directive('noSpecialChar', function() {
   return {
     require: 'ngModel',
     restrict: 'A',
     link: function(scope, element, attrs, modelCtrl) {
            console.log(element.find('input'))
             var html = element.find('input').prevObject[0];
             html.onkeydown = function(e) {
                           if(!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) 
                             || e.keyCode == 8 ||  (e.keyCode > 36 && e.keyCode < 41))) {
                               return false;
                           }
                       }
     }
   }
})
.directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.changePasswordForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})
// directive('validPasswordC', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, elm, attrs, ctrl) {
//             ctrl.$parsers.unshift(function (viewValue, $scope) {
//                 var noMatch = viewValue != scope.changePasswordForm.password.$viewValue
//                 ctrl.$setValidity('noMatch', !noMatch)
//             })
//         }
//     }
// })