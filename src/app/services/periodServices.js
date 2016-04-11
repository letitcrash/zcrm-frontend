'use strict';
angular.module('inspinia').factory('periodService', function(requestService, dataService) {
  return {
    getEmployeePeriods: function(eid, startDate, endDate) {
      var l, url;
      l = [
        {
          'name': 'startDate',
          'value': startDate
        }, {
          'name': 'endDate',
          'value': endDate
        }
      ];
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + eid + "/periods" + requestService.buildGetParams(l);
      return requestService.ttGet(url);
    },
    getPeriods: function(startDate, endDate) {
      var l, url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/periods";
      l = [
        {
          'name': 'startDate',
          'value': startDate
        }, {
          'name': 'endDate',
          'value': endDate
        }
      ];
      url = url + requestService.buildGetParams(l);
      return requestService.ttGet(url);
    },
    getLatestPeriodByEmployeeId: function(employeeId) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + employeeId + "/latestperiod";
      return requestService.ttGet(url);
    },
    getLatestPeriodByUserId: function(userId) {
      var url;
      url = "users/" + userId + "/latestPeriod";
      return requestService.ttGet(url);
    },
    exportPeriods: function(startDate, endDate, empIdLst, typesLst, workplaceIdLst, fileFormat) {
      var args, url;
      args = {
        'toTime': endDate,
        'fromTime': startDate,
        'employeeIds': empIdLst,
        'employeeTypes': typesLst,
        'workplaceIds': workplaceIdLst,
        'fileFormat': fileFormat
      };
      url = "exportdata/" + dataService.getCurrentCompanyId();
      return requestService.ttPost(url, args);
    },
    searchPeriods: function(startDate, endDate, empIdLst, typesLst, workplaceIdLst) {
      var args, url;
      args = {
        'toTime': endDate,
        'fromTime': startDate,
        'employeeIds': empIdLst,
        'employeeTypes': typesLst,
        'workplaceIds': workplaceIdLst
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/periods";
      return requestService.ttPost(url, args);
    },
    create: function(employeeId, period) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + employeeId + "/periods";
      return requestService.ttPost(url, period);
    },
    update: function(employeeId, period) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + employeeId + "/periods";
      return requestService.ttPut(url, period);
    },
    startBlipForUser: function(wp, userId) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 1,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/users/" + userId + "/blip";
      return requestService.ttPost(url, blip);
    },
    pauseBlipForUser: function(wp, user) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 4,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/users/" + user.id + "/blip?periodId=" + user.latestBlip.periodId;
      return requestService.ttPost(url, blip);
    },
    stopBlipForUser: function(wp, user) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 2,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/users/" + user.id + "/blip?periodId=" + user.latestBlip.periodId;
      return requestService.ttPost(url, blip);
    },
    resumeBlipForUser: function(wp, user) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 3,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/users/" + user.id + "/blip?periodId=" + user.latestBlip.periodId;
      return requestService.ttPost(url, blip);
    },
    startBlip: function(wp) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 1,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/blip";
      return requestService.ttPost(url, blip);
    },
    stopBlip: function(wp, period) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 2,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/blip?periodId=" + period.id;
      return requestService.ttPost(url, blip);
    },
    resumeBlip: function(wp, period) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 3,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/blip?periodId=" + period.id;
      return requestService.ttPost(url, blip);
    },
    pauseBlip: function(wp, period) {
      var blip, today, url;
      today = new Date;
      blip = {
        'sourceDevice': {
          'serialNumber': "0"
        },
        'typeOf': 4,
        'timestamp': today.getTime(),
        'latitude': wp.area.latitude,
        'longitude': wp.area.longitude
      };
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id + "/blip?periodId=" + period.id;
      return requestService.ttPost(url, blip);
    }
  };
});

//# sourceMappingURL=periodServices.js.map
