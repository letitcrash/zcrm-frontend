'use strict';
angular.module('inspinia').factory('signupServices', function(requestService) {
  return {
    sendSignupEmail: function(email, baseUrl) {
      var args, url;
      args = {};
      args.email = email;
      args.url = baseUrl + "/#/signup/user";
      url = "signup";
      return requestService.ttPost(url, args);
    },
    activateUser: function(token, email, contactProfile, companyName, vatId, password) {
      var args, url;
      args = {};
      args.token = token;
      args.email = email;
      args.companyName = companyName;
      args.vatId = vatId;
      args.contactProfile = contactProfile;
      args.password = password;
      url = "activate-user";
      return requestService.ttPost(url, args);
    }
  };
});

//# sourceMappingURL=signupServices.js.map
