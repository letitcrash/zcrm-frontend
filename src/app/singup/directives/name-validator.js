'use strict';
angular
  .module('inspinia')
  .directive('nameValidator', function () {
    var NAME_REGEXP = /^[a-zA-Z]+$/;

    return {
      require: 'ngModel',
      restrict: '',
      link: function(scope, elm, attrs, ctrl) {
        function customValidator(ngModelValue) {
          if (NAME_REGEXP.test(ngModelValue)) {
            ctrl.$setValidity('nameValid', true);
          } else {
            ctrl.$setValidity('nameValid', false);
          }
          return ngModelValue;
        }

        ctrl.$parsers.push(customValidator);
      }
    }
  });