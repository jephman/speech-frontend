import angular from 'angular';

function compareTo() {
  'ngInject';
  return {
    require: "ngModel",
    scope: {
        otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {
         
        ngModel.$validators.compareTo = function(modelValue) {
            return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
            ngModel.$validate();
        });
    }
  };
}


export default angular.module('custom.compareTo',[])
.directive('compareTo', compareTo)
.name;