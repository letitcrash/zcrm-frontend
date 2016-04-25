(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(initConstants);


  /** @ngInject */
  function initConstants($log, $rootScope, dataService, mailboxService) {
  	dataService.setBaseServiceURL('http://desk-it.com:9001/');
  	$rootScope.isOnSignup = false;
    $rootScope.JSON_PRINT = true;
    $log.debug('runBlock end');

      console.log("getting mailboxes")

  }

})();
