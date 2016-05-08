(function() {
  'use strict';

  angular
    .module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'oc.lazyLoad',  'ui.calendar', 'ui.bootstrap', 'pascalprecht.translate','ui.select', 'ladda', 'ngFileUpload']);


   angular.module("inspinia")
  .run(function ($translate, $rootScope, $state, dataService, generalUtils, roleService, mailboxService ) {

    
  var companyName, initConstants, user, language;
  //$rootScope.$route = $route;
  //$rootScope.routeService = routeService;
  //$rootScope.generalUtils = generalUtils;


  $rootScope.setUser = function(user) {
    $rootScope.userStr = generalUtils.formatUser(user);
    return $rootScope.isSystemAdmin = roleService.isSystemAdmin();
  };
  $rootScope.setCompanyStr = function(companyName) {
    return $rootScope.companyStr = companyName;
  };

  $rootScope.setMailboxList = function(mailboxes) {
    $rootScope.mailboxes = mailboxes;
  };

  $rootScope.languages = [{name: 'English', alias: 'en' },{ name: 'Norwegian', alias:'no' },{ name: 'Spanish', alias: 'es' }];
  $rootScope.language = $rootScope.languages[0];
  $translate.use($rootScope.language.alias);

  $rootScope.changeLanguage = function (language) {
        console.log(language)
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

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate){
          // User isn’t authenticated
          if (!dataService.getSessionToken()) {
            console.log("User is not logged in and is located on a non-public page, redirecting to login");
            $state.transitionTo("login");
            event.preventDefault(); 
        }
      }
    });
  });

})();


