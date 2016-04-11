'use strict';
angular.module('inspinia').factory('routeService', function($location) {
  var paths, publicPaths, retrieveBaseURL;
  retrieveBaseURL = function() {
    var baseUrl, baseUrlLen;
    baseUrlLen = $location.absUrl().length - $location.url().length;
    baseUrl = $location.absUrl().substring(0, baseUrlLen);
    if (baseUrl.indexOf("#") === -1) {
      baseUrl = baseUrl + "#";
    }
    return baseUrl;
  };
  paths = {};
  paths["403"] = "/403";
  paths["404"] = "/404";
  paths.companies = "/companies";
  paths.subcontractors = "/subcontractors";
  paths.parentcompanies = "/parentcompanies";
  paths.employees = "/employees";
  paths.geolocation = "/geolocation";
  paths.login = "/login";
  paths.messages = "/messages";
  paths.passwordRecovery = "/password-recovery/";
  paths.profile = "/profile";
  paths.timereports = "/timereports";
  paths.users = "/users";
  paths.workplaces = "/workplaces";
  paths.signupUser = "/signup/user";
  publicPaths = [paths.login, paths.passwordRecovery, paths.signupUser];
  return {
    setPaths: function(s) {
      return paths = s;
    },
    getBaseServiceURL: function() {
      var baseUrl;
      if (!baseUrl) {
        baseUrl = retrieveBaseURL();
      }
      return baseUrl;
    },
    to403: function() {
      return $location.path(paths["403"]);
    },
    to404: function() {
      return $location.path(paths["404"]);
    },
    toCompanies: function() {
      return $location.path(paths.companies);
    },
    toEmployees: function() {
      return $location.path(paths.employees);
    },
    toSubcontractors: function() {
      return $location.path(paths.subcontractors);
    },
    toParentCompanies: function() {
      return $location.path(paths.parentcompanies);
    },
    toLogin: function() {
      return $location.path(paths.login);
    },
    toMessages: function() {
      return $location.path(paths.messages);
    },
    toGeoLocation: function() {
      return $location.path(paths.geolocation);
    },
    toProfile: function() {
      return $location.path(paths.profile);
    },
    toTimeReports: function() {
      return $location.path(paths.timereports);
    },
    toUsers: function() {
      return $location.path(paths.users);
    },
    toWorkplaces: function() {
      return $location.path(paths.workplaces);
    },
    toSignupUser: function() {
      return $location.path(paths.signupUser);
    },
    routeIsCompanies: function() {
      return $location.path() === paths.companies;
    },
    routeIsEmployees: function() {
      return $location.path() === paths.employees;
    },
    routeIsLogin: function() {
      return $location.path() === paths.login;
    },
    routeIsMessages: function() {
      return $location.path() === paths.messages;
    },
    routeIsGeoLocation: function() {
      return $location.path() === paths.geolocation;
    },
    routeIsTimeReports: function() {
      return $location.path() === paths.timereports;
    },
    routeIsProfile: function() {
      return $location.path() === paths.profile;
    },
    routeIsUsers: function() {
      return $location.path() === paths.users;
    },
    routeIsWorkplaces: function() {
      return $location.path() === paths.workplaces;
    },
    routeIsSignupUser: function() {
      return $location.path() === paths.signupUser;
    },
    routeIsSubcontractors: function() {
      return $location.path() === paths.subcontractors;
    },
    routeIsParentCompanies: function() {
      return $location.path() === paths.parentcompanies;
    },
    routeIsPublic: function() {
      if (/login/.test($location.path())) {
        return true;
      }
      if (/password-recovery/.test($location.path())) {
        return true;
      }
      if ($location.path() === "/signup/user") {
        return true;
      }
      return false;
    }
  };
});

//# sourceMappingURL=routeService.js.map
