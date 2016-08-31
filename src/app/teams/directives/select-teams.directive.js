'use strict';

angular
  .module('inspinia')
  // Directive for typeahead select for Teams
  .directive('selectTeams', function() {
    return {
      restrict: 'A',
      require: 'typeaheadSelect',
      link: function(scope, elem, atts, taSelect) {
        taSelect.addItemTitle(function(item) { return item.name; });
      }
    };
  });
