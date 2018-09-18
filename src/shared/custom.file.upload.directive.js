import angular from 'angular';

function fileModel($parse) {
  'ngInject';
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.customFileModel);
        var modelSetter = model.assign;
        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}

export default angular.module('custom.fileupload',[])
.directive('customFileModel', fileModel)
.name;