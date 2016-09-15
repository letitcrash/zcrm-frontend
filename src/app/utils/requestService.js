'use strict';
angular.module('inspinia').factory('requestService', function($log, $http, $q, $rootScope, dataService) {
  var RESPONSE_OK, checkResponseHeader, getResponseBody, getResponseHeader, printRequest, reject, resolve;
  RESPONSE_OK = 0;
  checkResponseHeader = function(header) {
    if ((header != null) && (header.response_code != null)) {
      return header.response_code === RESPONSE_OK;
    } else {
      return false;
    }
  };
  getResponseBody = function(response) {
    if ((response != null) && (response.data != null) && (response.data.body != null)) {
      return response.data.body;
    }
  };
  getResponseHeader = function(response) {
    if ((response != null) && (response.data != null) && (response.data.header != null)) {
      return response.data.header;
    }
  };
  printRequest = function(request, response, isSuccess) {
    $rootScope.requestServiceRequest = request;
    $rootScope.requestServiceResponse = response;
    return $rootScope.requestServiceIsSuccess = isSuccess;
  };
  resolve = function(deferred, request, response) {
    var body, header, isSuccess;
    header = getResponseHeader(response);
    body = getResponseBody(response);
    isSuccess = checkResponseHeader(header);
    printRequest(request, response, isSuccess);
    if (isSuccess) {
      deferred.resolve(body);
    } else {
      $log.log("Request failed with:");
      $log.log(response);
      deferred.resolve(response);
    }
    printRequest(request, response, true);
    return deferred.resolve(response);
  };
  reject = function(promise, data, response) {
    printRequest(data, response, false);
    return promise.reject(response);
  };
  return {
    ttPost: function(suburl, data) {
      return this.ttRequest(suburl, 'POST', data);
    },
    ttPut: function(suburl, data) {
      return this.ttRequest(suburl, 'PUT', data);
    },
    ttGet: function(suburl) {
      return this.ttRequest(suburl, 'GET');
    },
    ttDelete: function(suburl) {
      return this.ttRequest(suburl, 'DELETE');
    },
    octetStreamRequest: function(url, method, data, callback) {
      var token = dataService.getSessionToken();
      var userId = dataService.getUserId();
      var baseUrl = dataService.getBaseServiceURL();

      return $http({
        method: method,
        url: baseUrl + url,
        data: data,
        responseType: "text",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
          "X-User-Id": userId
        }
      }).then(function(response) {
        return callback(response);
      }, function() {
        return $log.log("export failed");
      });
    },
    ttRequest: function(suburl, method, data) {
      var url = dataService.getBaseServiceURL() + suburl;
      var deferred = $q.defer();

      $log.log("Making " + method + " request to " + url);
      $log.log("setting header");

      var req = {
        method: method,
        url: url,
        timeout: 60000,
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": dataService.getSessionToken(),
          "X-User-Id": dataService.getUserId()
        },
        withCredentials: true
      };

      if (angular.isObject(data)) { req.data = data; }

      $http(req).then(function(response) {
        $log.log("got promise");
        $log.log(response);

        return resolve(deferred, data, response);
      }, function(response) {
        $log.log("=== ALARM =====");
        $log.log(response);

        return reject(deferred, data, response);
      });
      return deferred.promise;
    },

    /*
      buildGetParams makes this:
      l = [
            {'name': 'startDate', 'value': 123123123},
            {'name': 'endDate', 'value': 123123123}
          ]
      into this:
        '?startDate=123123123&endDate=1231231231'
     */
    buildGetParams: function(l) {
      var i, j, params, ref;
      params = '';
      if ((l != null) && l.length > 0) {
        if ((l[0].name != null) && (l[0].value != null)) {
          params = '?' + l[0].name + "=" + l[0].value;
        }
        for (i = j = 1, ref = l.length - 1; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
          if ((l[i].name != null) && (l[i].value != null)) {
            params = params + '&' + l[i].name + "=" + l[i].value;
          }
        }
      }
      return params;
    }
  };
});

//# sourceMappingURL=requestService.js.map
