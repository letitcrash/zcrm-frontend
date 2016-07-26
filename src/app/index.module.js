(function() {
  'use strict';

  angular
    .module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMessages', 'ngAria',
        'ngResource', 'ui.router', 'oc.lazyLoad',  'ui.calendar', 'ui.bootstrap', 'pascalprecht.translate', 'ui.select',
        'ladda', 'ngFileUpload', '720kb.datepicker'])
    .run(function ($log, $translate, $rootScope, $state, dataService, generalUtils, roleService) {
      var companyName, user;
      //$rootScope.$route = $route;
      //$rootScope.routeService = routeService;
      //$rootScope.generalUtils = generalUtils;


      $rootScope.setUser = function(user) {
        $rootScope.userStr = generalUtils.formatUser(user);
        return $rootScope.isSystemAdmin = roleService.isSystemAdmin();
      };
      $rootScope.setCompanyStr = function(companyName) {
        $rootScope.companyStr = companyName;
      };

      $rootScope.setCompany = function(cp) {
        $rootScope.cp = cp;
      };

      $rootScope.setMailboxList = function(mailboxes) {
        $rootScope.mailboxes = mailboxes;
      };

      $rootScope.languages = [
        {name: 'English', alias: 'en' },
        { name: 'Norwegian', alias:'no' },
        { name: 'Spanish', alias: 'es' }
      ];
      $rootScope.language = $rootScope.languages[0];
      $translate.use($rootScope.language.alias);

      $rootScope.changeLanguage = function (language) {
        $log.log(language)
          $translate.use(language.alias);
        $rootScope.language = language;
        dataService.setUserLanguage(language);
      };

      $rootScope.getMailboxList = function() {
        return $rootScope.mailboxes;
      };

      user = dataService.getUser();
      if ((user != null)) {
        $rootScope.setUser(user);
      }

      companyName = dataService.getCurrentCompanyStr();
      if ((companyName != null)) {
        $rootScope.setCompanyStr(companyName);
      }

      /*
      language = dataService.getUserLanguage();
      if ((language != null)) {
        $rootScope.changeLanguage(language);
      }
      */

      $rootScope.logout = function() {
        dataService.clearData();
        $state.transitionTo("login");
      };

      var redirToLogin = $rootScope.$on("$stateChangeStart", function(event, toState){ // eslint-disable-line no-unused-vars
        if (toState.authenticate){
          // User isn’t authenticated
          if (!dataService.getSessionToken()) {
            $log.log("User is not logged in and is located on a non-public page, redirecting to login");
            $state.transitionTo("login");
            event.preventDefault(); 
          }
        }
      });
    });
})();


