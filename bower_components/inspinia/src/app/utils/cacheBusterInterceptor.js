'use strict';
angular.module('inspinia').factory('cacheBusterInterceptor', function(dataService) {
  return {
    request: function(config) {
      var separator;
      if (config.method === 'GET' && config.url.indexOf('.html') !== -1 && config.url.indexOf('template/') === -1) {
        separator = config.url.indexOf('?') === -1 ? '?' : '&';
        config.url = config.url + separator + 'v=' + dataService.getAppVersion();
      }
      return config;
    }
  };
});

//# sourceMappingURL=cacheBusterInterceptor.js.map
