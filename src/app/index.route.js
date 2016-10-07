'use strict';

angular
  .module('inspinia')
  .config(function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        abstract: false,
        templateUrl: 'app/login/login_two_columns.html',
        data: {pageTitle: 'Register', specialClass: 'gray-bg'},
        authenticate: false
      })
      .state('apply', {
        url: '/apply',
        templateUrl: 'app/singup/apply.html',
        data: {pageTitle: 'Wizard form'},
        //controller: 'SignupCtrl',
        authenticate: false
      })
      .state('passwordrecovery', {
        url: '/password-recovery/{userId}/{token}',
        templateUrl: 'app/singup/password-recovery.html',
        data: {pageTitle: 'Wizard form'},
        //controller: 'SignupCtrl',
        authenticate: false
      })
      .state('signup', {
        url: '/signup/user?token&email',
        templateUrl: 'app/singup/singup.html',
        data: {pageTitle: 'Wizard form'},
        authenticate: false,
        controller: 'SignupUserCtrl as signup'
      })
      .state('index', {
        abstract: true,
        url: '/index',
        templateUrl: 'app/common/content.html',
        authenticate: true
      })

      // CMS

      .state('index.cms', {
        url: '/cms',
        templateUrl: 'app/cms/cms-index.html',
        data: {pageTitle: 'Site'},
        authenticate: true
      })
      .state('index.cmsNews', {
        url: '/cms/news',
        templateUrl: 'app/cms/cms-index.html',
        data: {pageTitle: 'Site'},
        authenticate: true
      })
      .state('index.cmsEmployees', {
        url: '/cms/employeesNews',
        templateUrl: 'app/cms/cms-index.html',
        data: {pageTitle: 'Site'},
        authenticate: true
      })
      .state('index.cmsArticles', {
        url: '/cms/articles',
        templateUrl: 'app/cms/cms-index.html',
        data: {pageTitle: 'Site'},
        authenticate: true
      })
      .state('index.cmsPages', {
        url: '/cms/pages',
        templateUrl: 'app/cms/cms-index.html',
        data: {pageTitle: 'Site'},
        authenticate: true
      })
      .state('index.addnews', {
        url: '/cms/news/add',
        templateUrl: 'app/cms/add-news.html',
        data: {pageTitle: 'Site'},
        authenticate: true
      })
      .state('index.editnews', {
        url: '/cms/news/edit?articleId',
        templateUrl: 'app/cms/edit-news.html',
        data: {pageTitle: 'Edit article'},
        authenticate: true
      })
      .state('index.editpage', {
        url: '/cms/page/edit?pageId',
        templateUrl: 'app/cms/edit-page.html',
        data: {pageTitle: 'Page edit'},
        authenticate: true
      })
      .state('index.addpage', {
        url: '/cms/pages/add',
        templateUrl: 'app/cms/add-page.html',
        data: {pageTitle: 'Create page'},
        authenticate: true
      })

      // CMS Articles
      .state('index.editArticle', {
        url: '/cms/article/edit?articleId',
        templateUrl: 'app/cms/edit-article.html',
        data: {pageTitle: 'Page edit'},
        authenticate: true
      })
      .state('index.addArticle', {
        url: '/cms/article/add',
        templateUrl: 'app/cms/add-article.html',
        data: {pageTitle: 'Create article'},
        authenticate: true
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
        controller: 'MailboxInboxController as inbox',
        authenticate: true
      })
      .state('index.mail.list', {
        parent: 'index.mail',
        url: '/mailbox/list',
        templateUrl: 'app/mail/mailbox.mbox-list.html',
        controller: 'MailboxListController as lstbox',
        authenticate: true
      })
      .state('index.mail.attachMsgs', {
        parent: 'index.mail',
        url: '/mailbox/:mailboxId/attach-msgs',
        templateUrl: 'app/mail/mailbox.attach-msgs.html',
        controller: 'MailboxAttachMsgsController as ambox',
        authenticate: true
      })
      .state('outlook', {
        url: '/outlook',
        templateUrl: 'app/mail/outlook.html',
        data: {pageTitle: 'Outlook view', specialClass: 'fixed-sidebar'},
        authenticate: true
      })
      .state('index.teams', {
        url: '/teams',
        templateUrl: 'app/teams/teams.html',
        data: {pageTitle: 'Teams'},
        authenticate: true
      })
      .state('index.clients', {
        url: '/clients',
        templateUrl: 'app/clients/clients.html',
        data: {pageTitle: 'Clients'},
        authenticate: true

      })
      .state('index.docs', {
        url: '/documents',
        templateUrl: 'app/docs/docs.html',
        data: {pageTitle: 'Documents'},
        authenticate: true

      })
      .state('index.calendar', {
        url: '/calendar',
        templateUrl: 'app/calendar/calendar.html',
        data: {pageTitle: 'Calendar'},
        authenticate: true

      })
      .state('index.projects', {
        url: '/projects',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsCtrl',
        data: {pageTitle: 'projects'},
        authenticate: true
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
        authenticate: true,
        templateUrl: 'app/tickets/list.html',
        controller: 'TicketsListCtrl as ts'
      })
      .state('index.tickets.detail', {
        parent: 'index.tickets',
        url: '/browse/:ticketId',
        authenticate: true,
        templateUrl: 'app/tickets/detail.html',
        controller: 'TicketDetailCtrl as tsDetail'
      })
      .state('index.tickets.create', {
        parent: 'index.tickets',
        url: '/create',
        authenticate: true,
        templateUrl: 'app/tickets/create.html',
        controller: 'TicketCreateCtrl as tsCreate'
      })
      .state('index.settings', {
        url: '/settings',
        templateUrl: 'app/settings/setting.html',
        data: {pageTitle: 'Settings'},
        authenticate: true
      })
      .state('index.companies', {
        url: '/companies',
        templateUrl: 'app/companies/companies.html',
        data: {pageTitle: 'companies'},
        authenticate: true
      })

      // Employees

      .state('index.employees', {
        abstract: true,
        url: '/employees',
        data: {pageTitle: 'Employees'},
        authenticate: true,
        template: '<div data-ui-view></div>'
      })
      .state('index.employees.list', {
        parent: 'index.employees',
        url: '/list',
        authenticate: true,
        templateUrl: 'app/employees/list.html',
        controller: 'EmployeesListCtrl as emp'
      })
      .state('index.employees.detail', {
        parent: 'index.employees',
        url: '/browse/:empId',
        authenticate: true,
        templateUrl: 'app/employees/detail.html',
        controller: 'EmployeeDetailCtrl as empDetail'
      })
      .state('index.employees.create', {
        parent: 'index.employees',
        url: '/create',
        authenticate: true,
        templateUrl: 'app/employees/create.html',
        controller: 'EmployeeCreateCtrl as empCreate'
      })

      // Templates; only html

      .state('index.companies-create', {
        url: '/companies-create',
        templateUrl: 'app/companies/companies.create.html',
        authenticate: true
      })
      .state('index.companies.detail', {
        url: '/companies/:companyId',
        templateUrl: 'app/companies/company.detail.html',
        data: {pageTitle: 'companies'},
        authenticate: true
      })
      .state('index.companies-detail', {
        url: '/companies-detail',
        templateUrl: 'app/companies/company.detail.html',
        authenticate: true
      })

      // Templates

      .state('index.timer', {
        url: '/timer',
        templateUrl: 'app/timer/timer.html',
        data: {pageTitle: 'timer'},
        authenticate: true

      })
      .state('index.landing', {
        url: '/landing',
        templateUrl: 'app/landing/landing.html',
        data: {pageTitle: 'landing'},
        authenticate: true

      })
      .state('index.404', {
        url: '/404',
        templateUrl: 'app/404/404.html',
        data: {pageTitle: '404 Page not found'},
        authenticate: true
      });

    $urlRouterProvider.otherwise('/index/tickets/list');
  });
