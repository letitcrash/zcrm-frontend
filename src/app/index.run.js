(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(initConstants);


  /** @ngInject */
  function initConstants($log, $rootScope, dataService, mailboxService) {
  	dataService.setBaseServiceURL('https://desk-it.com:9000/');
  	$rootScope.isOnSignup = false;
    $rootScope.JSON_PRINT = true;
    $log.debug('runBlock end');

      console.log("getting mailboxes")

  }

})();
