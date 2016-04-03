(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "app/main/main.html",
        data: { pageTitle: 'Example view' }
      })
      .state('index.mail', {
        url: "/mailbox",
        templateUrl: "app/mail/mailbox.html",
        data: { pageTitle: 'Mailbox' }
      })
      .state('index.teams', {
        url: "/teams",
        templateUrl: "app/teams/teams.html",
        data: { pageTitle: 'Teams' }
      })
      .state('index.clients', {
        url: "/clients",
        templateUrl: "app/clients/clients.html",
        data: { pageTitle: 'Clients' }
      })
      .state('index.docs', {
        url: "/documents",
        templateUrl: "app/docs/docs.html",
        data: { pageTitle: 'Documents' }
      })
      .state('index.calendar', {
        url: "/calendar",
        templateUrl: "app/calendar/calendar.html",
        data: { pageTitle: 'Calendar' }
      })
      .state('index.tickets', {
        url: "/tickets",
        templateUrl: "app/tickets/tickets.html",
        data: { pageTitle: 'Tickets' }
      })
      .state('index.projects', {
        url: "/minor",
        templateUrl: "app/projects/projects.html",
        data: { pageTitle: 'Projects' }
      });

    $urlRouterProvider.otherwise('/index/main');
  }

})();
