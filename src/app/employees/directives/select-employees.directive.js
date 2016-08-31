'use strict';

angular
  .module('inspinia')
  // Directive for typeahead select for Employees
  .directive('selectEmployees', function() {
    return {
      restrict: 'A',
      require: 'typeaheadSelect',
      link: function(scope, elem, atts, taSelect) {
        taSelect.addItemTitle(function(item) {
          return item.contactProfile.firstname + ' ' + item.contactProfile.lastname;
        });
      }
    };
  });
