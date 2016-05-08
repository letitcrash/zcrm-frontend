'use strict';
angular.module('inspinia').factory('dataService', function($cookieStore) {
  var APP_VERSION, C_CURRENT_COMPANY_ID, C_CURRENT_COMPANY_NAME, C_EMPLOYMENTS, C_TOKEN, C_MAILBOXID, C_USER, C_USER_LANGUAGE, constants, data;
  APP_VERSION = '0.0.2';
  C_USER = "C_USER";
  C_USER_LANGUAGE = "C_USER_LANGUAGE";
  C_TOKEN = "C_TOKEN";
  C_MAILBOXID = "C_MAILBOXID";
  C_EMPLOYMENTS = "C_EMPLOYMENTS";
  C_CURRENT_COMPANY_ID = "C_CURRENT_COMPANY_ID";
  C_CURRENT_COMPANY_NAME = "C_CURRENT_COMPANY_NAME";
  constants = {};
  data = {};
  return {
    getAppVersion: function() {
      return APP_VERSION;
    },
    getBaseServiceURL: function() {
      return constants.BASE_URL;
    },
    setBaseServiceURL: function(b) {
      return constants.BASE_URL = b;
    },
    getData: function() {
      return data;
    },
    clearData: function() {
      console.log("Clearing data");
      data = {};
      console.log("Clearing cache");
      $cookieStore.remove(C_USER);
      $cookieStore.remove(C_USER_LANGUAGE);
      $cookieStore.remove(C_TOKEN);
      $cookieStore.remove(C_EMPLOYMENTS);
      $cookieStore.remove(C_CURRENT_COMPANY_ID);
      return $cookieStore.remove(C_CURRENT_COMPANY_NAME);
    },
    getUser: function() {
      if (!data.user) {
        data.user = $cookieStore.get(C_USER);
      }
      return data.user;
    },
    setUser: function(user) {
      data.user = user;
      return $cookieStore.put(C_USER, user);
    },
    getUserLanguage: function() {
      if (!data.language) {
        data.language = $cookieStore.get(C_USER_LANGUAGE);
      }
      return data.language;
    },
    setUserLanguage: function(language) {
      data.language = language;
      return $cookieStore.put(C_USER_LANGUAGE, language);
    },
    getUserId: function() {
      if ((this.getUser() != null)) {
        return this.getUser().id;
      }
    },
    getUserLevel: function() {
      if ((this.getUser() != null)) {
        return this.getUser().userLevel;
      }
    },
    getUserContactProfile: function() {
      if ((this.getUser() != null)) {
        return this.getUser().contactProfile;
      }
    },
    getUserMailboxId: function() {
      if (!data.mailbox) {
        data.mailbox = $cookieStore.get(C_MAILBOXID);
      }
      return data.mailbox;
    },
    setUserMailboxId: function(mailbox) {
      data.mailbox = mailbox;
      return $cookieStore.put(C_MAILBOXID, mailbox);
    },
    getSessionToken: function() {
      if (!data.token) {
        data.token = $cookieStore.get(C_TOKEN);
      }
      return data.token;
    },
    setSessionToken: function(token) {
      data.token = token;
      return $cookieStore.put(C_TOKEN, token);
    },
    setCurrentCompany: function(company) {
      data.currentCompanyId = company.id;
      $cookieStore.put(C_CURRENT_COMPANY_ID, company.id);
      return $cookieStore.put(C_CURRENT_COMPANY_NAME, company.name);
    },
    getCurrentCompanyId: function() {
      if (!data.currentCompanyId) {
        data.currentCompanyId = $cookieStore.get(C_CURRENT_COMPANY_ID);
      }
      if (!data.currentCompanyId) {
        data.currentCompanyId = this.getEmployments().companyId;
      }
      return data.currentCompanyId;
    },
    getCurrentCompanyStr: function() {
      if (!data.currentCompanyName) {
        data.currentCompanyName = $cookieStore.get(C_CURRENT_COMPANY_NAME);
      }
      return data.currentCompanyName;
    },
    getCurrentEmployment: function() {
      var companyId;
      if (!data.currentEmployment) {
        companyId = this.getCurrentCompanyId();
        data.currentEmployment = _.find(this.getEmployments(), (function(e) {
          return e.companyId === companyId;
        }));
      }
      return data.currentEmployment;
    },
    getCurrentEmployeeLevel: function() {
      if ((this.getCurrentEmployment() != null)) {
        return this.getCurrentEmployment().employeeLevel;
      }
    },
    getEmployments: function() {
      if (!data.employments) {
        data.employments = $cookieStore.get(C_EMPLOYMENTS);
      }
      return data.employments;
    },
    setEmployments: function(employments) {
      data.employments = employments;
      return $cookieStore.put(C_EMPLOYMENTS, employments);
    }
  };
});

//# sourceMappingURL=dataService.js.map
