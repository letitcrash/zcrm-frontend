(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(initConstants);


  /** @ngInject */
  function initConstants($log, $rootScope, dataService, mailboxService) {

    if (window.location.protocol === "https:" && window.location.host === "desk-it.com") {
      dataService.setBaseServiceURL('https://desk-it.com:9443/');
    } else if (window.location.protocol === "https:" && window.location.host === "uat.desk-it.com") {
      dataService.setBaseServiceURL('https://desk-it.com:10443/');
    } else if (window.location.protocol === "http:" && window.location.host === "desk-it.com") {
      dataService.setBaseServiceURL('http://desk-it.com:9000/');
    } else if (window.location.protocol === "http:" && window.location.host === "uat.desk-it.com") {
      dataService.setBaseServiceURL('http://desk-it.com:10000/');
    } else {
      dataService.setBaseServiceURL('https://desk-it.com:10443/');
      // dataService.setBaseServiceURL('http://desk-it.com:10000/');
    }

    //dataService.setBaseServiceURL('https://desk-it.com:9443/')
    //dataService.setBaseServiceURL('http://192.168.1.50:9000/')


  	$rootScope.isOnSignup = false;
    $rootScope.JSON_PRINT = true;
    $log.debug('runBlock end');

  }

})();
