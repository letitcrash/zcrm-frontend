'use strict';
angular.module('inspinia').factory('employeeService', function(requestService, dataService, routeService) {
  var getListRequest;
  getListRequest = function(pageSize, pageNr, searchTerm) {
    var url;
    if (pageSize !== void 0 && pageNr !== void 0) {
      if (searchTerm) {
        url = "companies/" + dataService.getCurrentCompanyId() + "/employees?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
      } else {
        url = "companies/" + dataService.getCurrentCompanyId() + "/employees?pageSize=" + pageSize + "&pageNr=" + pageNr;
      }
    } else {
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees";
    }
    return requestService.ttGet(url);
  };
  return {

    /*
      Used to retrieve list of employees. The employees are stored in the service for reuse.
      In order to update the list of employees a page refresh is needed or calling this function with param force
     */
    getList: function(force, pageSize, pageNr, searchTerm) {
      return getListRequest(pageSize, pageNr, searchTerm);
    },
    get: function(id) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + id;
      return requestService.ttGet(url);
    },
    create: function(emp) {
      console.log()
      var args, url;
      args = {};
      args.username = emp.user.contactProfile.email;
      //args.employmentNumberType = emp.employmentNumberType;
      //args.employmentNumberValue = emp.employmentNumberValue;

      //args.subContractorCompanyName = emp.subContractorCompanyName;
      //args.subContractorOrgNr = emp.subContractorOrgNr;
      args.contactProfile = emp.user.contactProfile;
      //args.employeeLevel = Number(emp.employeeLevel);
      args.employeeType = emp.employeeType;
      args.comment = emp.comment;
      args.baseUrl = routeService.getBaseServiceURL() + "/password-recovery";
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees";
      return requestService.ttPost(url, args);
    },
    update: function(emp) {
      var url;
      emp.employeeLevel = Number(emp.employeeLevel);
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + emp.id;
      return requestService.ttPut(url, emp);
    },
    "delete": function(id) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + id;
      return requestService.ttDelete(url);
    },
    getTypes: function(id) {
      var url;
      if (id == null) {
        id = dataService.getCurrentCompanyId();
      }
      url = "companies/" + id + "/types";
      return requestService.ttGet(url);
    },
    getListByWorkPlace: function(wp) {
      var id, url;
      id = dataService.getCurrentCompanyId();
      url = "companies/" + id + "/workplaces/" + wp.id + "/employees";
      return requestService.ttGet(url);
    },
    getMessages: function() {
      var url;
      url = "users/" + dataService.getUserId() + "/messages";
      return requestService.ttGet(url);
    },
    postMessage: function(recipients, body) {
      var args;
      console.log("Sending message: " + body + " to:" + recipients);
      args = {};
      args.senderId = dataService.getUserId();
      args.recipientIds = recipients;
      args.body = body;
      return requestService.ttPost("messages", args);
    }
  };
});

//# sourceMappingURL=employeeService.js.map
