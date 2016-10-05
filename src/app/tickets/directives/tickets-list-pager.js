'use strict';

angular
  .module('inspinia')
  // Directive for pagination in tickets list
  .directive('crmTicketsListPager', function(ticketsListConf) {
    return {
      restrict: 'A',
      scope: {},
      template: '<ul class="tickets-list-pagination" uib-pagination ng-model="pages.current"' +
        'items-per-page="pages.size" max-size="4" boundary-link-numbers="true"' +
        'total-items="pages.itemsTotal" previous-text="&#xf053;" next-text="&#xf054;"></ul>',
      link: function(scope) {
        // GET params for ticket list
        scope.params = ticketsListConf.params;

        // Pagination settings
        scope.pages = ticketsListConf.pages;
      }
    };
  })
