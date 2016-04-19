(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(initConstants);


  /** @ngInject */
  function initConstants($log, $rootScope, dataService, mailboxService) {
  	dataService.setBaseServiceURL('http://desk-it.com:9000/');
  	$rootScope.isOnSignup = false;
    $rootScope.JSON_PRINT = true;
    $log.debug('runBlock end');

      console.log("getting mailboxes")

  
  mailboxService.get(dataService.getEmployments().id).then(function(response) {
        console.log(response);
        //dataService.setDefaultMailboxId(response);
        $rootScope.setMailboxList(response);
      }, function(response) {
        return console.log("Failed to get mailboxlist");
  });

  }

})();
