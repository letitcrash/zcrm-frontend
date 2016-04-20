(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

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
            controller: 'SignupCtrl',
            "authenticate": false
      })
      .state('passwordrecovery', {
            url: "/password-recovery/{userId}/{token}",
            templateUrl: "app/singup/password-recovery.html",
            data: { pageTitle: 'Wizard form' },
            controller: 'SignupCtrl',
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
      .state('index.mail', {
        url: "/mailbox",
        templateUrl: "app/mail/mailbox.html",
        data: { pageTitle: 'Mailbox' },
        "authenticate": true,
        resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'bootstrap',
                            files: ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js']
                        },
                        {
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
                        }
                    ]);
                }
        }
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
      .state('index.tickets', {
        url: "/tickets",
        templateUrl: "app/tickets/tickets.html",
        data: { pageTitle: 'Tickets' },
                "authenticate": true

      })
      .state('index.settings', {
        url: "/settings",
        templateUrl: "app/settings/setting.html",
        data: { pageTitle: 'Settings' },
                "authenticate": true

      })
      .state('index.projects', {
        url: "/minor",
        templateUrl: "app/projects/projects.html",
        data: { pageTitle: 'Projects' },
                "authenticate": true

      });

    $urlRouterProvider.otherwise('/index/main');
  }

})();
