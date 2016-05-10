'use strict';
angular.module('inspinia').factory('authInterceptor', function(routeService, dataService) {
  return {
    request: function(config) {
      if (!dataService.getSessionToken()) {
        if (!routeService.routeIsPublic()) {
          console.log("User is not logged in and is located on a non-public page, redirecting to login");
          routeService.toLogin();
        }
      }
      return config;
    },
    response: function(response) {
      if ((response != null) && (response.data != null) && (response.data.header != null) && (response.data.header.response_code != null)) {
        if (response.data.header.response_code === 401) {
          console.log("An Unauthorized request has been made, redirecting to login");
          routeService.toLogin();
        } else if (response.data.header.response_code === 403) {
          console.log("An Forbidden request has been made, redirecting to 403");
          routeService.to401();
        }
      }
      return response;
    }
  };
});

//# sourceMappingURL=authInterceptor.js.map
