'use strict';

angular
  .module('inspinia')
  .config(routerConfig);

function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: "/login",
      abstract: false,
      templateUrl: "app/login/login_two_columns.html",
      data: { pageTitle: 'Register', specialClass: 'gray-bg' },
      "authenticate": false
    })
    .state('apply', {
      url: "/apply",
      templateUrl: "app/singup/apply.html",
      data: { pageTitle: 'Wizard form' },
      //controller: 'SignupCtrl',
      "authenticate": false
    })
    .state('passwordrecovery', {
      url: "/password-recovery/{userId}/{token}",
      templateUrl: "app/singup/password-recovery.html",
      data: { pageTitle: 'Wizard form' },
      //controller: 'SignupCtrl',
      "authenticate": false
    })
    .state('signup', {
      url: "/signup/user?token&email",
      templateUrl: "app/singup/singup.html",
      data: { pageTitle: 'Wizard form' },
      "authenticate": false
    })
    .state('index', {
      abstract: true,
      url: "/index",
      templateUrl: "app/components/common/content.html"
    })
    .state('index.main', {
      url: "/main",
      templateUrl: "app/main/main.html",
      data: { pageTitle: 'Example view' },
      "authenticate": true
    })
    .state('index.cms', {
      url: '/cms/news',
      templateUrl: 'app/cms/news-list.html',
      data: { pageTitle: 'Site' },
      "authenticate": true
    })
    .state('index.addnews', {
      url: '/cms/news/add',
      templateUrl: 'app/cms/add-news.html',
      data: { pageTitle: 'Site' },
      "authenticate": true
    })
    .state('index.cmsarticle', {
      url: '/cms/article',
      templateUrl: 'app/cms/article.html'
    })
    .state('index.mail', {
      templateUrl: 'app/mail/mailbox.html',
      data: {pageTitle: 'Mailbox', viewClass: 'mailbox-view'},
      authenticate: true,
      controller: 'MailboxController as mbox'
    })
    .state('index.mail.inbox', {
      parent: 'index.mail',
      url: '/mailbox/:mailboxId/inbox',
      templateUrl: 'app/mail/mailbox.inbox.html',
      controller: 'MailboxInboxController as inbox'
    })
    .state('index.mail.list', {
      parent: 'index.mail',
      url: '/mailbox/list',
      templateUrl: 'app/mail/mailbox.mbox-list.html',
      controller: 'MailboxListController as lstbox'
    })
    .state('index.mail.attachMsgs', {
      parent: 'index.mail',
      url: '/mailbox/:mailboxId/attach-msgs',
      templateUrl: 'app/mail/mailbox.attach-msgs.html',
      controller: 'MailboxAttachMsgsController as ambox'
    })
    .state('outlook', {
      url: "/outlook",
      templateUrl: "app/mail/outlook.html",
      data: { pageTitle: 'Outlook view', specialClass: 'fixed-sidebar' }
    })
    .state('index.teams', {
      url: "/teams",
      templateUrl: "app/teams/teams.html",
      data: { pageTitle: 'Teams' },
      "authenticate": true
    })
    .state('index.clients', {
      url: "/clients",
      templateUrl: "app/clients/clients.html",
      data: { pageTitle: 'Clients' },
      "authenticate": true

    })
    .state('index.docs', {
      url: "/documents",
      templateUrl: "app/docs/docs.html",
      data: { pageTitle: 'Documents' },
      "authenticate": true

    })
    .state('index.calendar', {
      url: "/calendar",
      templateUrl: "app/calendar/calendar.html",
      data: { pageTitle: 'Calendar' },
      "authenticate": true

    })
    .state('index.projects', {
      url: "/projects",
      templateUrl: "app/projects/projects.html",
      controller: 'ProjectsCtrl',
      data: { pageTitle: 'projects' },
      "authenticate": true
    })
    .state('index.tickets', {
      abstract: true,
      url: '/tickets',
      data: {pageTitle: 'Tickets'},
      authenticate: true,
      template: '<div data-ui-view></div>'
    })
    .state('index.tickets.list', {
      parent: 'index.tickets',
      url: '/list',
      templateUrl: 'app/tickets/list.html',
      controller: 'TicketsListCtrl as ts'
    })
    .state('index.tickets.detail', {
      parent: 'index.tickets',
      url: '/:ticketId',
      templateUrl: 'app/tickets/detail.html',
      controller: 'TicketDetailCtrl as tsDetail'
    })
    .state('index.tickets.create', {
      parent: 'index.tickets',
      url: '/create',
      templateUrl: 'app/tickets/create.html',
      controller: 'CreateTicketCtrl as tsCreate'
    })
    .state('index.settings', {
      url: "/settings",
      templateUrl: "app/settings/setting.html",
      data: { pageTitle: 'Settings' },
      "authenticate": true
    })
    .state('index.companies', {
      url: "/companies",
      templateUrl: "app/companies/companies.html",
      data: { pageTitle: 'companies' },
      "authenticate": true

    })
    .state('index.timer', {
      url: "/timer",
      templateUrl: "app/timer/timer.html",
      data: { pageTitle: 'timer' },
      "authenticate": true

    })
    .state('index.landing', {
      url: "/landing",
      templateUrl: "app/landing/landing.html",
      data: { pageTitle: 'landing' },
      "authenticate": true

    })
    .state('index.employees', {
      url: "/employees",
      templateUrl: "app/employees/employees.html",
      data: { pageTitle: 'Employees' },
      "authenticate": true

    })
    .state('index.404', {
      url: "/404",
      templateUrl: "app/404/404.html",
      data: { pageTitle: '404 Page not found' },
      "authenticate": true
    });

  $urlRouterProvider.otherwise('/index/main');
}
