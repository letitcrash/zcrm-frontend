(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(initConstants);


  /** @ngInject */
  function initConstants($log, $rootScope, dataService, mailboxService) {


    //dataService.setBaseServiceURL('https://desk-it.com:10443/')
    dataService.setBaseServiceURL('http://192.168.1.50:9000/')


  	$rootScope.isOnSignup = false;
    $rootScope.JSON_PRINT = true;
    $log.debug('runBlock end');

  }

})();
