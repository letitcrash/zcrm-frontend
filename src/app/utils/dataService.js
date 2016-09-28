'use strict';
angular
  .module('inspinia')
  .factory('dataService', function ($cookies) {
    var APP_VERSION = '0.0.2';
    var C_USER = "C_USER";
    var C_USER_LANGUAGE = "C_USER_LANGUAGE";
    var C_TOKEN = "C_TOKEN";
    var C_MAILBOXID = "C_MAILBOXID";
    var C_EMPLOYMENTS = "C_EMPLOYMENTS";
    var C_CURRENT_COMPANY_ID = "C_CURRENT_COMPANY_ID";
    var C_CURRENT_COMPANY_NAME = "C_CURRENT_COMPANY_NAME";
    var constants = {};
    var data = {};

    return {
      getAppVersion: function () {
        return APP_VERSION;
      },

      getBaseServiceURL: function () {
        return constants.BASE_URL;
      },

      setBaseServiceURL: function (b) {
        return constants.BASE_URL = b;
      },

      getData: function () {
        return data;
      },

      clearData: function () {
        console.log("Clearing data");
        data = {};
        console.log("Clearing cache");
        $cookies.remove(C_USER);
        $cookies.remove(C_USER_LANGUAGE);
        $cookies.remove(C_TOKEN);
        $cookies.remove(C_EMPLOYMENTS);
        $cookies.remove(C_CURRENT_COMPANY_ID);
        $cookies.remove(C_CURRENT_COMPANY_NAME);
      },

      getUser: function () {
        if (!data.user) {
          data.user = $cookies.getObject(C_USER);
        }
        return data.user;
      },

      setUser: function (user) {
        data.user = user;
        return $cookies.putObject(C_USER, user);
      },

      getUserLanguage: function () {
        if (!data.language) {
          data.language = $cookies.get(C_USER_LANGUAGE);
        }
        return data.language;
      },

      setUserLanguage: function (language) {
        data.language = language;
        return $cookies.put(C_USER_LANGUAGE, language);
      },

      getUserId: function () {
        if ((this.getUser() != null)) {
          return this.getUser().id;
        }
      },

      getUserLevel: function () {
        if ((this.getUser() != null)) {
          return this.getUser().userLevel;
        }
      },

      getUserContactProfile: function () {
        if ((this.getUser() != null)) {
          return this.getUser().contactProfile;
        }
      },

      getUserMailboxId: function () {
        if (!data.mailbox) {
          data.mailbox = $cookies.get(C_MAILBOXID);
        }
        return data.mailbox;
      },

      setUserMailboxId: function (mailbox) {
        data.mailbox = mailbox;
        return $cookies.put(C_MAILBOXID, mailbox);
      },

      getSessionToken: function () {
        if (!data.token) {
          data.token = $cookies.get(C_TOKEN);
        }
        return data.token;
      },

      setSessionToken: function (token) {
        data.token = token;
        return $cookies.put(C_TOKEN, token);
      },

      setCurrentCompany: function (company) {
        data.currentCompanyId = company.id;
        $cookies.put(C_CURRENT_COMPANY_ID, company.id);
        return $cookies.put(C_CURRENT_COMPANY_NAME, company.name);
      },

      getCurrentCompanyId: function () {
        if (!data.currentCompanyId) {
          data.currentCompanyId = Number($cookies.get(C_CURRENT_COMPANY_ID));
        }
        if (!data.currentCompanyId) {
          data.currentCompanyId = Number(this.getEmployments().companyId);
        }
        return data.currentCompanyId;
      },

      getCurrentCompanyStr: function () {
        if (!data.currentCompanyName) {
          data.currentCompanyName = $cookies.get(C_CURRENT_COMPANY_NAME);
        }
        return data.currentCompanyName;
      },

      getCurrentEmployment: function () {
        var companyId;
        if (!data.currentEmployment) {
          companyId = this.getCurrentCompanyId();
          data.currentEmployment = _.find(this.getEmployments(), (function (e) {
            return e.companyId === companyId;
          }));
        }
        return data.currentEmployment;
      },

      getCurrentEmployeeLevel: function () {
        if ((this.getCurrentEmployment() != null)) {
          return this.getCurrentEmployment().employeeLevel;
        }
      },

      getEmployments: function () {
        if (!data.employments) {
          data.employments = $cookies.getObject(C_EMPLOYMENTS);
        }
        return data.employments;
      },

      setEmployments: function (employments) {
        data.employments = employments;
        return $cookies.putObject(C_EMPLOYMENTS, employments);
      }
    };
  });

//# sourceMappingURL=dataService.js.map
