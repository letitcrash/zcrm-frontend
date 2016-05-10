'use strict';
angular.module('inspinia').factory('passwordServices', function(requestService, routeService) {
  return {
    setPassword: function(userId, password, oldPassword) {
      var args, url;
      url = "users/" + userId + "/password/set";
      args = {
        password: password,
        oldPassword: oldPassword
      };
      return requestService.ttPost(url, args);
    },
    forgotPassword: function(username) {
      var args, url;
      url = "forgot-password";
      args = {
        username: username,
        baseUrl: routeService.getBaseServiceURL() + "/password-recovery"
      };
      return requestService.ttPost(url, args);
    },
    recoverPassword: function(userId, token, password) {
      var args, url;
      url = "users/" + userId + "/password/recover";
      args = {
        token: token,
        password: password
      };
      return requestService.ttPost(url, args);
    }
  };
});

//# sourceMappingURL=passwordServices.js.map
