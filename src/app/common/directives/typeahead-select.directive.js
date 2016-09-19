'use strict';

angular
  .module('inspinia')
  // Directive for typeahead select
  .directive('typeaheadSelect', function() {
    function findItemIndexById(items, id) {
      var idx = -1;

      items.forEach(function(item, i) {
        if (item.id === id) {
          idx = i;
          return false;
        }
      });

      return idx;
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      templateUrl: '/app/main/directives/typeahead-select.directive.html',
      link: function(scope, elem, atts, ngModel) {
        ngModel.$render = function() {
          if (angular.isArray(ngModel.$modelValue)) { scope.items = ngModel.$modelValue; }
        };

        scope.addItem = function addItem(item) {
          if (findItemIndexById(scope.items, item.id) === -1) { scope.items.push(item); }
        };

        scope.removeItem = function removeItem(item) {
          scope.items.splice(findItemIndexById(scope.items, item.id), 1);
        };

      },
      controller: ['$scope', function($scope) {
        this.addItemTitle = function(builder) {
          $scope.itemTitle = builder;
        };
      }]
    };
  });
