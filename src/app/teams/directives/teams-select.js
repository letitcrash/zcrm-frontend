'use strict';

angular
  .module('inspinia')
  // Directive for Teams selecting base on ui-select
  .directive('crmTeamsSelect', function(teamService) {
    return {
      restrict: 'A',
      scope: {selected: '=crmTeamsSelect'},
      templateUrl: 'app/teams/directives/teams-select.html',
      link: function(scope) {
        // Teams
        scope.teams = [];

        // Get teams
        scope.getTeams = function getTeams(search) {
          // TODO: Rewrite teamService for pacing search term only
          teamService.getList(null, 1000, 1, search).then(function(res) { scope.teams = res.data; });
        };
      }
    };
  });
