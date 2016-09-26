'use strict';
angular
  .module('inspinia')
  .factory('requestService', function ($log, $http, $q, dataService, Upload) {
    function checkResponseHeader(header) {
      var RESPONSE_OK = 0;

      if (header)
        return header.response_code === RESPONSE_OK;

      return false;
    }

    function getResponseBody(response) {
      if (response && response.data && response.data.body)
        return response.data.body;

      return false;
    }

    function getResponseHeader(response) {
      if (response && response.data && response.data.header)
        return response.data.header;

      return false;
    }

    function resolve(deferred, request, response) {
      var header = getResponseHeader(response);
      var body = getResponseBody(response);
      var isSuccess = checkResponseHeader(header);

      if (isSuccess) {
        return deferred.resolve(body);
      } else {
        $log.log("Request failed with:", response);
        return deferred.resolve(response);
      }
    }

    function reject(promise, data, response) {
      return promise.reject(response);
    }

    var formatters = [{
      regex: /:companyId/,
      sub: dataService.getCurrentCompanyId
    }];

    function buildGetParams(params) {
      function getDelimiter() {
        if (paramsCount === 1)
          return '?';

        return '&';
      }

      function getValue() {
        if (angular.isArray(value))
          return value.join();

        return value;
      }

      function buildParameter() {
        return getDelimiter(paramsCount) + key + '=' + getValue(value);
      }

      var res = '';

      if (!params)
        return '';

      var paramsCount = 0;

      for (var key in params) {
        var value = params[key];

        if (!value)
          continue;

        res += buildParameter();
      }

      return res;
    }

    function getBaseRequest(suburl, method) {
      formatters.forEach(function (frmt) {
        if (frmt.regex.test(suburl))
          suburl = suburl.replace(frmt.regex, angular.isFunction(frmt.sub) ? frmt.sub() : frmt.sub);
      });

      var url = dataService.getBaseServiceURL() + suburl;

      return {
        method: method,
        url: url,
        timeout: 60000,
        headers: {
          "X-Access-Token": dataService.getSessionToken(),
          "X-User-Id": dataService.getUserId()
        },
        withCredentials: true
      };
    }

    function doRequest(operation, request) {
      $log.log("Making " + request.method + " request to " + request.url);
      $log.log("With request: ", request);
      var deferred = $q.defer();

      operation(request).then(function (response) {
        $log.log("Got response ", response);

        return resolve(deferred, request.data, response);
      }, function (response) {
        $log.log("===== ALARM =====");
        $log.log(response);

        return reject(deferred, request.data, response);
      });

      return deferred.promise;
    }

    return {
      ttPost: function (suburl, data) {
        return this.ttRequest(suburl, 'POST', data);
      },

      ttPut: function (suburl, data) {
        return this.ttRequest(suburl, 'PUT', data);
      },

      ttGet: function (suburl, getParams) {
        return this.ttRequest(suburl + buildGetParams(getParams), 'GET');
      },

      ttDelete: function (suburl) {
        return this.ttRequest(suburl, 'DELETE');
      },

      octetStreamRequest: function (url, method, data, callback) {
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
        }).then(function (response) {
          return callback(response);
        }, function () {
          return $log.log("export failed");
        });
      },

      ttRequest: function (suburl, method, data, contentType) {
        var request = getBaseRequest(suburl, method, data);
        request.data = data;

        if (contentType == undefined)
          contentType = "application/json";

        request.headers['Content-Type'] = contentType;

        return doRequest($http, request);
      },

      ttUploadFileRequest: function (suburl, method, fileBlob) {
        var contentType = undefined;
        var request = getBaseRequest(suburl, method, contentType);

        request.data = {
          image: fileBlob
        };

        request.transformRequest = function (data) {
          return data;
        };

        return doRequest(Upload.upload, request);
      },

      buildGetParams: buildGetParams
    };
  });
